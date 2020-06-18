// pages/exTime/exTime.js
const timeUtil = require('../../utils/timeUtil.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeCur: '',
    timeFormate:'',
    dateCur: '',
    dateFormate: '',
    isBetweenDateRange: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 判断是否在国庆假期之内
    let dayS = '2019-09-30'
    let dayE = '2019-10-08'
    // let dayS = '20190306'
    // let dayE = '20190308'
    let dateCur = timeUtil.getCurrentDate()
    let timeCur = timeUtil.getCurrentTime()
    this.setData({
      timeCur,
      // timeFormate: timeUtil.formatTime(timeCur),
      dateCur,
      dateFormate: timeUtil.getCurrentDate('2018.8.8 12:12:12'),
      isBetweenDateRange: timeUtil.isDayBetween(dateCur, dayS, dayE)
    })

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