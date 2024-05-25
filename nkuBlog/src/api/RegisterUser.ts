import request from '@/utils/request' // 引入封装得axios


// 获取用户列表
export function registerUser(Info: Object) {

  return request({
    url: '/api/setUser',
    method: 'post',
    data: JSON.stringify(Info)
  })
}
