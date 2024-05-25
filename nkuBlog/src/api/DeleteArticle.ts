import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export function DeleteArticle(Info: Object) {
  return request({
    url: '/api/setArticle',
    method: 'post',
    data: JSON.stringify(Info)
  })
}
