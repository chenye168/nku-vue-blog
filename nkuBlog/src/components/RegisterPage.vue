<template>

   <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm"
   >
   <div class="form-wrapper" v-show="active === 0">
    <div class="header" v-if="active === 0">Register</div>
    <el-upload
    class="avatar-uploader"
    action="http://localhost:5173/api/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess1"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="avatarImageUrl" :src="avatarImageUrl" class="avatar" style="width: 90px; height: 90px; border-radius: 100%;">
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
    <el-form-item label="Username" prop="userName">
      <el-input v-model="form.userName" placeholder="Username" ></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="userPassword">
      <el-input v-model="form.userPassword" placeholder="Password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="rePassword" prop="rePassword">
      <el-input v-model="form.rePassword" placeholder="rePassword" type="password"></el-input>
    </el-form-item>

    
  </div>
  <div class="form-wrapper2" v-show="active === 1">
    <div class="header" v-if="active === 1">Basic Info</div>
    <div style="display: flex;margin-bottom: 30px;">
      <p style="margin-right: 30px; position: fixed; left: 100px">Label</p>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
      style="width: 60px;"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">
      + New Tag
    </el-button>
    </div>
   
    <div class="flex gap-2" style="margin-bottom: 20px;">
    <el-tag
      v-for="tag in form.label"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
      style="margin: 2px;"
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
  </div>
  <div class="form-wrapper" v-show="active === 2">
    <div class="header" v-if="active === 2">Contact Ways</div>
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
        <img v-if="wxImageUrl" :src="wxImageUrl" class="avatar" style="width: 100px; height: 100px;" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
  </div>
   </el-form>

   <!-- 确认页 -->
  <div class="form-wrapper" v-show="active === 3">
    <div class="header" v-if="active === 3">Confirm</div>
    <div >Please confirm your information</div>
    <!-- 显示表单信息 -->
    <div class="msg2">Username: {{ form.userName }}</div>
    <div class="msg2">Password: {{ form.userPassword }}</div>
    <div class="msg2">Label: {{ form.label }}</div>
    <div class="msg2">Address: {{ form.address }}</div>
    <div class="msg2">Mail: {{ form.mail }}</div>
    <div class="msg2">Github: {{ form.github }}</div>
    <div class="msg2">Wechat ID: {{ form.wechat.id }}</div>

  </div>

    
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
import { ref, defineProps, reactive, nextTick, computed } from 'vue'
import { registerUser } from '@/api/RegisterUser'
import { ElMessage, ElInput } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps({
  func: {
    type: Function,
    default: () => {}
  }
})


const formRef = ref<FormInstance | null>(null)
const form = ref({
  userName: '',
  userPassword: '',
  rePassword: '',
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


//第几页
const active = ref(0)
//前进后退键值
const backB = ref('Login')
const nextB = ref('Next Step')

const validateForm = () => {
  return new Promise((resolve) => {
    formRef.value!.validate((valid) => {
      if (!valid) {
        ElMessage.error('Please fill in the form correctly');
      }
      resolve(valid);
    });
  });
};

async function registe() {
  let isValid = await validateForm();
    if (!isValid) {
      console.log(isValid)
      return;
    }
    
    //提交表单
    // 将对象转换为json字符串
    // 删除rePassword
    
    form.value.rePassword = ''
    registerUser(form.value).then((res) => {
      if (res.status === 200) {
        ElMessage.success('Register successfully')
        props.func()
      } else {
        ElMessage.error('Register failed')
      }
    })
}

//按键逻辑
const next = () => {
  if (active.value === 3) {
    //对表单进行验证
    registe();
  
    return
  }
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


//头像框上传

const updateAvatar = computed(() => {
  return 'http://src.cycodes.cn/src/img/'+form.value.photo
})

const updateWxqrcode = computed(() => {
  if (!form.value.wechat.qrCode) return ''
  return 'http://src.cycodes.cn/src/img/'+form.value.wechat.qrCode
})

const avatarImageUrl = ref(updateAvatar)
const wxImageUrl = ref(updateWxqrcode)

const handleAvatarSuccess1: UploadProps['onSuccess'] = (
  response
) => {
  console.log(response)
  form.value.photo = response.path;
}

const handleAvatarSuccess2: UploadProps['onSuccess'] = (
  response
) => {
  console.log(response)
  form.value.wechat.qrCode = response.path;
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


// 验证表单下一步



const rules = reactive<FormRules>({
  userName: [
    { required: true, message: 'Please enter your username', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: 'Please enter your password', trigger: 'blur' }
  ],
  rePassword: [
    { required: true, message: 'Please enter your rePassword', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.userPassword) {
          callback(new Error('The two passwords do not match'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  photo: [
    { required: true, message: 'Please upload your photo', trigger: 'blur' }
  ],
  label: [
    { required: true, message: 'Please enter your label', trigger: 'blur' }
  ],
  address: [
    { required: true, message: 'Please enter your address', trigger: 'blur' }
  ],
  mail: [
    { required: true, message: 'Please enter your mail', trigger: 'blur' }
  ],
  github: [
    { required: true, message: 'Please enter your github', trigger: 'blur' }
  ],
  'wechat.id': [
    { required: true, message: 'Please enter your wechat id', trigger: 'blur' }
  ],
  'wechat.qrCode': [
    { required: true, message: 'Please upload your wechat qrCode', trigger: 'blur' }
  ]
})


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
  line-height: 100px;
  margin-bottom: 60px;
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
.msg2 {
  line-height: 30px;

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

.form-wrapper2 {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
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
