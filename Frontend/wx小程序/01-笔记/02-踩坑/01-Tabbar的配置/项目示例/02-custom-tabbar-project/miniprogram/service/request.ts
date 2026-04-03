import { IAppOption } from '../../typings'

/**
 * @description: HTTP请求方法枚举
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  OPTIONS = 'OPTIONS',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description: HTTP请求配置
 */
interface RequestConfig {
  /** API路径 */
  url?: string
  /** Method类型 */
  method?: HttpMethod
  /** 接口返回数据 */
  data?: any
  /** 无TOKEN触发异常捕获时，是否执行异常逻辑 */
  needToken?: boolean
  /** Header头部 */
  header?: object
  /** 返回的数据格式 */
  dataType?: string
  /** 请求报错时，是否弹出message提示（默认弹出）*/
  noShowMsg?: boolean
}

/**
 * @description: 声明业务数据类型
 */
export interface MyAwesomeData<T> {
  code: number
  msg: string
  data: T
}
const AppInstance = getApp<IAppOption>()
class HttpRequest {
  private static instance: HttpRequest
  private constructor() {}
  /** 请求函数(单例模式)
    *
    * **注意：**
    * `method`需使用`HttpMethod`枚举类，切勿自行定义
    *
    * **示例代码**
    * ```js
     HttpRequest.getInstance().request({
       url: '/Api',
       method: HttpMethod.GET
     })
    * ```
    */
  public static getInstance(): HttpRequest {
    if (!this.instance) {
      this.instance = new HttpRequest()
    }
    return this.instance
  }

  // 处理请求异常状态码
  private handerErrorStatus(statusCode: number, responseData: any) {
    let msg = responseData.errorMsg || '服务出错'
    wx.showToast({
      title: `${msg}，错误码：${statusCode}`,
      icon: 'none',
    })
    return msg
  }

  // 服务器接口请求
  public request<T>(requestConfig: RequestConfig): Promise<MyAwesomeData<T>> {
    let _this = this
    return new Promise((resolve, reject) => {
      // 默认header
      const contentType =
        requestConfig.method === 'GET'
          ? 'application/x-www-form-urlencoded'
          : 'application/json'
      const header = {
        'content-type': contentType,
        Authorization: wx.getStorageSync('token'), //获取保存的token
      }
      wx.request({
        method: requestConfig.method,
        url: `${requestConfig.url}`,
        data: requestConfig.data,
        header: Object.assign(header, requestConfig?.header),
        dataType: !requestConfig.dataType ? 'json' : '其他',
        success: function (res) {
          const status = res.statusCode || -404
          let data = (res.data || {}) as any
          data = data || {}
          const { code, isSuccess } = data
          /** 接口请求成功*/
          if (status == 200) {
            // resolve(data as any)
            if (isSuccess && code === 0) {
              return resolve({
                data: data.data,
              } as any)
            }
            showToast(data?.message || data?.errorMsg)
            return reject({ ...res, response: res })
          } else if ([401, 403].includes(status)) {
            // 未授权
            if (
              ['user/login'].every(
                (url) => requestConfig.url?.indexOf(url) === -1
              )
            ) {
              jumpToLogin()
            }
            reject({ code, msg: '未登录', data: data })
          } else {
            //非200及401状态码-数据处理
            const errMsg = _this.handerErrorStatus(code, data)
            reject({ code, msg: errMsg, data })
          }
        },
        fail: (err) => {
          showToast((err as any)?.data?.errorMsg)
          reject(err)
        },
      })
    })
  }

  /**
   * @description: get请求函数
   * @param {string} url 请求地址
   * @param {Object} data 请求参数
   * @param {RequestConfig} OtherConfig request其他配置
   * @return {*}
   */
  public get<T>(url: string, data?: Object, OtherConfig?: RequestConfig) {
    url = AppInstance.globalData.baseUrl + url
    return this.request<T>({
      method: HttpMethod.GET,
      url,
      data,
      ...OtherConfig,
    })
  }

  /**
   * @description: post请求函数
   * @param {string} url 请求地址
   * @param {Object} data 请求参数
   * @param {RequestConfig} OtherConfig request其他配置
   * @return {*}
   */
  public post<T>(url: string, data: Object, OtherConfig?: RequestConfig) {
    url = AppInstance.globalData.baseUrl + url
    return this.request<T>({
      method: HttpMethod.POST,
      url,
      data,
      ...OtherConfig,
    })
  }

  /**
   * @description: delete请求函数
   * @param {string} url 请求地址
   * @param {Object} data 请求参数
   * @param {RequestConfig} OtherConfig request其他配置
   * @return {*}
   */
  public delete<T>(url: string, data: Object, OtherConfig?: RequestConfig) {
    url = AppInstance.globalData.baseUrl + url
    return this.request<T>({
      method: HttpMethod.DELETE,
      url,
      data,
      ...OtherConfig,
    })
  }

  /**
   * @description: put请求函数
   * @param {string} url 请求地址
   * @param {Object} data 请求参数
   * @param {RequestConfig} OtherConfig request其他配置
   * @return {*}
   */
  public put<T>(url: string, data?: Object, OtherConfig?: RequestConfig) {
    url = AppInstance.globalData.baseUrl + url
    return this.request<T>({
      method: HttpMethod.PUT,
      url,
      data,
      ...OtherConfig,
    })
  }
}

function showToast(msg: string) {
  wx.showToast({
    title: msg || '请求出错',
    icon: 'none',
  })
}

//跳转到登录页
function jumpToLogin() {
  wx.clearStorageSync()
  wx.reLaunch({
    url: '/pages/login/index',
  })
}

export default HttpRequest.getInstance()
