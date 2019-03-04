// pages/wxRouter/wxRouter.js
import {
  $routerPage,
  $routerBack
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

  // 页面跳转
  toPage(e) {
    console.log(e.currentTarget.dataset.type)
    let type = e.currentTarget.dataset.type
    let url = '../wxUtils/wxUtils'
    let delta = 1
    if (type == 'switchTab') {
      url = '../index/index'
      $routerPage(url, type)
    } else if (type == 'navigateBack') {
      $routerBack(delta)
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})