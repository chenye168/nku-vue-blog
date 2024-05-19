import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function Login(Info: JSON) {    
    
  return request({
    url: '/login',
    method: 'post',
    data: Info
  })
}


