/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

/**
 * Note: sub-menu 只出现在 children.length >= 1
 *
 * hidden: true                   如果设置为true，条目将不会显示在侧栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当item有多个子路由时,
 *                                它将变成嵌套模式，否则不会显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name:'router-name'             这个名字被<keep-alive>使用(必须设置!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色(可以设置多个角色)
    title: 'title'               名称显示在侧边栏和breadcrumb(推荐设置)
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
    affix: true                  如果设置为true, 标记将被添加到 the tags-view
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */

const demo2Router = {
  path: '/test',
  component: Layout,
  redirect: '/test/index1',
  meta: {
    title: '测试路由',
    icon: 'nested',
    roles: ['admin']
  },

  children: [
    {
      path: 'index1',
      name: 'Test1',
      meta: {
        title: '测试路由1'
      },
      component: () => import('@/views/demo2/index')
    },
    {
      path: 'index2',
      name: 'Test2',
      meta: {
        title: '测试路由2'
      },
      component: () => import('@/views/demo2/index')
    }
  ]
}

export default demo2Router
