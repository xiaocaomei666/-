// pages/exPrizeDraw/exPrizeDraw.js
const app = getApp()
import {
  $modal,
  $routerPage,
  $SUCCESS,
  $WARNING,
  $ERROR,
  $showLoading,
  $hideLoading,
  $toast,
  $makePhoneCall
} from '../../utils/wxUtil.js'
import {
  debounce
} from '../../utils/util.js'

const netData = ["http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/coupon.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/coupon.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/thx.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/cup.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/purifier.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/cushion.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/cash.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/cash.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/cash.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/cash.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/cash.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/cash.png"]

const netRecordList = ["恭喜188****9693获得2元无门槛优惠券", "恭喜188****9693获得5元无门槛优惠券", "恭喜188****9693获得0.38元现金红包", "恭喜188****9693获得2元无门槛优惠券", "恭喜188****9693获得2元无门槛优惠券", "恭喜188****9693获得2元无门槛优惠券", "恭喜188****9693获得0.38元现金红包", "恭喜188****9693获得5元无门槛优惠券", "恭喜188****9693获得2元无门槛优惠券", "恭喜188****9693获得2元无门槛优惠券"]


const netPrizesList = [{
  createTime: "2019-03-13 11:43:58",
  imgUrl: "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/prize/coupon.png",
  name: "2元无门槛优惠券",
  prizeId: 18,
  type: 3
}]

const lucky = {
  "prizeId": 18,
  "icons": ["http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/coupon.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/coupon.png", "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/coupon.png"],
  "icon": "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/wheel/coupon.png",
  "picture": "http://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/lottery/dialog/coupon.png",
  "description": "2元无门槛优惠券已存入你的【卡券中心】，请在有效期内及时使用！"
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://dtsimg.dinghu.com/xcx/water_vip/',
    // 抽中记录列表
    recordList: [],

    // 已中奖品列表
    prizesList: [],
    // 是否有已抽中奖品
    hadPrizes: false,

    // 抽奖次数
    chance: 1,

    // 弹窗
    ruleDialog: false,
    prizeDialog: false,
    loseLuckDialog: false,
    luckDialog: false,

    // 是否在抽奖中
    isDrawing: false,

    // 奖品图片
    luckImg: '',
    // 奖品描述
    description: '',

    // 滚轮列表
    exhibition: [],
    wheelList: [{
        'transition': 'transition: transform 10s',
        'imgList': []
      },
      {
        'transition': 'transition: transform 11s',
        'imgList': []
      },
      {
        'transition': 'transition: transform 12s',
        'imgList': []
      }
    ],
    wheelListCopy: [],

    // 滚轮滑动的距离
    slideDistance: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 获取formid
  submitInfo(e) {
    app.func.getFormId(e.detail.formId)
  },

  // 抽奖
  drawLuck: debounce(function() {
    let {
      isDrawing,
      chance
    } = this.data
    if (!isDrawing) {
      if (chance > 0) {
        this.getPrize()
      } else {
        $toast('您没有抽奖次数哦！')
      }
    } else {
      $toast('抽奖中，请稍候~')
    }
  }, 300),

  // 用户抽奖
  getPrize() {
    $showLoading()
    let {
      exhibition,
      wheelList
    } = this.data
    // 发送网络请求获取中奖的信息
    // 模拟数据
    let {
      description,
      picture,
      prizeId,
      icons
    } = lucky

    // 使用ES6拓展符实现数据的深拷贝
    // 计算滚轮列表滚动前的长度
    let listL = [...exhibition].length

    // 获取滚轮数组的最后一个元素(图片)
    // js内置的pop()方法可用于删除并并返回数组的最后一个元素，注意这里获取了数组的最后一个元素的同时也将原数组的最后一个元素删除了。如果数组为空，则该方法不改变数组，并返回undefined
    let exhibitionList = [...exhibition]
    let lastImg = exhibitionList.pop()


    // 备份一份，避免重复插入中奖元素
    // ES6的拓展运算符也可以实现数据的拷贝，但是只遍历一层。属于浅拷贝
    // let wheelListCopy = [...wheelList]
    let wheelListCopy = JSON.parse(JSON.stringify(wheelList))

    // 在三列滚轮数组中
    // 在倒数第一个元素(图片)上依次插入中奖元素(图片)和原滚轮数组的最后一个元素(图片)
    wheelListCopy.forEach((item, index) => {
      item.imgList.splice(-1, 1, icons[index], lastImg)
    })

    // 使得滚轮滑动到数组的倒数第二个元素（即最终停下来时显示中奖元素）
    // 滑动的距离 = （图片的height + 图片的上下margin）* （抽奖前的滚轮数组的长度-2）
    wx.createSelectorQuery().select('.img').boundingClientRect(res => {
      let slideDistance = `-${(res.height + 4) * (listL - 2)}`

      // console.log('插入后的数组长度', wheelListCopy[0].imgList.length)
      // console.log('原数组长度', wheelList[0].imgList.length)
      // console.log('滑动的距离', slideDistance, res.height, listL)

      this.setData({
        wheelListCopy,
        isDrawing: true,
        slideDistance,
        description,
        luckImg: picture
      })
      $hideLoading()
    }).exec()

    // 查询抽奖次数
    this.queryChance()

    setTimeout(() => {
      if (prizeId === 0) {
        // 没抽中
        this.setData({
          slideDistance: 0,
          isDrawing: false,
          loseLuckDialog: true
        })
      } else {
        // 抽中了
        this.setData({
          luckDialog: true,
          isDrawing: false,
          slideDistance: 0
        })

      }
    }, 12000)
  },

  // 点击我的奖品
  showMyPrizes() {
    if (this.data.isDrawing) {
      $toast('抽奖中~请稍后再查看')
      return
    }
    this.setData({
      prizeDialog: true
    })
    this.fetchMyPrizes()
  },

  // 查询我的奖品
  fetchMyPrizes() {
    $showLoading()
    // 发送网络请求获取后台返回的数据
    // 页面死数据 netPrizesList
    let hadPrizes = netPrizesList && netPrizesList.length > 0 ? true : false
    this.setData({
      prizesList: netPrizesList,
      hadPrizes
    })
    $hideLoading()
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取奖品列表
    this.fetchPrizeList()

    // 查询抽奖次数
    this.queryChance()

    // 获取客户抽中记录列表
    this.fetchRecordList()
  },

  // 获取奖品列表
  fetchPrizeList() {
    $showLoading()
    let {
      wheelList
    } = this.data

    // 发送网络请求获取后台返回的奖品列表 -- 省略
    // 以下是页面死数据模拟
    let exhibition = []
    let imgList = [...netData]
    // 为了使滚轮长度更长，复制且合并9个相同的数组
    for (let i = 0; i < 9; i++) {
      exhibition.push.apply(exhibition, imgList)
    }

    // 赋值
    wheelList.forEach(item => {
      item.imgList = [...exhibition]
    })

    let wheelListCopy = JSON.parse(JSON.stringify(wheelList))
    this.setData({
      exhibition,
      wheelList,
      wheelListCopy
    })
    $hideLoading()
  },

  // 查询抽奖次数
  queryChance() {
    $showLoading()
    // 网络请求获取后台返回的抽奖次数
    // 省略
  },

  // 获取客户抽中记录列表
  fetchRecordList() {
    $showLoading()
    // 发送网络请求获取后台返回的数据 -- 省略
    // 页面死数据返回
    this.setData({
      recordList: netRecordList
    })
    $hideLoading()
  },

  // 关闭弹窗
  closeDialog() {
    this.setData({
      ruleDialog: false,
      prizeDialog: false,
      loseLuckDialog: false,
      luckDialog: false
    })
  },

  // 显示活动规则弹窗
  showRule() {
    this.setData({
      ruleDialog: true
    })
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

  }
})