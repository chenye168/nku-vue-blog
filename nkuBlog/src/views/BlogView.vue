<template>
  <header>
    <HeaderNav />
  </header>
  <div class="blog">
    <div class="article-list">
      <div class="title">文章列表</div>
      <div class="list">
        <ul>
          <li
            v-for="(item, index) in articleList"
            :key="index"
            @click="changeArticle(index)"
            :class="activeId === index ? 'activeCss' : 'inactiveCss'"
          >
            <h3 class="titleCss">
              {{ item.title }}
              <span class="publish-time">{{ formatDate(new Date(item.datetime)) }}</span>
            </h3>
          </li>
        </ul>
      </div>
    </div>
    <div class="article-detail" :class="{ hidden: !showArticleDetail }">
      <div class="title">{{ title }}</div>
      <MdPreview v-model="text" />
    </div>
    <button class="back" id="backButton" @click="hideArticleDetail" v-if="showArticleDetail">
      ««
    </button>
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
const articleList = ref<{ title: string; articleText: string; datetime: Date }[]>([])
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

const showArticleDetail = ref(false)
const changeArticle = async (index: number) => {
  console.log('切换文章')
  activeId.value = index
  text.value = await getArticleDetail(articleList.value[index].articleText)
  showArticleDetail.value = true
}

// const text = ref('# sdfdsfdsf');

onMounted(async () => {
  articleList.value = await getArticleList()
  if (articleList.value.length > 0) {
    text.value = await getArticleDetail(articleList.value[0].articleText)
  }
})
const formatDate = (date: Date) => {
  const options: any = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return date.toLocaleDateString('en-US', options)
}
const hideArticleDetail = () => {
  showArticleDetail.value = false // 点击按钮后隐藏文章详情
}
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
  width: 75%;
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
li
{
  list-style-type: none;
  width:80%;
  margin-bottom: 2%;
  border-radius: 5px;
  font-size:1.0em;
}
li:hover
{
  background-color:#ffd64f9d;
  text-decoration: underline;
  transition-duration: 50ms;

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
  overflow: scroll;
}
.publish-time{
  font-size:0.8em;
  color:grey;
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
@media screen and (max-width: 767px) {
  /* 在手机端隐藏.article-detail */
  .hidden
  {
    display: none;
  }

  .article-detail {
    position: absolute;
    left: 7.5%;
    right: 7.5%;
    width: 75%;
    top: 10%;
    bottom: 10%;
  }
  .article-list {
    position: absolute;
    left: 7.5%;
    right: 7.5%;
    top: 10%;
    bottom: 10%;
  }

  .back{
    position: fixed;
    border-style:none;
    width:10%;
    height:3%;
    left:16%;
    top:9%;
    color:grey;
    font-size:1.5em;
    font-family:"SimHei", Arial, sans-serif;
    z-index: 1;
  }
  .back:hover{
    text-decoration: underline;
    color:black;
  }
}
@media screen and (min-width: 767px)
{
  .back{
    display: none;
  }
}
</style>
