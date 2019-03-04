// pages/wxTips/wxTips.js
import {
  $toast,
  $modal,
  $showActionSheet,
  $showLoading,
  $hideToast,
  $hideLoading
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
  onLoad: function (options) {

  },

  // 显示消息提示框
  toast() {
    // $toast('成功', 'success')
    $toast('加载中', 'loading')
    // $toast('网络异常','none')
  },

  // 隐藏消息提示框
  hideToast() {
    $hideToast()
  },

  // 显示模态对话框
  modal() {
    $modal('标题', '内容', true, '取消', '#000000', '确定', '#008C96').then(res => {
      console.log(res)
    }).catch(res => {
      console.log(res)
    })
  },

  // 显示loading提示框
  loading() {
    $showLoading()
  },

  // 隐藏loading提示框
  hideLoading() {
    $hideLoading()
  },

  // 显示操作菜单
  showActionSheet() {
    let itemList = ['菜单1', '菜单2', '菜单3']
    $showActionSheet(itemList, '#008c96').then(res => {
      console.log(res)
    }).catch(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})