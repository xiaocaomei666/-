// pages/wxUtils/wxUtils.js
import {
  $SUCCESS,
  $ERROR,
  $WARNING,
  $TOKENFAIL,

  $log,
  $warn,

  $routerPage
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

  // 打印
  log() {
    $log('自定义打印样式1')
  },

  warn() {
    $warn('自定义打印样式2')
  },

  // 提示功能 -- 界面交互
  toTip() {
    $routerPage('../wxTips/wxTips')
  },

  // 导航栏
  toNavigationBar() {
    $routerPage('../wxNavBar/wxNavBar')
  },

  // 背景
  toSetBg() {
    $routerPage('../wxSetBg/wxSetBg')
  },

  // Tab Bar
  toTabBar() {
    $routerPage('../wxTabBar/wxTabBar')
  },

  // 路由
  toRouter() {
    $routerPage('../wxRouter/wxRouter')
  },

  // 系统信息
  toSysInfo(){
    $routerPage('../wxSysInfo/wxSysInfo')
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