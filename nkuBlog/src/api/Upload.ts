import request from '@/utils/request' // 引入封装得axios



export function registerUser(file: File) {
  return request({
    url: '/api/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    file: file
  })
}
