<template>
  <main>
    <div class="container">
      <div class="login-wrapper">
        <div class="close-button" @click="returnPage">X</div>
        <LoginPage v-if="isLogin" :func="toRegister" />
        <Register v-if="!isLogin" :func="toLogin" />
      </div>
    </div>
  </main>
</template>

<script setup>
import LoginPage from '@/components/LoginPage.vue'
import Register from '@/components/RegisterPage.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const returnPage = () => {
  router.back()
  if (router.currentRoute.value.path === '/login') {
    router(-1)
  }
}

const isLogin = ref(true)

const toRegister = () => {
  isLogin.value = false
}

const toLogin = () => {
  isLogin.value = true
}
</script>

<style scoped lang="scss">
main {
  /* 使背景全屏 */
  z-index: 9999999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
}

.container {
  height: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.login-wrapper {
  background-color: #fff;
  width: 358px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.close-button {
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 25px;
  cursor: pointer;
}
</style>
