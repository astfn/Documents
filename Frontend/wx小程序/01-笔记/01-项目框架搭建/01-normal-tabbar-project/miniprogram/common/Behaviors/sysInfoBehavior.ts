export const sysInfoBehavior = Behavior({
  data: {
    deviceInfo: {},
    windowInfo: {},
  },
  lifetimes: {
    attached() {
      const deviceInfo = wx.getDeviceInfo()
      const windowInfo = wx.getWindowInfo()
      this.setData({ deviceInfo, windowInfo })
    },
  },
})
