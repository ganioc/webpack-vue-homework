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

// post a multiple msg
export function postUserSendMultiple(data) {
  return request({
    url: '/api/user/send/multi',
    method: 'post',
    data
  })
}
export function getUserSmsHistory(currentPage, numPage) {
  return request({
    url: '/api/user/sms/history',
    method: 'get',
    params: {
      curpage: currentPage,
      numpage: numPage
    }
  })
}
export function getAdminInfo() {
  return request({
    url: '/api/admin/info',
    method: 'get'
  })
}
export function getAdminSmsHistory(currentPage, numPerPage) {
  return request({
    url: '/api/admin/sms/history',
    method: 'get',
    params: {
      curpage: currentPage,
      numpage: numPerPage
    }
  })
}
export function getAdminGetUsers(currentPage, numPerPage) {
  return request({
    url: '/api/admin/getusers',
    method: 'get',
    params: {
      curpage: currentPage,
      numpage: numPerPage
    }
  })
}
export function getAdminGetUser(name) {
  return request({
    url: '/api/admin/getuser',
    method: 'get',
    params: {
      username: name
    }
  })
}
export function postAdminSetUser(data) {
  return request({
    url: '/api/admin/setuser',
    method: 'post',
    data
  })
}
export function postCreateUser(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/api/admin/createuser',
    method: 'post',
    data
  })
}

export function postDeleteUser(name) {
  return request({
    url: '/api/admin/deleteuser',
    method: 'post',
    data: {
      username: name
    }
  })
}
