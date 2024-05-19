import request from '@/utils/request' // 引入封装得axios

// 获取用户列表
export async function verifyUser(userName: string) {
  const response = await request({
    url: '/checkUser',
    method: 'get',
    params: {
      userName: userName
    }
  })
  return response && response.data ? true : false
}
