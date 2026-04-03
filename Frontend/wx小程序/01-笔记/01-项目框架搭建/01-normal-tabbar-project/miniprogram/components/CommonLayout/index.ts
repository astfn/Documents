Component({
  externalClasses: ['custom-layout'],
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    slotHeader: {
      type: Boolean,
      value: false,
    },
    headerLeftText: {
      type: String,
    },
    showleftArrow: {
      type: Boolean,
      value: true,
    },
    title: {
      type: String,
    },
  },
})
