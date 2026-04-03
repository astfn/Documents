import { sysInfoBehavior } from '../../common/Behaviors/sysInfoBehavior'

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  behaviors: [sysInfoBehavior],
  properties: {
    customStyle: {
      type: String,
    },
    leftText: {
      type: String,
    },
    title: {
      type: String,
    },
    leftArrow: {
      type: Boolean,
      value: true,
    },
    right: {
      type: String,
      value: '更多',
    },
  },
  methods: {
    clickLeft() {
      wx.navigateBack()
    },
  },
})
