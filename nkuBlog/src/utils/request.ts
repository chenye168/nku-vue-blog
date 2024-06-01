import Axios from 'axios'
import { userStatus } from '@/stores/userStatus'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import { showLoading, hideLoading } from '@/utils/loading'

const userStore = ref(userStatus())

//获取当前网站域名

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000, // 超时
  baseURL: 'http://localhost:5173' // 请求接口地址，这里使用本项目地址，因为我们是前后端分离，后面需要在vue.config.js里面配置代理，实际请求得地址不是这个。
})

// 请求拦截
axios.interceptors.request.use((req) => {
  showLoading(undefined)
  if (userStore.value.hasLogin && userStore.value.token) {
    req.headers.Authorization = `Bearer ${userStore.value.token}`
  }

  return req
})

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
    setTimeout(() => {
      hideLoading()
    }, 200)
    return response
  },
  (error) => {
    // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，避免多次请求loading关闭又开启
    setTimeout(() => {
      hideLoading()
    }, 200)

    // 响应失败统一处理
    const { response } = error
    if (response) {
      switch (response.status) {
        case 410:
          ElMessage.error('用户已存在')
          break
        case 411:
          ElMessage.error('用户不存在')
          break
        case 412:
          ElMessage.error('文章不存在')
          break
        case 413:
          ElMessage.error('文件类型错误')
          break
        case 401:
          userStore.value.hasLogin = false
          userStore.value.token = ''
          userStore.value.userName = ''
          ElMessageBox.confirm('用户未登录或登录状态过期', '提示', {
            confirmButtonText: '登录',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
            location.href = '/login'
          })
          break
        case 500:
          ElMessageBox.confirm('用户不存在或密码错误', '提示', {
            confirmButtonText: '重新输入',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {})
          break
        case 403:
          ElMessage.error('权限不足，请联系管理员')
          location.href = '/'
          break
        case 404:
          location.href = '/404'
          break
        case 400:
          ElMessage.error('参数错误')
          break
        default:
          ElMessage.error('服务器异常，请联系管理员')
          location.href = '/'
          break
      }
    }
    return Promise.reject(error)
  }
)
export default axios
