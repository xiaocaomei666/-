// pages/exUpdateMsg/exUpdateMsg.js
import {
  $SUCCESS,
  $toast,
  $dialog,
  $getUserInfo
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

  updateMsg(e) {
    let {
      type
    } = e.currentTarget.dataset
    switch (type) {
      case 'nickname':

        $dialog({
          title: '更新昵称',
          content: '是否要更新您的微信昵称?',
          cancelText: '否',
          confirmText: '是',
        }).then(res => {
          console.log('更新昵称-确认')
          this.updateNicknameModalSubmit()
        }).catch(err => {
          console.log('更新昵称-取消')
        })

        break
    }
  },

  // 更改昵称确认事件
  updateNicknameModalSubmit() {
    $getUserInfo().then(res => {
      console.log('用户信息：', res)
      let {
        errMsg
      } = res
      if (errMsg === 'getUserInfo:ok') {
        let {
          nickName
        } = res.userInfo
        //  将昵称更新到后台
      } else {
        $toast('微信未授权')
      }
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