// pages/exSaveImgAuto/exSaveImgAuto.js
import Poster from './poster'

import {
  $SUCCESS,
  $showLoading,
  $hideLoading,
  $toast,
  $checkAuthSetting,
  $authorize,
  $saveImageToPhoto
} from '../../utils/wxUtil.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoDialogVisible: false,
    // 海报
    posterUrl: '',
    qrCode: 'http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/prize/cash.png',
    posterTemplate: {},
  },

  // 海报保存
  posterImgOk(e) {
    console.log(e)
    let posterUrl = e.detail.path
    this.setData({
      posterUrl
    }, () => {
      this.saveImg()
    })
  },

  /** 保存图片    生成专属推荐海报 */
  saveImg() {
    let {
      posterUrl
    } = this.data
    $checkAuthSetting().then(res => {
      if (res.authSetting['scope.writePhotosAlbum']) {
        console.log('允许相册授权')
        this.saveImgToPhoto(posterUrl)
      } else {
        console.log('拒绝相册授权')
        $authorize('scope.writePhotosAlbum').then(res => {
          console.log('允许第二步授权', res)
          this.saveImgToPhoto(posterUrl)
        }).catch(res => {
          console.log('拒绝第二步授权', res)
          this.setData({
            photoDialogVisible: true
          })
        })
      }
    }).catch(res => {
      console.log('拒绝', res)
    })
  },


  /** 允许授权相机 */
  saveImgToPhoto(posterUrl) {
    $saveImageToPhoto(posterUrl).then(res => {
      console.log(res, '允许授权相机成功')
      $toast('专属二维码已存至相册', 'none', 3000)
    }).catch(res => {
      console.log(res, '允许授权相机失败')
      $toast('专属二维码保存失败')
    })
  },


  /** 关闭弹窗 */
  closeDialog() {
    this.setData({
      photoDialogVisible: false
    })
  },


  /** 确定弹窗 */
  submitPhotoDialog() {
    this.setData({
      photoDialogVisible: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      posterTemplate: new Poster(this.data.qrCode).palette()
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