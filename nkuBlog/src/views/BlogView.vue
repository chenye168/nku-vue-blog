<template>
  <header>
    <HeaderNav />
  </header>
  <div class="blog">
    <div class="article-list">
      <div class="title">
        <div class="switchlist">文章列表</div>
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
      </div>
    </div>
    <div class="article-detail">
      <div class="title">{{ title }}</div>
      <MdPreview v-model="text" />
    </div>
  </div>

  <Switch v-if="switchin" :type="'enter'" :callback="switchOut" />
</template>

<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Switch from '@/components/SwitchTransition.vue'
import { ref, onMounted } from 'vue'
import { getUserId } from '@/api/GetUserId'
import { getUserArticle } from '@/api/UserArticle'
import { getArticle } from '@/api/GetArticle'
import { userStatus } from '@/stores/userStatus'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const switchin = ref(true)
const switchOut = (n: boolean) => {
  switchin.value = n
}

const userStore = ref(userStatus())


// 文章列表
const articleList = ref<{title: string,articleText: string}[]>([])
const text = ref('')
const activeId = ref(0)
const title = ref('')

const getArticleList = async () => {
  // 获取文章列表
  console.log('获取文章列表')
  let res = await getUserId(userStore.value.currentUser)
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
  text.value = await getArticleDetail(articleList.value[index].articleText)
}

// const text = ref('# sdfdsfdsf');

onMounted(async () => {
  articleList.value = await getArticleList()
  if (articleList.value.length > 0) {
    text.value = await getArticleDetail(articleList.value[0].articleText)
  }
})

</script>

<style scoped>
header {
  width: 100%;
  padding: 0%;
  margin: 0%;
}

.blog {
  width: 100%;
  height: 98%;

  position: fixed;
  top: 20px;
  display: grid;
  grid-template-columns: 2fr 5fr;
}

.article-list {
  background-color: white;
  height: 90%;
  width: 89%;
  margin-left: 3%;
  position: relative;
  left: 7%;
  margin: auto;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 50px 1fr;
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

.article-detail {
  background-color: white;
  height: 90%;
  width: 92%;
  position: relative;
  right: 2%;
  margin: auto;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 50px 1fr;
  flex-direction: column;
  max-height: 95%;

  overflow: hidden;
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
}

.list {
  margin-top: 10px;
  background-color: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: auto;
}

/* 自定义滚动条样式 */
.list::-webkit-scrollbar {
  display: none;
}

.md-editor {
  width: 80%;
  flex: 1;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: 0 auto;
}
.md-editor::-webkit-scrollbar {
  display: none;
}
</style>
