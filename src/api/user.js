import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    // url: '/vue-admin-template/user/info',
    url: '/api/auth/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    url: '/api/auth/logout',
    method: 'post'
  })
}
// get captcha from the server
export function getCaptcha() {
  return request({
    url: '/api/auth/captcha',
    method: 'get'
  })
}
