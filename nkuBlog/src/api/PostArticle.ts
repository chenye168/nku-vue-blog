import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function PostArticle(Info: JSON) {
  return request({
    url: '/api/setArticle',
    method: 'post',
    data: Info
  })
}
