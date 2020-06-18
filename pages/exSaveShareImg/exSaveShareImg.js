// pages/exSaveShareImg/exSaveShareImg.js
import Poster from './poster'
import {
  $routerPage,
  $SUCCESS,
  $showLoading,
  $hideLoading,
  $toast,
  $checkAuthSetting,
  $authorize,
  $downloadFile,
  $saveImageToPhoto,
  $modal
} from '../../utils/wxUtil.js'

import {
  debounce
} from '../../utils/util.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoDialogVisible: false,
    shareDialog:false,
    // 海报
    qrCode: 'http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/prize/cash.png',
    posterTemplate: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let name = '小草莓'
    let image = 'https://wx.qlogo.cn/mmopen/vi_32/dxQpvZpyC6aY2kcCqszQKqDDgrf5HXToibusjr4W0LhAWh8j8ooY7WXXQfOfAGv4j2j6zbY82OY17NBEicWmb8qA/132'
    let qrCode = this.data.qrCode
    this.setData({
      posterTemplate: new Poster(name, image, qrCode).palette(),
    })
  },

  /** 保存图片    生成专属推荐海报 */
  saveImg: debounce(function() {
    $checkAuthSetting().then(res => {
      if (res.authSetting['scope.writePhotosAlbum']) {
        console.log('允许相机授权')
        this.setData({
          shareDialog: true
        })
      } else {
        console.log('拒绝相机授权')
        $authorize('scope.writePhotosAlbum').then(res => {
          console.log('允许第二部授权', res)
          this.setData({
            shareDialog: true
          })
        }).catch(res => {
          console.log('拒绝第二部授权', res)
          this.setData({
            photoDialogVisible: true
          })
        })
      }
    }).catch(res => {
      console.log('拒绝', res)
    })
  }, 500),


  /** 允许授权相机 */
  saveImgToPhoto(e) {
    let imagePath = e.detail.path;
    $saveImageToPhoto(imagePath).then(res => {
      console.log(res, '允许授权相机成功')
      $toast('海报已存至相册，可分享好友领券', 'none', 3000)
    }).catch(res => {
      console.log(res, '允许授权相机失败')
      $toast('图片保存失败')
    })
  },

  handleTouchMove() {
    return true
  },

  /** 关闭弹窗 */
  closeDialog() {
    this.setData({
      shareDialog: false,
      photoDialogVisible:false
    })
  },


  /** 确定弹窗 */
  submitPhotoDialog() {
    this.setData({
      photoDialogVisible: false
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