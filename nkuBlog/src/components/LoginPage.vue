<template>
  <div class="header">Login</div>
  <div class="form-wrapper">
    <input type="text" name="username" placeholder="username" class="input-item" />
    <input type="password" name="password" placeholder="password" class="input-item" />
    <div class="btn" @click="subLogin">Login</div>
  </div>
  <div class="msg">
    Don't have account?
    <a href="#" @click="register">Sign up</a>
  </div>
</template>

<script setup>
import { Login } from '@/api/Login'

import { userStatus } from '@/stores/userStatus'
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'


const userStore = ref(userStatus())
const router = useRouter()

const props = defineProps({
  func: {
    type: Function,
    default: () => {}
  }
})

const subLogin = () => {
  const username = document.querySelector('input[name="username"]').value
  const password = document.querySelector('input[name="password"]').value
  const form = {
    userName: username,
    userPassword: password
  }
  Login(form).then((res) => {
    const data = res.data.data
    userStore.value.hasLogin = true
    userStore.value.userName = username
    userStore.value.token = data.token
    // 登录成功跳转，返回上一层路由
    router.go(-1)
  })
}

const register = () => {
    props.func();
}


</script>

<style scoped lang="scss">
.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}
.input-item:placeholder {
  text-transform: uppercase;
}
.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
}
.msg {
  text-align: center;
  line-height: 88px;
}
a {
  text-decoration-line: none;
  color: #abc1ee;
}
</style>
