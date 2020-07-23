import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
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
/*
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
*/
export const defaultRoutes = [
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
  }
  // 404 page must not be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
export const adminRoutes = [
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
        meta: { title: '用户信息', icon: 'table' }
      },
      {
        path: 'agent',
        name: '代理信息',
        component: () => import('@/views/basic/agent'),
        meta: { title: '代理信息', icon: 'table' }
      },
      {
        path: 'action',
        name: '操作记录',
        component: () => import('@/views/action/index'),
        meta: { title: '操作记录', icon: 'operation-record' }
      }
    ]
  },
  {
    path: '/summary',
    component: Layout,
    redirect: '/summary/sms',
    name: '信息统计',
    meta: { title: '信息统计', icon: 'example' },
    children: [
      {
        path: 'sms',
        name: '短信统计',
        component: () => import('@/views/summary/index'),
        meta: { title: '短信', icon: 'table' }
      },
      {
        path: 'msg',
        name: '单条短信',
        component: () => import('@/views/summary/msgton'),
        meta: { title: '单条', icon: 'svg_sms_send' }
      }
      // {
      //   path: 'uplink',
      //   name: '短信上行',
      //   component: () => import('@/views/uplink/index'),
      //   meta: { title: '上行', icon: 'email' }
      // }
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
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const userRoutes = [
  {
    path: '/send',
    component: Layout,
    redirect: '/send/sms',
    name: '短信发送',
    meta: { title: '短信发送', icon: 'example' },
    children: [
      {
        path: 'sms',
        name: '单条',
        component: () => import('@/views/send/index'),
        meta: { title: '单条', icon: 'svg_sms_send' }
      },
      {
        path: 'multisms',
        name: '多条',
        component: () => import('@/views/sendmulti/index'),
        meta: { title: '多条', icon: 'pli-mail-send' }
      }
    ]
  },
  {
    path: '/summary',
    component: Layout,
    redirect: '/summary/history',
    name: '短信统计',
    meta: { title: '短信统计', icon: 'example' },
    children: [
      {
        path: 'history',
        name: '历史记录',
        component: () => import('@/views/sms/index'),
        meta: { title: '历史记录', icon: 'table' }
      }
      // {
      //   path: 'record',
      //   name: '操作记录',
      //   component: () => import('@/views/sms/index'),
      //   meta: { title: '操作记录', icon: 'table' }
      // }
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

export const agentRoutes = [
  {
    path: '/agent',
    component: Layout,
    redirect: '/agent/user',
    name: '账户',
    meta: { title: '账户管理', icon: 'cecurity-protection' },
    children: [
      {
        path: 'user',
        name: '用户信息',
        component: () => import('@/views/agent/user'),
        meta: { title: '用户信息', icon: 'table' }
      },
      {
        path: 'action',
        name: '操作记录',
        component: () => import('@/views/agent/action'),
        meta: { title: '操作记录', icon: 'operation-record' }
      }
    ]
  },
  {
    path: '/summary',
    component: Layout,
    redirect: '/summary/sms',
    name: '信息统计',
    meta: { title: '信息统计', icon: 'example' },
    children: [
      {
        path: 'sms',
        name: '短信统计',
        component: () => import('@/views/summary/agent/sms'),
        meta: { title: '短信', icon: 'table' }
      },
      {
        path: 'msg',
        name: '单条短信',
        component: () => import('@/views/summary/agent/msgton'),
        meta: { title: '单条', icon: 'svg_sms_send' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createDefaultRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: defaultRoutes
  })

// const router = createRouter()
const router = createDefaultRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  console.log('resetRouter')
  console.log('This is basic router')
  let newRouter = createDefaultRouter()
  router.matcher = newRouter.matcher // reset router
  // }
}

export default router
