import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  console.log('router.beforeEach()')
  console.log('to.path:', to.path)
  console.log('from.path', from.path)
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      console.log('hasGetUserInfo:')
      console.log(hasGetUserInfo)

      if (hasGetUserInfo) {
        console.log('already has userInfo')
        next()
      } else {
        try {
          // get user info
          console.log('permission.js to.path:', to.path)
          await store.dispatch('user/getInfo')

          console.log(
            'dispatch generateRoutes, userrole:',
            store.getters.userrole
          )

          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            store.getters.userrole
          )

          router.addRoutes(accessRoutes)
          console.log('After addRoutes:')
          // console.log(router)

          /** /send/sms
           *  /send/cash
           *  /summary/history
           *  /summary/record
           */
          // This is not a good methods!!
          // To solve the 2nd grade url can not be accessed
          // problem, wont be a blank page
          let strArr = to.path.split('/')
          console.log('strArr:', strArr)
          if (strArr.length >= 3 && from.path === '/') {
            console.log('next to:', '/' + strArr[1])
            next(
              '/' +
                strArr[1] +
                '/' +
                strArr[2] +
                '?' +
                Math.floor(10 * Math.random())
            )
          } else {
            next()
          }

          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          console.log('permission.js sth. error')
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token ,  check if it's in the whitelist, else, go to login page */
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      console.log('it is in the whitelist')
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      console.log('it is other page than whitelist')
      console.log(`${to.path}`)
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
