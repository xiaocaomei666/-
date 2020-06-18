// pages/exSaveImg/exSaveImg.js
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
    imgDialogVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /** 确定弹窗 */
  submitPhotoDialog() {
    this.setData({
      photoDialogVisible: false
    })
  },

  /** 关闭弹窗 */
  closeDialog() {
    this.setData({
      photoDialogVisible: false,
      imgDialogVisible: false
    })
  },

  /** 保存图片    生成专属推荐海报 */
  saveImg: debounce(function() {
    $checkAuthSetting().then(res => {
      if (res.authSetting['scope.writePhotosAlbum']) {
        console.log('允许相机授权')
        this.saveImgToPhoto()
      } else {
        console.log('拒绝相机授权')
        $authorize('scope.writePhotosAlbum').then(res => {
          console.log('允许第二部授权', res)
          this.saveImgToPhoto()
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
  // 注意：图片的地址要在配置合法域
  saveImgToPhoto(e) {
    let imgSave = 'http://dtsimg.dinghu.com/xcx/lucky_bag/img_bg.png'
    $downloadFile(imgSave).then(res => {
      this.setData({
        imgDialogVisible: true
      })
      console.log(res, '允许授权下载文件成功')
      $toast('图片保存成功', 'none', 3000)
    }).catch(res => {
      console.log(res, '允许授权下载文件失败')
      $toast('图片保存失败，请再试一次', 'none', 3000)
    })
  },

  handleTouchMove() {
    return true
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