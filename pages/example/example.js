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
  address(){
    $routerPage('../exAddress/exAddress')
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
  }

})