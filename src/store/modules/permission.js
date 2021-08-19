import { asyncRoutes, constantRoutes } from '@/router'

/**
 * @desc 使用 meta.role 确定当前用户是否具有权限
 * @param {Array} roles 角色 [ "admin", "editor" ]
 * @param {Array} route  单个路由信息
 * @returns {Boolean}
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(item => route.meta.roles.includes(item))
  } else {
    return true
  }
}

/**
 * @desc 生成需要权限校验的路由
 * @param {Array} routes  asyncRoutes 分配权限的路由
 * @param {Array} roles  角色 ["editor"]
 * @returns {Array}
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(item => {
    const tmp = { ...item }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * store --------------------------------------------  permission
 */

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    console.log(`@/store/modules/permission.js >> 动态生成的路由和全部路由存到state中`)

    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 动态生成路由
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      console.log(`@/store/modules/permission.js >> 动态生成路由`)
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
