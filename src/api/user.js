import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(username) {
  return request({
    // url: '/vue-admin-template/user/info',
    url: '/api/auth/info',
    method: 'get',
    params: { username }
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    url: '/api/auth/logout',
    method: 'post'
  })
}
