import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function getArticle(articleId: number) {
  return request({
    url: '/api/getArticle',
    method: 'get',
    params: {
      articleId
    }
  })
}
