const tokens = {
  admin: { token: 'admin-token' },
  editor: { token: 'editor-token' }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: '我是编辑者',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  /**
   * user login
   * 根据用户名获取 token
   * 没有获取到则返回错误 60204
   * 获取到后吧获取到的token返回给前台
   */
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '帐号和密码错误'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  /**
   * get user info
   * 根据用户传来的token 返回用户信息
   * 没有找到则向前台返回错误信息
   * 找到了把信息传送给前台
   */
  {
    url: '/vue-element-admin/user/info.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，无法获得用户详细信息。'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  /**
   * user logout
   * 用户退出
   */
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
