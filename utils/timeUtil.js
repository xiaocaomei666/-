import dayjs from '../libs/dayjs/dayjs.min.js'
import isBetween from '../libs/dayjs/isBetween.js'

dayjs.extend(isBetween)

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 判断某个时间是否在指定时间区间内
const isDayBetween = (day, beginDay, endDay) => {
  return dayjs(day).isBetween(dayjs(beginDay), dayjs(endDay))
}

// 2018-08-08
const getCurrentDate = (arg) => {
  return arg ? dayjs(arg).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')
}

// 获取当前时间
const getCurrentTime = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 
 * @param {string} page 为参数page对象this
 * @param {number} timestamp 截止时间戳
 * @param {string} type 倒计时时间类型
 * @param {function} callbackFn 倒计时结束回调函数
 */
const countDown = (page, timestamp, type, callbackFn = () => {}) => {
  let _this = page
  if (_this.data.countTimer){
    clearInterval(_this.data.countTimer)
  }
  let nowTime = new Date()
  let endTime = ''
  if (type === 'time') {
    let currentTime = new Date().getTime()
    endTime = new Date(currentTime + timestamp)
  } else if(type === 'date') {
    endTime = new Date(timestamp * 1000)
  }

  let time = endTime.getTime() - nowTime.getTime()

  if (timestamp <= 0 || time <= 0 ) {
    // 时间戳小于或者等于零返回 '00:00:00'
    _this.setData({
      countDownStr: '00:00:00',
      isTimeOver: true,
      countDownObj: {
        day  : '00',
        hour : '00',
        min  : '00',
        sec  : '00'
      }
    })
    // 倒计时结束回调函数执行
    if (typeof callbackFn === 'function') {
      callbackFn.call(_this)
    }
  } else {
    
    // 时间戳大于0 进行倒计时
    let countTimer = setInterval( () => {
      let countDownStr = ''

      if (type === 'date') {        
        let nowTime = new Date()
        let endTime =endTime = new Date(timestamp * 1000)
        time = endTime.getTime() - nowTime.getTime()
      }

      if (time <= 0) {
        _this.setData({
          countDownStr: '00:00:00',
          isTimeOver: true,
          countDownObj: {
            day  : '00',
            hour : '00',
            min  : '00',
            sec  : '00'
          }
        })
        if (typeof callbackFn === 'function') {
          callbackFn.call(_this)
          clearInterval(countTimer)
        }
        return
      }

      let day = Math.floor(time / 1000 / 60 / 60 / 24)
      let hour = Math.floor(time / 1000 / 60 / 60 % 24)
      let min = Math.floor(time / 1000 / 60 % 60)
      let sec = Math.floor(time / 1000 % 60)
  
      if (hour < 10) {
        hour = '0' + hour
      }
      if (min < 10) {
        min = '0' + min
      }
      if (sec < 10) {
        sec = '0' + sec
      }

      // 处理格式
      // if (day == '0' && hour == '00' && min == '00') {
      //   countDownStr = sec
      // } else if (day == '0' && hour == '00') {
      //   countDownStr = min + ':' + sec
      // } else if (day == '0') {
      //   countDownStr = hour + ':' + min + ':' + sec
      // } else {
      //   countDownStr = day + ':' + hour + ':' + min + ':' + sec
      // }
      if (day == '0') {
        countDownStr = hour + ':' + min + ':' + sec
      } else {
        countDownStr = day + ':' + hour + ':' + min + ':' + sec 
      }
      
      _this.setData({
        countDownStr,
        countDownObj: {
          day,
          hour,
          min,
          sec
        }
      })
      if (type === 'time') {
        time = time - 1000
      }
    }, 1000)

    _this.setData({
      countTimer
    })
  }

}

module.exports = {
  formatTime,
  countDown,
  isDayBetween,
  getCurrentDate,
  getCurrentTime
}
