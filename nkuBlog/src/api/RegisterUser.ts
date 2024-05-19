import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function registerUser(Info: JSON) {
  return request({
    url: '/api/setUser',
    method: 'post',
    data: Info
  })
}
