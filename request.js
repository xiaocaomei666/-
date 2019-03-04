// 引入配置文件设置环境
const config = require('./config/index.js')
const { requestBaseURL } = config
const rootDocment = requestBaseURL

import {
  $getCurrentPageUrlWithArgsPromise
} from './utils/wxUtil.js'


const doResq = function (url, data, cb, method) {
  let token = wx.getStorageSync('token') || ''
  wx.request({
    url: rootDocment + url,
    data: data,
    method: method || 'GET',
    header: { 
      'Content-Type': 'application/json', 
      'token': token
    },
    success: function (res) {
      // console.log(data, url, res)
      if (res.data && res.data.code == 401) {
        // console.log('token失效')

        // token 为空 -> 当接口需要token，参入token为空跳转登录页面
        if (!token) {
          $getCurrentPageUrlWithArgsPromise().then(res => {
            let loginCallBackUrl = res
            wx.redirectTo({ 
              url: '/pages/login/login',
              success: res => {
                wx.setStorageSync('loginCallBackUrl', loginCallBackUrl)
              }
            })
          })
          return
        }

        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.setStorageSync('code', res.code)
            let code = res.code

            // 检测授权情况
            wx.getSetting({ 
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  console.log('----api 接口请求：已授权----')
                  wx.getUserInfo({
                    lang: 'zh_CN',
                    withCredentials: true, // 带上登录态信息
                    success: res => {
                      let userInfo = res // 修改带上所有的wx.getUserInfo接口返回数据
                      userInfo.code = code
                      // 发送网络请求，登录  保存token
                      wx.request({
                        url: rootDocment + 'login',
                        data: userInfo,
                        method: 'POST',
                        header: { 'Content-Type': 'application/json', },
                        success: function (res) {
                          // console.log(res)
                          let respData = res.data
                          if (respData && respData.code == 0) {
                            if (respData.token) {
                              // 获取token成功，则重新请求原接口
                              wx.setStorageSync('token', respData.token)
                              // console.log(respData.token)
                              if (url && url.indexOf('token=') > -1) {
                                let split = url.split('token=')
                                let newUrl = split[0] + 'token=' + respData.token
                                doResq(newUrl, data, cb, method)
                              } else {
                                doResq(url, data, cb, method)
                              }
                            } else {
                              return typeof cb == "function" && cb(false)
                            }
                          }
                        },
                        fail: function (res) {
                          return typeof cb == "function" && cb(false)
                        }
                      })

                    }
                  })
                } else {
                  console.log('----api 接口请求：未授权/授权失败----')
                  $getCurrentPageUrlWithArgsPromise().then(res => {
                    let loginCallBackUrl = res
                    wx.redirectTo({ 
                      url: '/pages/login/login',
                      success: res => {
                        wx.setStorageSync('loginCallBackUrl', loginCallBackUrl)
                      }
                    })
                  })
                  return
                }
              },
              fail: err => {

              }
            })

          },
          fail: res => {
            return typeof cb == "function" && cb(false)
          }
        })

      } else {
        return typeof cb == "function" && cb(res.data)
      }
    },
    fail: function (res) {
      return typeof cb == "function" && cb(false)
    }
  })
}

const $post = function (url, data, cb) {
  doResq(url, data, cb, "POST")
}

const $get = function (url, data, cb) {
  doResq(url, data, cb, "GET")
}


function getFormId(data) {
  $get('customercenter/common/wxMessage/save?formId=' + data, {}, function (res) {
    // console.log('获取信息',res);
  })
}


module.exports = {
  $get: $get,
  $post: $post,
  getFormId: getFormId
}

