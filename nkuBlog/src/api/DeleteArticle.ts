import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function DeleteArticle(Info: JSON) {
  return request({
    url: '/setArticle',
    method: 'post',
    data: Info
  })
}
