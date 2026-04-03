/// <reference path="./types/index.d.ts" />

import { TAppGlobalData } from '../miniprogram/globalData'

interface IAppOption {
  globalData: TAppGlobalData
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}
