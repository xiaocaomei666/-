// 引入微信增强性补丁
require('./utils/wxPatch.js')
// 发布订阅
import WxEvent from './libs/wx-event.js'

import {
  $routerPage,
  $getUserInfo,
  $getCurrentPageUrl,
  $getWXSystemInfo
} from './utils/wxUtil.js'

import {filterUrlParam} from './utils/util.js'

const http = require('./request.js')
const config = require('./config/index.js')
console.log('----APP 白名单页面：-----', config.authWhitePages)

// 检测页面当前页面是否在白名单
const checkAuthWhitePage = (currentPage, Pages) => {
  return Pages.indexOf(currentPage) !== -1
}

App({
  // 事件订阅发布
  wxEvent: new WxEvent(),

  onLaunch: function (res) {
    console.log('在app.js的生命周期onLaunch中获取分享群后返回的数据 => 可以获取shareTicket', res)
    this.globalData.shareTicket = res.shareTicket

    // 全局检测设备
    this.globalGetSystemInfo()

    // 获取小程序更新机制兼容 - 放在onLaunch避免更新机制影响用户下单流程
    $wxAppUpdateVersion()
  },

  onShow: function (opts) {
    // 调用全局场景值函数
    this.globalGetAppOnShowOpts(opts)

    // 放在onShow 为了避免手动取消微信授权
    this.globalCheckLoginStatus()
  },

  onHide: function () {
    console.log('App onHide')
    // 销毁事件
    this
      .wxEvent
      .off()
  },

  // 全局检授权、登录状态
  globalCheckLoginStatus() {
    appCheckLoginStatus().then(res => {
      // console.log('获取用户信息:', res)
      this.globalData.userInfo = res
    }).catch(err => {
        // console.log('获取用户信息报错：', err)
      }). finally(() => {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          const userInfo = this.globalData.userInfo
          this.userInfoReadyCallback(userInfo)
        }
      })
  },

  // 全局检测设备
  globalGetSystemInfo() {
    $getWXSystemInfo().then(res => {
      const {isIpx, isFullDisplay} = res
      this.globalData.isIpx = isIpx
      this.globalData.isFullDisplay = isFullDisplay
    })
  },

  // 全局场景值 -- bug
  globalGetAppOnShowOpts(opts) {
    console.log('App进入场景值：', opts)
    this.globalData.appScene = opts
    let sceneCode = opts.scene
    let {scene} = opts.query
    if (scene) {
      let decodeScene = filterUrlParam(decodeURIComponent(scene))
      let {t1} = decodeScene
      // 限制扫描进入-> 防止切换后台回来二次操作
      if (t1 && (sceneCode == 1047 || sceneCode == 1048 || sceneCode == 1049)) {
        wx.removeStorageSync('code')
        wx.removeStorageSync('token')
        this.globalData.serviceStationCode = t1
        $routerPage('/pages/login/login', 'redirectTo')
      }
    }
  },

  globalData: {
    userInfo: null,
    isIpx: null,
    isFullDisplay: null,
    isIphone: null,
    // 场景值
    appScene: null,
    // 社区服务站code
    serviceStationCode: null,

    shareTicket: null
  },
  func: {
    $post: http.$post,
    $get: http.$get,
    getFormId: http.getFormId
  }
})