// pages/wxSetBg/wxSetBg.js
import {
  $setBgTextStyle,
  $setBgColor
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

  // 动态设置下拉背景字体、loading 图的样式
  setBgTextStyle(){
    console.log('111111111111')
    $setBgTextStyle('dark')
  },

  // 动态设置窗口的背景色
  setBgColor(){
    $setBgColor('#008C96', '#008C96','#ffffff')
  }
})