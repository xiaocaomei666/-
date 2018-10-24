// pages/wxUtils/wxUtils.js
import {
  $SUCCESS,
  $ERROR,
  $WARNING,
  $TOKENFAIL,

  $log,
  $warn,

  $toast,

  $showLoading,
  $hideLoading,

  $modal,
  $sheet
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

  // 显示消息提示框
  toast(){
    // $toast('成功', 'success')
    // $toast('加载中', 'loading')
    $toast('网络异常')
  },

  //loading 提示框
  loading(){
    $showLoading()
  },

  hideLoading(){
    $hideLoading()
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