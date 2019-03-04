// components/notify/notify.js
const timeUtil = require('../../utils/timeUtil.js')

Component({

  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {

      }
    },

    hasPopDialog: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
        // if (!newVal) {
        //   console.log(newVal)
        //   this.checkPopNotifyDay()
        // }
      }
    }
  },


  data: {
    // 放假通知
    beginDay: '2019-1-30 00:00:00',
    endDay: '2019-2-9 23:59:59',
    today: timeUtil.getCurrentTime(),
    isBetweenDateRange: false,
  },
  
  ready () {
    this.checkPopNotifyDay()
  },

  methods: {
    // 检测时间条件弹窗
    checkPopNotifyDay () {
      let { 
        today,
        beginDay,
        endDay,
        hasPopDialog
      } = this.data
      let isBetweenDateRange = timeUtil.isDayBetween(today, beginDay, endDay)

      // 今天是否在指定范围
      if (!isBetweenDateRange) {
        console.log('today not in BetweenDateRange...')
        return false
      }

      // 是否已经有弹窗
      if (hasPopDialog) {
        console.log('has Pop Dialog...')
        return false
      }

      // 本地记录是否已经弹窗
      this.setData({
        isBetweenDateRange: isBetweenDateRange,
        visible: true
      })

    },
    
    handleTapClose () {
      this.setData({
        visible: false
      })
    }
  }

})
