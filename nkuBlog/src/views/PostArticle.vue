<template>
  <header>
    <HeaderNav />
  </header>

  <section>
    <div class="articleList">
      <div class="title">
        文章列表
      </div>
      <div class="list">
        <ul>
          <li
            v-for="(item, index) in articleList"
            :key="index"
            @click="changeArticle(index)"
            :class="activeId === index ? 'activeCss' : 'inactiveCss'"
          >
            <h3 class="titleCss">{{ item.title }}</h3>
          </li>
        </ul>
        <div>
          <button class="newbutton" @click="newArticle">
          新建
        </button>
        </div>
      </div>
    </div>
    <div class="articleInfo">
      <div class="title">操作信息</div>
      <div class="detailInfo">
        <div>文章标题: <el-input v-model="title" /></div>
        <div>文章作者: {{ userStore.currentUser }}</div>
        <div>文章创建时间: {{ createTime }}</div>
        <div>
          <el-button type="danger" @click="deleteArticle" v-if="activeId !== -1">删除文章</el-button>
        </div>
        <div>
          <el-button type="primary" @click="saveArticle">
          <span v-if="activeId == -1">上传文章</span>
          <span v-else>保存文章</span>
        </el-button>
        </div>
      </div>
    </div>
    <MdEditor v-model="text" @onUploadImg="onUploadImg" />
  </section>

  <Switch v-if="switchin" :type="'enter'" :callback="switchOut" />
</template>

<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Switch from '@/components/SwitchTransition.vue'
import { ref, onMounted } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { getUserId } from '@/api/GetUserId'
import { getUserArticle } from '@/api/UserArticle'
import { getArticle } from '@/api/GetArticle'
import { DeleteArticle } from '@/api/DeleteArticle'
import { userStatus } from '@/stores/userStatus'

const switchin = ref(true)

const switchOut = (n: boolean) => {
  switchin.value = n
}

const userStore = ref(userStatus())

// 文章列表
const articleList = ref<
  { title: string; datetime: string; articleText: string; articleId: number }[]
>([])
const text = ref('')
const activeId = ref(0)
const title = ref('')
const createTime = ref('')

const getArticleList = async () => {
  // 获取文章列表
  console.log('获取文章列表')
  let res = await getUserId(userStore.value.userName)
  res = await getUserArticle(res.data.userId)
  return res.data
}

const getArticleDetail = async (text: string) => {
  // 获取文章详情
  console.log('获取文章详情')
  title.value = articleList.value[activeId.value].title
  let res = await getArticle(text)

  return res.data
}

const changeArticle = async (index: number) => {
  console.log('切换文章')
  activeId.value = index
  createTime.value = articleList.value[index].datetime
  text.value = await getArticleDetail(articleList.value[index].articleText)
}

//刷新文章列表
const refreshArticleList = async () => {
  articleList.value = await getArticleList()
  if (articleList.value.length > 0) {
    activeId.value = 0
    text.value = await getArticleDetail(articleList.value[0].articleText)
    createTime.value = articleList.value[0].datetime
  }
}

onMounted(async () => {
  await refreshArticleList()
})

//新建文章
const newArticle = () => {
  console.log('新建文章')
  activeId.value = -1
  text.value = ''
  title.value = ''
  createTime.value = getNowTime()
}

//获取当前时间
const getNowTime = () => {
  let time = new Date()
  let year = time.getFullYear()
  let month = (time.getMonth() + 1).toString().padStart(2, '0')
  let day = time.getDate().toString().padStart(2, '0')
  let hour = time.getHours().toString().padStart(2, '0')
  let minute = time.getMinutes().toString().padStart(2, '0')
  let second = time.getSeconds().toString().padStart(2, '0')
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

//处理文章事件

//删除文章
const deleteArticle = async () => {
  console.log('删除文章')
  await DeleteArticle({
    articleId: articleList.value[activeId.value].articleId
  }).then(async (res) => {
    console.log(res)
    if (res.status === 200) {
      await refreshArticleList()
    } else {
      console.log('删除失败')
    }
  })
}

//上传文章
const saveArticle = async () => {
  console.log('上传文章')
  //文章转换为markdown格式
  let articleText = text.value
  console.log(articleText)
  // 创建一个 Blob 对象，内容为文章的文本
  let blob = new Blob([articleText], { type: 'text/markdown' })

  // 创建一个 File 对象，名称为 'article.md'，内容为上面创建的 Blob 对象
  //创建随机文件名
  let filename = Math.random().toString(36).substr(2) + '.md'
  let file = new File([blob], filename)

  let formData = new FormData()
  formData.append('file', file)

  let response = await fetch('http://localhost:5173/api/upload', {
    method: 'POST',
    body: formData
  })

  let result = await response.json()

  if (response.status !== 200) {
    console.log('上传失败')
    return
  }

  //上传文章获取文章地址
  // http://localhost:5173/api/upload

  if (activeId.value === -1) {
    //上传新文章
    await saveNewArticle(result.path)
  } else {
    //更新文章
    await updateArticle(result.path)
  }
}

//上传新文章
const saveNewArticle = async (articleUrl: string) => {
  console.log('上传新文章')
  await DeleteArticle({
    articleText: articleUrl,
    articleTitle: title.value
  }).then(async (res) => {
    console.log(res)
    if (res.status === 200) {
      await refreshArticleList()
    } else {
      console.log('上传失败')
    }
  })
}

// //更新文章
const updateArticle = async (articleUrl: string) => {
  console.log('更新文章')
  await DeleteArticle({
    articleText: articleUrl,
    articleTitle: title.value,
    articleId: articleList.value[activeId.value].articleId
  }).then(async (res) => {
    console.log(res)
    if (res.status === 200) {
      await refreshArticleList()
    } else {
      console.log('上传失败')
    }
  })
}

//上传图片
const onUploadImg = async (files: File[], callback: (urls: string[]) => void) => {
  console.log('上传图片')

  const responses = await Promise.all(
    files.map((file: File) => {
      let formData = new FormData()
      formData.append('file', file)

      return fetch('http://localhost:5173/api/upload', {
        method: 'POST',
        body: formData
      })
    })
  )

  const results = await Promise.all(responses.map((response) => response.json()))

  if (responses.some((response) => response.status !== 200)) {
    console.log('上传失败')
    return
  }

  callback(results.map((item) => 'http://src.cycodes.cn/src/img/' + item.path))
}
</script>

<style scoped>
header {
  width: 100%;
  padding: 0%;
  margin: 0%;
}
section {
  position: fixed;
  top: 60px;
  bottom: 10px;
  left: 20px;
  right: 20px;
  padding: 0%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: minmax(0, 3fr) minmax(0, 5fr);
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  place-items: center;
}
.newbutton{
  position:relative;
  left:46%;
  top:0%;
}

.articleList,
.articleInfo {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 50px 1fr;
  overflow: auto;
}

.article-list > li {
  padding: 12px;
  cursor: pointer;
}

.activeCss {
  background-color: #ffd03f;
}

.inactiveCss {
  :hover {
    .titleCss {
      color: #ffd03f;
    }
  }
}

.md-editor {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 20px;
  grid-column: span 2;
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid #e0e0e0;
  background-color: #f0f0f0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;
}

.list {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  overflow: auto;
}

/* 自定义滚动条样式 */
.list::-webkit-scrollbar {
  display: none;
}

.detailInfo {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  overflow: auto;
}
</style>
