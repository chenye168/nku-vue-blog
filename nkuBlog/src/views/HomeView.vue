<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Switch from '@/components/SwitchTransition.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'




const switchin = ref(true)
const switchOut = (n: boolean) => {
  switchin.value = n
}
const route = useRoute()
// 访问的用户
const currentUser = route.params.user


</script>

<template>
  <header>
    <HeaderNav />
  </header>
  <h1>你好我是{{ $route.params.user }}</h1>
  <Switch v-if="switchin" :type="'enter'" :callback="switchOut" />
</template>

<style scoped>
header {
  width: 100%;
  padding: 0%;
  margin: 0%;
}
</style>
