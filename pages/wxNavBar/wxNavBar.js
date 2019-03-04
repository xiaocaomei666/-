// pages/wxNavBar/wxNavBar.js
import {
  $showNarBarLoading,
  $setNavBar,
  $setNarBarColor,
  $hideNarBarLoading
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

  // 在当前页面显示导航条加载动画
  showNavBar() {
    $showNarBarLoading()
  },

  // 动态设置当前页面的标题
  setNavBar() {
    $setNavBar('动态设置当前页面的标题')
  },

  // 设置页面导航条颜色
  setNarBarColor() {
    $setNarBarColor('#ffffff', '#008C96', 500, 'easeInOut').then(res => {
      console.log(res)
    }).catch(res => {
      console.log(res)
    })
  },

  // 在当前页面隐藏导航条加载动画
  hideNarBarLoading(){
    $hideNarBarLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})