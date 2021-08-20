# 模拟 vue element admin

## @/permission.js

用户登录权限控制

```
路由全局前置守卫
从 cookie 中判断用户是否登录
   已经登录
      去的是登录页?
         是 那么重定向去主页
         否 从 store 中获取角色信息
            有角色信息 正常放行
            无角色信息
               发起网络请求 获取角色信息
               发起网络请求 生成基于角色的可访问路由图
               放行
   未登录
      去的路径是 白名单
         放行
         不是白名单 重定向去登录页
```

## store

```
   app
      sidebar 侧边栏的展开状态
      device  设备 desktop / mobile
      size    element的尺寸

   tagsView
      visitedViews   访问过的页面
      cachedViews    keep-alive 缓存的页面

   user
      token          token
      name           名字
      avatar         头像
      introduction   描述
      roles          用户角色

   permission
      routes     全部路由
      addRoutes  经过权限校验的路由

   settings
      theme:         element 的主题色
      showSettings   显示右边的设置
      tagsView       显示标签视图
      fixedHeader    固定头部,
      sidebarLogo    侧边栏logo

   errorLog
      logs    vue错误日志信息

```

## cookies

```
size           element的尺寸
sidebarStatus  侧边栏的展开状态
Admin-Token    用户token
```
