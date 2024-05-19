import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function getUserList () {
  return request({
    url: '/api/getUserList',
    method: 'get',
  })
}