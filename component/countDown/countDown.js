// component/verificationCode/verificationCode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    timeCurrent: {
      type: Number,
      value: 60,
      observer: (newVal, oldVal) => {

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timeBtn: '获取验证码'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    fetchBtn() {
      let that = this;
      // 初始化数值
      let timeCurrent = that.data.timeCurrent
      let timeBtn = `${timeCurrent}s后重新获取`;
      that.setData({
        timeBtn,
        disabled: true
      })

      // 开始定时器
      let t1 = setInterval(() => {
        that.setData({
          timeBtn: (timeCurrent - 1) +
            's后重新获取'
        })
        timeCurrent--;
        if (timeCurrent <= 0) {
          // 清除定时器
          clearInterval(t1)
          that.setData({
            timeBtn: '重新获取验证码',
            disabled: false
          })
        }
      }, 1000)
    }
  }
})