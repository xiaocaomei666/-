// pages/wxTabBar/wxTabBar.js
import {
  $routerPage,
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
  onLoad: function (options) {

  },

  // 回到首页
  toIndex(){
    $routerPage('../index/index','switchTab')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})