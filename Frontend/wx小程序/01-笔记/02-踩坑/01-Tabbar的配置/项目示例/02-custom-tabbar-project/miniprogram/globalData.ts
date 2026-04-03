// 全局参数
const { miniProgram } = wx.getAccountInfoSync()
const env = miniProgram.envVersion

const EnvMapBaseUrl = Object.freeze<{ [key in typeof env]: string }>({
  develop: 'https://wukuang.test.ebaolife.net',
  trial: 'https://wukuang.test.ebaolife.net',
  release: 'https://wukuang.test.ebaolife.net',
})

export type TAppGlobalData = typeof globalData
export const globalData = {
  env,
  baseUrl: EnvMapBaseUrl[env],
  appId: miniProgram.appId,
}
