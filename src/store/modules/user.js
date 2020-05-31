import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getCaptcha } from '../../api/user'
import router, { adminRoutes, userRoutes } from '../../router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userrole: -1,
    username: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
    state.username = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.userrole = role
  },
  SET_USERNAME: (state, name) => {
    state.username = name
    state.name = name
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, captcha } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password.trim(),
        captcha: captcha.trim()
      })
        .then(response => {
          console.log('resp data:')
          console.log(response)
          const { data } = response
          commit('SET_TOKEN', data.token)
          commit('SET_ROLE', data.role)
          commit('SET_NAME', data.username)
          setToken(data.token)
          if (data.role === 0) {
            console.log('login add adminroutes')
            router.addRoutes(adminRoutes)
          } else {
            console.log('login add userRoutes')
            router.addRoutes(userRoutes)
          }
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  captcha({ commit }) {
    return new Promise((resolve, reject) => {
      getCaptcha()
        .then(response => {
          console.log('getCaptcha OK')
          const { data } = response
          console.log(data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token)
      console.log('To getInfo in api/user.js')
      // console.log('username:', state.username)

      getInfo()
        .then(response => {
          const data = response.data
          console.log('getInfo resp:', data)
          console.log('response:')
          console.log(response)
          if (response.code !== 0) {
            console.log('-------------response code not equal 0')
            // eslint-disable-next-line
            reject('Verification failed, please Login again.')
          } else {
            console.log('-------------set name and role')
            console.log(data)

            commit('SET_NAME', data.name)
            commit('SET_ROLE', data.role)
            // reset router
            resetRouter()

            if (data.role === 0) {
              console.log('add adminroutes')
              router.addRoutes(adminRoutes)
            } else {
              console.log('add userRoutes')
              router.addRoutes(userRoutes)
            }
            resolve(data)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
