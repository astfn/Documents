import { sysInfoBehavior } from '../../common/Behaviors/sysInfoBehavior'
import { TTabBarItemConfig } from '../../common/constants'
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  behaviors: [sysInfoBehavior],
  properties: {
    items: {
      type: Array,
      value: [],
    },
  },
  data: {
    active: undefined,
  },
  lifetimes: {
    attached() {
      this.setActiveTab() // 初始化时设置活跃的 tab
    },
  },
  methods: {
    setActiveTab() {
      const currentPage = getCurrentPages().pop() // 获取当前页面实例
      const currentPath = currentPage?.route // 获取当前路径
      this.updateActiveTab(currentPath!)
    },
    updateActiveTab(path: string) {
      const detailInfo = (this.properties.items as TTabBarItemConfig[]).find(
        (item) => {
          console.log(item.pagePath)
          const pathArr = item.pagePath.split('/')
          pathArr.shift()
          const matchPath = pathArr?.join?.('/')
          return path?.includes?.(matchPath)
        }
      )
      // console.log('updateActiveTab', path, detailInfo)
      this.setData({ active: detailInfo?.key })
    },
    onChange(event: any) {
      const key = event?.detail
      const detailInfo = (this.properties.items as TTabBarItemConfig[]).find(
        (item) => item.key == key
      )
      // console.log('onChange', detailInfo)
      detailInfo && wx.switchTab({ url: detailInfo.pagePath })
    },
  },
})
