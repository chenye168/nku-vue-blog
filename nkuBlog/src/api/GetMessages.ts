import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function getMessages(authorId: string) {
  return request({
    url: '/api/getComment',
    method: 'get',
    params: {
      authorId
    }
  })
}
