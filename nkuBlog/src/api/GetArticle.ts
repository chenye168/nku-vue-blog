import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function getArticle(article: string) {
  return request({
    url: '/srcp/md/'+article,
    method: 'get',
    responseType: 'stream'
  })
}
