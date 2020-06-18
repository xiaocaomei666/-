// pages/example/example.js
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
    // 数据回传
    dataBack: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 显示当前页面的转发按钮 并且带有shareTicket（可以获取到更多的转发信息）
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  // 全局检测
  globalGet() {
    $routerPage('../exGlobalGet/exGlobalGet')
  },

  // 函数防抖
  debounce: debounce(function() {
    console.log('--------------函数防抖检测----------------')
  }, 500),

  // 地址组件
  address() {
    $routerPage('../exAddress/exAddress')
  },

  // 过滤器
  filter() {
    $routerPage('../exFilter/exFilter')
  },

  // 场景值
  scence() {
    $routerPage('../distributorRegister/distributorRegister')
  },

  // 时间工具类
  time() {
    $routerPage('../exTime/exTime')
  },

  // 抽奖
  prizeDraw(){
    $routerPage('../exPrizeDraw/exPrizeDraw')
  },

  // 保存图片到相册
  saveImg(){
    $routerPage('../exSaveImg/exSaveImg')
  },
  saveShareImg(){
    $routerPage('../exSaveShareImg/exSaveShareImg')
  },

  // 默认保存图片到相册
  saveShareImgAuto(){
    $routerPage('../exSaveImgAuto/exSaveImgAuto')
  },

  // 更新头像和昵称
  updateMsg(){
    $routerPage('../exUpdateMsg/exUpdateMsg')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 数据回传
    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 1]; //上一页面
    if (prevPage.data.dataBack) {
      this.setData({
        dataBack: '回传的数据'
      })
    }

    // 获取转发的信息
    let shareTicket = app.globalData.shareTicket
    wx.getShareInfo({
      shareTicket,
      success:res => {
        console.log('获取转发的信息success => 返回加密的encryptedData数据，后台对其解密后可以得到当前群的唯一标识openGId ', res)
      },
      fail:res=>{
        console.log('获取转发的信息fail',res)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: 'pages/example/example?id=123',
    }
  }
})