

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
import { getUserInfo } from '@/api/UserInfo'
import { userStatus } from '@/stores/userStatus'
const userStore = ref(userStatus())
const switchin = ref(true)

const switchOut = (n: boolean) => {
  switchin.value = n
}

const userInfo = ref([])

const getUser = async () => {
  // 获取用户信息
  let res = await getUserId(userStore.value.currentUser)
  res = await getUserInfo(res.data.userId)
  return res.data
}

onMounted(async () => {
  userInfo.value = await getUser()
})

</script>

<style scoped>
header {
  width: 100%;
  padding: 0%;
  margin: 0%;
}
</style>
