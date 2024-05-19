<template>
  <header>
    <HeaderNav />
  </header>
  <h1>你好我是{{ $route.params.user }}</h1>
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
import { get } from 'node_modules/axios/index.cjs'

const switchin = ref(true)
const switchOut = (n: boolean) => {
  switchin.value = n
}

const userStore = ref(userStatus())

// 文章列表
const articleList = ref([])

const getArticleList = async () => {
  // 获取文章列表
  console.log('获取文章列表')
  let res = await getUserId(userStore.value.currentUser)
  res = await getUserArticle(res.data.userId)
  return res.data
}

const getArticleDetail = async (id: number) => {
  // 获取文章详情
  console.log('获取文章详情')
  let res = await getArticle(id)
  return res.data
}

console.log(getArticleDetail(910894))

onMounted(async () => {
  articleList.value = await getArticleList()
})
</script>

<style scoped>
header {
  width: 100%;
  padding: 0%;
  margin: 0%;
}
</style>
