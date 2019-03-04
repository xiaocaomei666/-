// pages/exGlobalGet/exGlobalGet.js
import {
  $routerPage,
  $getSystemInfo,
  $routerBack
} from '../../utils/wxUtil.js'

import {
  debounce
} from '../../utils/util.js'


const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 系统信息
    globalSystemInfo: '',
    // 数据回传
    dataBack: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 全局检测设备
    let isIphone = app.globalData.isIphone;
    let isIpx = app.globalData.isIpx;
    let isFullDisplay = app.globalData.isFullDisplay;

    if (!isIphone || !isIpx || !isFullDisplay) {
      app.systemInfoCallback = res => {
        let {
          isIpx,
          isFullDisplay,
          isIphone
        } = res
        this.setData({
          isIpx,
          isFullDisplay,
          isIphone
        })
      }
    }
    this.setData({
      isIpx,
      isFullDisplay,
      isIphone
    })
  },

  // 全局检测设备
  globalGetSystemInfo() {
    let {
      globalSystemInfo,
      isIpx,
      isFullDisplay,
      isIphone
    } = this.data

    globalSystemInfo = `苹果手机? ${isIphone} \n iPhoneX手机? ${isIpx} \n 全面屏手机? ${isFullDisplay} `
    this.setData({
      globalSystemInfo
    })
  },

  // 数据回传到上一页
  dataBack() {
    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 2]; //上一页面
    prevPage.setData({
      dataBack: '回传的数据'
    })
    $routerBack(1)
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})