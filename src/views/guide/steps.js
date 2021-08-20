const steps = [
  {
    element: '#hamburger-container',
    popover: {
      title: '按钮',
      description: '打开或关闭侧边栏',
      position: 'bottom'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: '面包屑',
      description: '指示当前页面位置',
      position: 'bottom'
    }
  },
  {
    element: '#header-search',
    popover: {
      title: '页面搜索',
      description: '页面搜索，快速导航',
      position: 'left'
    }
  },
  {
    element: '#screenfull',
    popover: {
      title: '全屏',
      description: '将页面设置为全屏',
      position: 'left'
    }
  },
  {
    element: '#size-select',
    popover: {
      title: '切换大小',
      description: '切换系统大小',
      position: 'left'
    }
  },
  {
    element: '#tags-view-container',
    popover: {
      title: '标签视图',
      description: '访问的页面的历史',
      position: 'bottom'
    },
    padding: 0
  }
]

export default steps
