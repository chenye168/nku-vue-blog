import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function RegisterUser(Info: JSON) {
  for (const key in Info) {
    if (Info[key] === '') {
      delete Info[key]
    }
    if (key === 'userId') {
      delete Info[key]
    }
  }

  return request({
    url: '/api/setUser',
    method: 'post',
    data: Info
  })
}
