<template>
  <div class="header" v-if="active === 0">Register</div>

  <div class="form-wrapper" v-show="active === 0">
    <input type="text" name="username" placeholder="username" class="input-item" />
    <input type="password" name="password" placeholder="password" class="input-item" />
  </div>

  <div class="form-wrapper" v-show="active === 0"></div>

  <div class="form-wrapper" v-show="active === 0"></div>

  <div class="step">
    <el-steps style="max-width: 600px" :active="active" finish-status="success">
      <el-step title=" 1" />
      <el-step title=" 2" />
      <el-step title=" 3" />
    </el-steps>

    <el-button style="margin-top: 12px" @click="back">{{ backB }}</el-button>
    <el-button style="margin-top: 12px" @click="next">{{ nextB }}</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { registerUser } from '@/api/RegisterUser'


const props = defineProps({
  func: {
    type: Function,
    default: () => {}
  }
})

//第几页
const active = ref(0)
//前进后退键值
const backB = ref('Login')
const nextB = ref('Next Step')
//按键逻辑
const next = () => {
  if (active.value++ > 1) {
    //更改按键的值
    nextB.value = 'Submit'
  }
  backB.value = 'Back Step'
}
const back = () => {
  if (backB.value === 'Login') props.func()
  if (active.value-- < 2) backB.value = 'Login'

  nextB.value = 'Next Step'
}

// 测试接口
// const test = {
//   userName: "admin",
//   userPassword: "admin",
//   photo: "+195XaEQAM4cHcUaDYiBIQRISCMCAFhRAgII0JAGBECwogQEEaEgDAiBIQRISCMCAFhRAgII0JAGBECwogQEEaEgDAiBIQRISCMCAFhRAgII0JAGBECwogQEEaEgDAiBIQRISCMCAFhRAgII0JAGBECwogQEEaEgDAiBIQRISCMCAFhRAgII0JAGBECwogQEEaEgDAiBIQRISCMCAFhRAgII0JAGBECwogQEPZ/PRriLlPTcAQAAAAASUVORK5CYII=",//base64编码
//   label: ["like1", "like2",],
//   address: "nankai",
//   mail: "dfsfdfs",
//   github: "www.baidu.com",
//   wechat: {
//     id: "sdfdsfsdfds",
//     qrCode: "+Jf8Ar7z/ANff/wDAv"
//   }
// };
// console.log(JSON.stringify(test))
// console.log(registerUser(JSON.stringify(test)))
</script>

<style scoped>
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

.step {
  position: absolute;
  display: grid;
  width: 258px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  bottom: 20px;
}

.el-steps {
  grid-column: span 2;
  width: 100%;
}

.el-button {
  width: 80%;
  margin: 0 auto;
}
</style>
