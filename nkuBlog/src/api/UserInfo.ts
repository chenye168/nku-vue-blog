import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function getUserInfo(userId: number) {
  return request({
    url: '/api/getUserInfo',
    method: 'get',
    params: {
      userId
    }
  })
}
