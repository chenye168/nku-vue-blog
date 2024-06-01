<template>
  <main>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <img src="https://cdn.bruceau.com/static/media/logo.fc6bc3c1.png" @click="backHome" />
      <el-menu-item v-if="!userStore.hasLogin" index="/login">Login</el-menu-item>
      <el-sub-menu index="2" v-if="userStore.hasLogin" class="subMenu">
        <template #title>{{ userStore.userName }}</template>
        <el-menu-item :index="getMyPath()">我的主页</el-menu-item>
        <el-menu-item index="/changeInfo">修改信息</el-menu-item>
        <el-menu-item index="/postArticle">发布文章</el-menu-item>
        <el-menu-item @click="logout()">退出登录</el-menu-item>
      </el-sub-menu>
      <el-menu-item :index="`/${userStore.currentUser}/home`">HOME</el-menu-item>
      <el-menu-item :index="`/${userStore.currentUser}/blog`">BLOG</el-menu-item>
      <el-menu-item :index="`/${userStore.currentUser}/about`">ABOUT</el-menu-item>
    </el-menu>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { userStatus } from '@/stores/userStatus'

const userStore = ref(userStatus())

const route = useRoute()
const router = useRouter()
let activeIndex = route.path

const user = route.params.user

const getPath = (path2: String) => {
  return '/' + user + '/' + path2
}

const getMyPath = () => {
  return '/' + userStore.value.userName + '/home'
}

const backHome = () => {
  router.push('/')
}

const logout = () => {
  userStore.value.hasLogin = false
  userStore.value.userName = ''
  userStore.value.token = ''
  router.push('/'+user+'/home')
}

const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
  // routerStore.value.Type = 'leave'
  // routerStore.value.isRouter = true
}
</script>

<script methods></script>

<style scoped lang="scss">
@import '../src/styles/Nav.scss';

.el-menu-item:hover {
  color: #e64949;
  text-decoration: none;
}
</style>
