import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export async function getUserId(UserName: string) {
  return request({
    url: '/checkUser',
    method: 'get',
    params: {
      userName: UserName
    }
  })
}
