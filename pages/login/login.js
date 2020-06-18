import { 
  $wxLogin, 
  $routerPage, 
  $toast,
  $SUCCESS 
} from '../../utils/wxUtil.js'

const config = require('../../config/index.js')
// 默认进入页面 (首页)
const DEFAULT_PATH = 'pages/index/index'
// 授权页面
const AUTH_PATH = 'pages/login/login'

// 判断页面是否为tabbar页
const isTabBarPage = (page) => {
  console.log('判断页面是否为tabbar页',config.tabBarPages)
  let arr = config.tabBarPages.filter(item => {
    return item.startsWith(page)
  })
  return arr.length === 1 
}

const app = getApp()
const pageHandler = {

  /**
   * 页面的初始数据
   */
  data: {
    userMsg: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    serviceStationCode: null,
    // 口袋水店code
    pocketShopCustomerId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    $wxLogin().then(wxRes => {
      let {
        code
      } = wxRes
      console.log('----login wxLogin code----', code)
      wx.setStorageSync('code', code)
    }).catch(wxErr => {
      $toast('微信WXLogin请求失败')
    })
    this.setData({
      serviceStationCode: app.globalData.serviceStationCode,
      pocketShopCustomerId: app.globalData.pocketShopCustomerId
    })
  },

  //未授权点击弹出授权
  getUserInfo (e) {
    console.log('点击授权 getUserInfo:', e)
    if (e.detail.errMsg === 'getUserInfo:ok') {
      let userInfo = e.detail.userInfo

      app.globalData.userInfo = userInfo
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
      let code = wx.getStorageSync('code')
      let { avatarUrl, nickName, gender, city, province, country } = userInfo
      let { serviceStationCode, pocketShopCustomerId } = this.data
      let wxLoginParams = {
        code,
        avatarUrl,
        nickName,
        gender,
        city,
        province,
        country,
        userInfoDetail: userInfo,
        // 社区服务站code
        serviceStationCode,
        // 口袋水店code
        pocketShopCustomerId
      }

      app.func.$post('login', wxLoginParams, loginRes => {
        let { code, token } = loginRes
        if (code === $SUCCESS) {
          // 登录成功设token
          wx.setStorageSync("token", token)

          let loginCallBackUrl = wx.getStorageSync('loginCallBackUrl') || DEFAULT_PATH
          if (loginCallBackUrl) {
            loginCallBackUrl = loginCallBackUrl.startsWith(AUTH_PATH) ? DEFAULT_PATH : loginCallBackUrl
            $routerPage('/' + loginCallBackUrl, isTabBarPage(loginCallBackUrl) ? 'switchTab' : 'reLaunch').then(res => {
              wx.removeStorageSync('loginCallBackUrl')
            })
          }
        } else {
          // 后台保存重新获取微信code
          $toast('后台微信授权校验失败，请重试')
          $wxLogin().then(res => {
            let { code } = res
            wx.setStorageSync('code', code)
          })
        }
      })
    } else {
      // 取消授权
      $toast('取消授权')
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
  }
}

Page(pageHandler)