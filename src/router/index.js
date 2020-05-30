import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import HelloWorld from '@/components/HelloWorld'
/*
import Login from '@/components/Login'
import Home from '@/components/Home'
*/

Vue.use(Router)
/* Layout */
// eslint-disable-next-line
import Layout from '@/layout'

/*
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
*/
const adminRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin-dashboard/index'),
        meta: { title: '控制中心', icon: 'dashboard' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
/*
const normalRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/normal-dashboard/index'),
        meta: { title: '控制中心', icon: 'dashboard' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
*/
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '控制中心', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/sms',
    name: '信息统计',
    meta: { title: '信息统计', icon: 'example' },
    children: [
      {
        path: 'sms',
        name: '短信统计',
        component: () => import('@/views/sms/index'),
        meta: { title: '短信', icon: 'table' }
      },
      {
        path: 'cash',
        name: '现金',
        component: () => import('@/views/cash/index'),
        meta: { title: '现金', icon: 'money' }
      },
      {
        path: 'uplink',
        name: '短信上行',
        component: () => import('@/views/uplink/index'),
        meta: { title: '上行', icon: 'email' }
      }
      // {
      //   path: 'table',
      //   name: 'Table',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: 'Table', icon: 'table' }
      // },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/notification',
    component: Layout,
    redirect: '/notification/sms',
    name: '通知类短信',
    meta: { title: '通知类短信', icon: 'example' },
    children: [
      {
        path: 'sms',
        name: '发送短信',
        component: () => import('@/views/sms/index'),
        meta: { title: '短信', icon: 'table' }
      },
      {
        path: 'recore',
        name: '短信记录',
        component: () => import('@/views/sms/index'),
        meta: { title: '短信记录', icon: 'table' }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/basic',
    name: '账户',
    meta: { title: '账户管理', icon: 'cecurity-protection' },
    children: [
      {
        path: 'basic',
        name: '基本信息',
        component: () => import('@/views/basic/index'),
        meta: { title: '账户信息', icon: 'table' }
      },
      {
        path: 'password',
        name: '修改密码',
        component: () => import('@/views/password/index'),
        meta: { title: '密码', icon: 'table' }
      }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () =>
  //                 import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () =>
  //                 import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const createAdminRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: adminRoutes
  })

// const createNormalRouter = () =>
//   new Router({
//     // mode: 'history', // require service support
//     scrollBehavior: () => ({ y: 0 }),
//     routes: normalRoutes
//   })

// const router = createRouter()
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const role = store.getters.userrole
  console.log('role:', role)
  if (role === 0) {
    // admin
    console.log('This is admin')
    let newRouter = createAdminRouter()
    router.matcher = newRouter.matcher
  } else {
    // normal user
    console.log('This is normal user')
    let newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
  }
}

export default router
