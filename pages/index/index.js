// pages/index/index.js
import {
  $log,
  $sheet,

  $showTbRedDot,
  $hideTbRedDot,
  $showTabBar,
  $hideTabBar,
  $setTabBarStyle,
  $setTbItem,
  $setTbBadge,
  $removeTbBadge
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
    $log('监听页面加载')
  },

  // 跳转到微信封装的各种工具中
  toWx(){
    wx.navigateTo({
      url: '../wxUtils/wxUtils',
    })
  },

  // 显示 tabBar 某一项的右上角的红点
  showTbRedDot() {
    $showTbRedDot(1)
  },

  // 隐藏 tabBar 某一项的右上角的红点
  hideTbRedDot(){
    $hideTbRedDot(1)
  },

  // 显示 tabBar
  showTabBar(){
    $showTabBar()
  },

  // 隐藏 tabBar
  hideTabBar() {
    $hideTabBar()
  },

  // 动态设置 tabBar 的整体样式
  setTabBarStyle(){
    $setTabBarStyle()
  },

  // 动态设置 tabBar 某一项的内容
  setTbItem(){
    $setTbItem(1)
  },

  // 为 tabBar 第二项的右上角添加文本
  setTbBadge(){
    $setTbBadge(1,'为 tabBar 第二项的右上角添加文本')
  },

  // 移除 tabBar 第二项右上角的文本
  removeTbBadge(){
    $removeTbBadge(1, '移除 tabBar 第二项的右上角的文本')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})