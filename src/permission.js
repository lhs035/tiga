import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // 重定向白名单

// 全局前置守卫
router.beforeEach(async(to, from, next) => {
  console.log(`@/permission.js >> 全局前置守卫, 要去的地址是 >> ${to.fullPath}`)
  // start progress bar
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否已经登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 判断用户是否通过getInfo获得了权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        console.log('@/permission.js >> 全局前置守卫, 没有通过getInfo获得了权限角色')
        try {
          // 获取用户信息
          // note: 角色必须是一个数组 such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 生成基于角色的可访问路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问路由
          console.log('@/permission.js >> 全局前置守卫, 执行了router.addRoutes操作')
          router.addRoutes(accessRoutes)

          // hack方法来确保addroues是完整的
          // 设置replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 移除token，到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    console.log('@/permission.js >> 全局前置守卫, has no token')
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('@/permission.js >> 全局前置守卫, 在白名单中')
      // 白名单，直接去
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
