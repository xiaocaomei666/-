// import { 
//   $checkAuthSetting, 
//   $toast, 
//   $routerPage, 
//   $checkSession, 
//   $wxLogin,
//   $getUserInfo,
//   $getCurrentPageUrl,
//   $getCurrentPageUrlWithArgsPromise,
//   $getSystemInfo
// } from './utils/wxUtil.js'
// const http = require('./request.js')
// const config = require('./config/index.js')
// console.log('----APP 白名单页面：-----',  config.authWhitePages)

// // 检测页面当前页面是否在白名单
// const checkAuthWhitePage = (currentPage, Pages) => {
//   return Pages.indexOf(currentPage) !== -1
// }

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 注释
    // this.globalGetSystemInfo()
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onShow: function (e) {
    // 调用全局检测授权情况
    // this.globalAuthSetting()
  },
  // 全局检测授权情况
  // globalAuthSetting () {
  //   $checkAuthSetting().then(res => {
  //     if (res.authSetting['scope.userInfo']) {
  //       // 已经授权操作
  //       console.log('----APP 全局检测：已授权----')

  //       // todo 获取用户信息并保存
  //       $getUserInfo().then(res => {
  //         let userInfo = res
  //         this.globalData.userInfo = userInfo
  //         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //         // 所以此处加入 callback 以防止这种情况
  //         if (this.userInfoReadyCallback) {
  //           this.userInfoReadyCallback(userInfo)
  //         }
  //         this.func.putCache('userInfo', userInfo)
  //         return userInfo
  //       }).then(userInfo => {
  //         let loginParams = userInfo
  //         // 检测 session_key状态
  //         $checkSession().then(sessionRes => {
  //           console.log('----APP session_key 未过期 ----',  sessionRes)
  //         }).catch(sessionErr => {
  //           console.log('----APP session_key 已过期 ----',  sessionErr)
  //           // 过期重新调用微信wx.login登录
  //           $wxLogin().then(wxRes => {
  //             console.log('----APP 重新登录-> wxlogin:----',  wxRes)
  //             let code = wxRes.code
  //             wx.setStorageSync("code", code)
  //             loginParams.code = code
  //             this.func.req('login', loginParams, '', reqRes => {
  //               let {code, token} = reqRes
  //               if (code == 0) {
  //                 wx.setStorageSync("token", token)
  //               } else {
  //                 $toast('网络错误！')
  //               }
  //             })
  //           })
  //         })
  //       })

  //     } else {
  //       // 未授权跳转授权页面
  //       console.log('----APP 未授权 ----')

  //       $getCurrentPageUrlWithArgsPromise().then(res => {
  //         console.log('----APP 当前打开页面URL：----',  res)
  //         let currentUrl = $getCurrentPageUrl()
  //         let isInPageAuthWhite =  checkAuthWhitePage(currentUrl, config.authWhitePages)
  //         return isInPageAuthWhite ? isInPageAuthWhite : res
  //       }).then(res => {
  //         if (res !== true) {
  //           console.log('----APP 非白名单页面跳转授权页面 ----')
  //           let loginCallBackUrl = res
  //           $routerPage('/pages/login/login', 'redirectTo').then(() => {
  //             wx.setStorageSync('loginCallBackUrl', loginCallBackUrl)
  //           })
  //         } else {
  //           console.log('----APP 白名单页面不跳转授权页面 ----')
  //         }
  //       })
  //     }
  //   }).catch(err => {
  //     console.log('----APP $checkAuthSetting error ----',  err)
  //     $toast('微信授权接口请求失败！')
  //   })
  // },

  // 全局检测设备
  // globalGetSystemInfo () {
  //   $getSystemInfo().then(res => {
  //     console.log('----APP sysInfo：----',  res)
  //     this.globalData.isIpx = res.search('iPhone X') != -1
  //   })
  // },

  globalData: {
    userInfo: null,
    isIpx: null
  },
  // func: {
  //   req: http.req,
  //   getreq: http.getreq,
  //   nologin: http.nologin,
  //   getCache: http.getCache,
  //   delCache: http.delCache,
  //   putCache: http.putCache,
  //   getFormId: http.getFormId
  // }
})