// pages/wxSysInfo/wxSysInfo.js
import {
  $getSystemInfo,
  $getSystemInfoSync
} from '../../utils/wxUtil.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 获取系统信息
  getSystemInfo(){
    $getSystemInfo().then(res => {
      console.log(res)
    })
  },

  // 同步获取系统信息
  getSystemInfoSync(){
    $getSystemInfoSync().then(res => {
      console.log(res)
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})