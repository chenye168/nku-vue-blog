import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function getUserArticle(userId: number) {
  return request({
    url: '/getUserArticle',
    method: 'get',
    params: {
      userId:userId
    }
  })
}
