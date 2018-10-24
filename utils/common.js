 weekSure: [{
   'desc': '每周日',
   'index': 0
 }, {
   'desc': '每周一',
   'index': 1
 }, {
   'desc': '每周二',
   'index': 2
 }, {
   'desc': '每周三',
   'index': 3
 }, {
   'desc': '每周四',
   'index': 4
 }, {
   'desc': '每周五',
   'index': 5
 }, {
   'desc': '每周六',
   'index': 6
 }]

 //  weekChange: {
 //    "0": '每周日',
 //    "1": '每周一',
 //    "2": '每周二',
 //    "3": '每周三',
 //    "4": '每周四',
 //    "5": '每周五',
 //    "6": '每周六',
 //  }

 // 获取手机信息
 let sysInfo = wx.getSystemInfoSync() //调用方法获取机型
 this.setData({
   isIOS: sysInfo.platform == 'ios'
 })

 // 获取手机型号
 $getSystemInfo().then(res => {
   let iPhoneXShow = ''
   if (res.substring(0, 8) == 'iPhone X') {
     iPhoneXShow = true
   } else {
     iPhoneXShow = false
   }
   that.setData({
     iPhoneXShow
   })
 })

 // 计算第二天的周数和下次配送时间
 //  countWeek() {
 //    let reserveTimeWeek = new Date().getDay() + 1;
 //    if (reserveTimeWeek == 7) {
 //      reserveTimeWeek = 0
 //    }
 //    let day = new Date();
 //    day.setTime(day.getTime() + 24 * 60 * 60 * 1000);
 //    let firstDistribution = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
 //    this.setData({
 //      reserveTimeWeek,
 //      firstDistribution
 //    })
 //  }

 // 计算下次配送时间
 // countDistribution(dataDate) {
 //   let nowDate = new Date().getDay();
 //   let addDay = 0;
 //   if (dataDate == 0 && nowDate != 0) {
 //     //本周日配送
 //     addDay = 7 - nowDate;
 //   } else if (dataDate > nowDate) {
 //     //本周配送
 //     addDay = dataDate - nowDate;
 //   } else {
 //     //下周配送
 //     addDay = dataDate - nowDate + 7
 //   }
 //   let date = new Date();
 //   date.setDate(date.getDate() + addDay);
 //   let firstDistribution = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
 //   this.setData({
 //     firstDistribution
 //   })
 // },

 //  查询对应的配送时间
 that.countDistribution(reserveTimeWeek)

 // 去掉字符串最后一个字符
 str.slice(0, str.length - 1)

 // 显示弹窗
 $modal('', "本套餐为100盒/年，\r\n按送水计划周期配送商品，\r\n 系统默认每周配送2盒(20L)，\r\n购买后，如需更改配送计划，可在个人中心操作或联系客服进行修改。", false, '', '', '知道了')

 //获取收货人姓名的value
 // userName(e) {
 //   let addressReceiverName = e.detail.value
 //   addressReceiverName = addressReceiverName.replace(/(^\s*)/g, "");
 //   this.setData({
 //     addressReceiverName
 //   })
 // },

 // 获取token
 let token = wx.getStorageSync('token')

 // 校验手机号码
 let myreg = /^1[0-9]{10}$/
 if (!myreg.test(addressReceiverMobile)) {
   $toast('手机号格式输入错误', 'none', 1000)
 }

// 检查地址
// checkAddress() {
//   let that = this;
//   // 地址查询
//   wx.getStorage({
//     key: 'token',
//     success: function (res) {
//       app.func.getreq('customercenter/address/query?id=' + that.data.address.id, '', res.data, function (res) {
//         if (res.code == $SUCCESS) {
//           if (!res.address) {
//             that.setData({
//               address: ''
//             })
//             that.fetchIndexData()
//           } else {
//             that.setData({
//               address: res.address
//             })
//           }
//         }
//       })
//     }
//   })
// },