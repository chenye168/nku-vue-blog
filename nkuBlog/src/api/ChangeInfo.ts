import request from '@/utils/request' // 引入封装得axios


interface InfoInterface {
  [key: string]: string;
}
// 获取用户列表
export function RegisterUser(Info: InfoInterface) {
  for (const key in Info) {
    if (Info[key] === '') {
      delete Info[key]
    }
    if (key === 'userId') {
      delete Info[key]
    }
  }

  return request({
    url: '/api/setUser',
    method: 'post',
    data: Info
  })
}
