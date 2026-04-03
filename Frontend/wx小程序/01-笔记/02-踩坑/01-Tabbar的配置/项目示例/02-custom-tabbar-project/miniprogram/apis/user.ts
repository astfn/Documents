import request from '../service/request'

export const getCaptcha = function () {
  return request.get('/user/getCaptcha')
}
