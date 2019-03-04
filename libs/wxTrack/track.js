// 埋点统计
// 引入async await 
import regeneratorRuntime from '../regenerator-runtime.js'

import {
  $getCurrentPageUrl,
  $getCurrentPageUrlWithArgsPromise,
  $getUserInfo,
  $getSystemInfo,
  $checkAuthSetting
} from '../../utils/wxUtil.js'

import { wxScene, xcxPage } from './wxScene.js'
const config = require('../../config/index.js')
const request = require('../../request.js')
const { $post } = request

const WXTRACK_CAN_POST_DATA = config.env.toLocaleLowerCase().indexOf('prod') > -1
// const WXTRACK_CAN_POST_DATA = true
console.log('WXTRACK_CAN_POST_DATA:', WXTRACK_CAN_POST_DATA)

/**
 *  小程序埋点封装类
 */
class WxTrack {

  constructor() {
    this._stores = {}

    // 设备信息
    this.systemInfo = {}
    // 用户信息
    this.userInfo = {}

    // 启动场景值
    this.appScene = {}
    // 打开进入页面
    this.appEnterPage = ''
    // 离开停留页面
    this.appExitPage = ''

    // 当前页面信息
    this.currentPage = ''
    // 渠道信息
    this.channelChannel = ''
    // 广告位
    this.channelAdvertise = ''
    // 任务
    this.channelTask = ''

    // app时间
    this.appStartTime = ''
    this.appEndTime = ''
    // 页面时间
    this.pageStartTime = ''
    this.pageEndTime = ''

    // 页面id
    this.page = null,
    // 页面id对应名
    this.pageName = ''

    // 事件信息
    this.eventList = []

  }

  // 获取用户信息
  _getUserInfo () {
    return new Promise((resolve, reject) => {
      $checkAuthSetting().then(res => {
        if (res.authSetting['scope.userInfo']) {
          $getUserInfo().then(res => {
            resolve(res.userInfo)
          })
        } else {
          reject({})
        }
      }).catch(err => {
        reject({})
      })
    })

  }

  // 获取当前页面信息
  _getCurrentPageInfo () {
    return $getCurrentPageUrl() || ''
  }

  // 获取渠道信息
  _setChannelInfo () {
    let { query } = this.appScene
    let { scene } = query
    if (scene) {
      let decodeScene = this._filterUrlParam(decodeURIComponent(scene))
      let { a, b, c } = decodeScene
      this.channelChannel = a || ''
      this.channelAdvertise = b || ''
      this.channelTask = c || ''
    }
  }

  _filterUrlParam (urlSearch) {
    let ret = {}
    let regParam = /([^&=]+)=([\w\W]*?)(&|$|#)/g
    if (urlSearch) {
      var strParam = urlSearch; 
      var result
      while ((result = regParam.exec(strParam)) != null) {
        ret[result[1]] = result[2]
      }
    }
    return ret
  }

  // 获取APP启动当前开始时间
  _getAppStartTime () {
    this.appStartTime = Date.now()
  }

  // 获取App关闭结束时间
  _getAppEndTime () {
    this.appEndTime = Date.now()
  }

  // 获取页面开始时间
  _getPageStartTime () {
    this.pageStartTime = Date.now()
  }

  // 获取页面结束时间
  _getPageEndTime () {
    this.pageEndTime = Date.now()
  }
  
  // 获取渠道信息
  getChannelInfo () {
    return {
      channelChannel: this.channelChannel,
      channelAdvertise: this.channelAdvertise,
      channelTask: this.channelTask
    }
  }


  // app 初始化
  async appInit (options) {
    console.group('-------track-------')
    console.log('...App track init...')
    this._getAppStartTime()
    this.appEndTime = ''
    options['sceneName'] = wxScene[options.scene] 
    this.appScene = options
    this.appEnterPage = options.path
    this._setChannelInfo()
    let { SDKVersion, brand, model, platform, system, version } = await $getSystemInfo()
    this.systemInfo = {
      SDKVersion, 
      brand, 
      model, 
      platform, 
      system, 
      version 
    }
    // try {
    //   this.userInfo = await this._getUserInfo()
    // } catch (err) {
    //   this.userInfo = {}
    // }
    console.groupEnd()
  }

  // app离开/隐藏
  appExit () {
    // console.log('...App track exit...')
    this._getAppEndTime()
    this.appExitPage = this._getCurrentPageInfo()
    let appInfo = {
      appEnterPage: this.appEnterPage,
      appExitPage: this.appExitPage,
      channelChannel: this.channel,
      channelAdvertise: this.channelAdvertise,
      channelTask: this.channelTask,
      appStartTime: this.appStartTime,
      appEndTime: this.appEndTime,
      // userInfo: this.userInfo,
      systemInfo: this.systemInfo
    }
    if (appInfo.appEndTime - appInfo.appStartTime > 1000) {
      // console.log('appInfo:', appInfo)
      // this.sendReport(appInfo)
    }
  }

  // 页面初始化
  async pageInit (options) {
    // console.log('...Page track init...')
    this._getPageStartTime()
    this.pageEndTime = ''
    // if (Object.keys(this.userInfo).length === 0) {
    //   try {
    //     this.userInfo = await this._getUserInfo()
    //   } catch (err) {
    //     this.userInfo = {}
    //   }
    // }
    this.currentPage = this._getCurrentPageInfo()
    let pageEndStrSplitArr = this.currentPage.split('/') || []
    let pageObjKey = pageEndStrSplitArr[pageEndStrSplitArr.length - 1] || ''
    this.page = pageObjKey ? ( xcxPage[pageObjKey] ? xcxPage[pageObjKey]['id'] : '') : ''
    this.pageName = pageObjKey ? (xcxPage[pageObjKey] ? xcxPage[pageObjKey]['pageName'] : '') : ''
    this.eventList = []
  }

  // 页面离开
  pageExit () {
    // console.log('...Page track exit...')
    this._getPageEndTime()
    let pageInfo = {
      channelChannel: this.channelChannel,
      channelAdvertise: this.channelAdvertise,
      channelTask: this.channelTask,
      beginTime: this.pageStartTime,
      endTime: this.pageEndTime,
      page: this.page,
      pageName: this.pageName,
      pageStr: this.currentPage,
      eventList: this.eventList,
      systemInfo: this.systemInfo,
      appScene: this.appScene
    }
    // console.log('pageInfo', pageInfo)

    if (pageInfo.endTime - pageInfo.beginTime > 1000 && this.eventList.length > 0) {
      this.sendReport(pageInfo)
    }
  }

  // 记录事件 
  emit (id = 0, eventStr = '', eventType = 'click', data = {}) {
    this.eventList.push({
      event: id, // 事件id
      eventStr, // 事件字符串
      time: Date.now(), // 事件时间点
      eventType, // 事件操作
      data 
    })
  }

  // 上报数据
  sendReport (params) {
    if (WXTRACK_CAN_POST_DATA) {
      $post('operPageCollection/save', params, res => {
        // console.log('report', res)
      })
    }
  }

}

export default WxTrack