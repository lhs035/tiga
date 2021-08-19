const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

// 全部的路由规则
const routes = deepClone([...constantRoutes, ...asyncRoutes])

// 角色
const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: '超级管理员。可以查看所有页面',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: '正常的编辑器。可以查看除权限页以外的所有页面',
    routes: routes.filter(i => i.path !== '/permission') // just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: '只是一个游客。只能看到主页和文档页',
    routes: [
      {
        path: '',
        redirect: 'dashboard',
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            meta: { title: 'dashboard', icon: 'dashboard' }
          }
        ]
      }
    ]
  }
]

module.exports = [
  // Mock获取所有路由表单服务器
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // Mock从服务器获取所有角色
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // 添加角色
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // 更新角色
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // 删除角色
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
