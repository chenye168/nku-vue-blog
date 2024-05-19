

<template>
    <header>
      <HeaderNav />
    </header>
    <h1>个人资料修改</h1>
    <Switch v-if="switchin" :type="'enter'" :callback="switchOut" />
  </template>
  
  
  <script setup lang="ts">
  import HeaderNav from '@/components/HeaderNav.vue'
  import Switch from '@/components/SwitchTransition.vue'
  import { ref } from 'vue'
  
  
  const switchin = ref(true)
  
  const switchOut = (n: boolean) => {
    switchin.value = n
  }
  </script>
  
  <style scoped>
  header {
    width: 100%;
    padding: 0%;
    margin: 0%;
  }
  </style>
  