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
// For admin role only
export function getUsers() {
  return request({
    url: '/api/admin/users',
    method: 'get'
  })
}
export function getMsgs() {
  return request({
    url: '/api/admin/msgs',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}
// post a single msg
export function postUserSendSingle(data) {
  return request({
    url: '/api/user/send/single',
    method: 'post',
    data
  })
}

export function getAdminInfo() {
  return request({
    url: '/api/admin/info',
    method: 'get'
  })
}
