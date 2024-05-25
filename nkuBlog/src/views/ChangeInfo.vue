<template>
  <header>
    <HeaderNav />
  </header>

  <div class="main">
    <div class="title">信息修改</div>
    <div class="form">
      <el-form ref="formRef" :model="form" label-width="100px" class="demo-ruleForm">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:5173/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="avatarImageUrl"
            :src="avatarImageUrl"
            class="avatar"
            style="width: 90px; height: 90px; border-radius: 100%"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <el-form-item label="Username" prop="userName">
          <el-input v-model="form.userName" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="userPassword">
          <el-input v-model="form.userPassword" placeholder="Password" type="password"></el-input>
        </el-form-item>

        <div style="display: flex; margin-bottom: 10px">
          <p style="margin-left: 50px; margin-right: 15px">Label</p>
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">
            + New Tag
          </el-button>
        </div>

        <div class="flex gap-2" style="margin-bottom: 10px; margin-left: 98px">
          <el-tag
            v-for="tag in form.label"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            style="margin: 2px"
          >
            {{ tag }}
          </el-tag>
        </div>

        <el-form-item label="Address" prop="address">
          <el-input v-model="form.address" placeholder="Address"></el-input>
        </el-form-item>
        <el-form-item label="Mail" prop="mail">
          <el-input v-model="form.mail" placeholder="Mail"></el-input>
        </el-form-item>
        <el-form-item label="Github" prop="github">
          <el-input v-model="form.github" placeholder="Github"></el-input>
        </el-form-item>
        <el-form-item label="Wechat ID" prop="wechat.id">
          <el-input v-model="form.wechat.id" placeholder="Wechat ID"></el-input>
        </el-form-item>
        <el-form-item label="Wechat QR Code" prop="wechat.qrCode">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:5173/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="wxImageUrl"
              :src="wxImageUrl"
              class="avatar"
              style="width: 100px; height: 100px"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 20px; margin-bottom: 20px">
      <el-button type="primary" @click="registe">Submit</el-button>
    </div>
  </div>
  <Switch v-if="switchin" :type="'enter'" :callback="switchOut" />
</template>

<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import Switch from '@/components/SwitchTransition.vue'
import { ref, onMounted, nextTick, computed } from 'vue'

import { ElMessage, ElInput } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { getUserId } from '@/api/GetUserId'
import { getUserInfo } from '@/api/UserInfo'
import { registerUser } from '@/api/RegisterUser'
import { userStatus } from '@/stores/userStatus'

const switchin = ref(true)

const switchOut = (n: boolean) => {
  switchin.value = n
}

//获取初始信息
const userStore = ref(userStatus())

onMounted(() => {
  getUser()
})
const getUser = async () => {
  form.value.userName = userStore.value.userName
  let res1 = await getUserId(userStore.value.userName)
  console.log(res1.data)
  form.value.userId = res1.data['userId']
  let res2 = await getUserInfo(res1.data['userId'])
  form.value = res2.data[0]

  return res2.data
}
const formRef = ref<FormInstance | null>(null)
const form = ref({
  userName: '',
  userId: '',
  userPassword: '',
  photo: 'default.jpg',
  label: [] as string[],
  address: '',
  mail: '',
  github: '',
  wechat: {
    id: '',
    qrCode: ''
  }
})

async function registe() {
  //提交表单
  // 将对象转换为json字符串
  // 删除rePassword

  registerUser(form.value).then((res) => {
    if (res.status === 200) {
      ElMessage.success('Register successfully')
    } else {
      ElMessage.error('Register failed')
    }
  })
}

//头像框上传

const updateAvatar = computed(() => {
  return 'http://src.cycodes.cn/src/img/' + form.value.photo
})

const updateWxqrcode = computed(() => {
  if (!form.value.wechat.qrCode) return ''
  return 'http://src.cycodes.cn/src/img/' + form.value.wechat.qrCode
})

const avatarImageUrl = ref(updateAvatar)
const wxImageUrl = ref(updateWxqrcode)

const handleAvatarSuccess1: UploadProps['onSuccess'] = (response) => {
  console.log(response)
  form.value.photo = response.path
}

const handleAvatarSuccess2: UploadProps['onSuccess'] = (response) => {
  console.log(response)
  form.value.wechat.qrCode = response.path
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

//表单逻辑

//标签逻辑
const inputValue = ref('')

const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
const handleClose = (tag: string) => {
  form.value.label.splice(form.value.label.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    form.value.label.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style scoped>
header {
  width: 100%;
  padding: 0%;
  margin: 0%;
}

.main {
  position: fixed;
  top: 60px;
  bottom: 5%;
  left: 5%;
  right: 5%;
  background-color: #f5f5f5;
  display: grid;
  grid-template-rows: 50px 1fr;
  border-radius: 20px;
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

.form {
  width: 80%;
  margin: 0 auto;
  overflow: auto;
}

/* 头像框 */

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 20px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  border: solid;
  border-radius: 100%;
}
</style>
