// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 显示/隐藏
    visible: {
      type: Boolean,
      value: false,
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      value: true,
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      value: true,
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // 取消按钮文案
    cancelText: {
      type: String,
      value: '取消',
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // 确认按钮文案
    submitText: {
      type: String,
      value: '确定',
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // 标题
    title: {
      type: String,
      value: '温馨提示',
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // 内容
    content: {
      type: String,
      value: '这是默认弹窗内容',
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // 文案居左中右
    textAlign: {
      type: String,
      value: 'center',
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // open-type：share、contact、getUserInfo、getPhoneNumber
    submitButtonType: {
      type: String,
      value: '',
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // open-type：share、contact、getUserInfo、getPhoneNumber
    cancelButtonType: {
      type: String,
      value: '',
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // 是否动效
    anim: {
      type: Boolean,
      value: true,
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // 是否可关闭
    closeable: {
      type: Boolean,
      value: false,
      observer: (newVal, oldVal, changePath) => {

      }
    },
    //是否是关于口袋水店的
    store: {
      type: Boolean,
      value: false,
      observer: (newVal, oldVal, changePath) => {

      }
    },
    // 是否圆角
    isRadius: {
      type: Boolean,
      value: false,
      observer: (newVal, oldVal, changePath) => {

      }
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    ready() { }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 自关闭
    handleTapClose() {
      this.setData({
        visible: false
      })
      this.triggerEvent('close', {})
    },
    // 确定
    handleTapSubmit() {
      let {
        submitButtonType
      } = this.data
      if (!submitButtonType || submitButtonType == 'openSetting') {
        this.triggerEvent('submit', {})
      }
    },

    // 取消
    handleTapCancel() {
      let {
        cancelButtonType
      } = this.data
      if (!cancelButtonType || cancelButtonType == 'openSetting') {
        this.triggerEvent('cancel', {})
      }
    },

    // 获取用户信息
    getUserInfo(res) {
      const buttonType = res.currentTarget.dataset.buttonType
      console.log('按钮类型:', buttonType)
      console.log('dialog 获取用户信息:', res)
      let {
        detail
      } = res
      this.triggerEvent(buttonType, {
        userInfoDetail: detail
      })
    },
    // 获取手机号码
    getPhoneNumber(res) {
      const buttonType = res.currentTarget.dataset.buttonType
      console.log('按钮类型:', buttonType)
      console.log('dialog 获取用户手机号码:', res)
      let {
        detail
      } = res
      this.triggerEvent(buttonType, {
        phoneDetail: detail
      })
    },

    // 客服回调
    contactCallBack(res) {
      const buttonType = res.currentTarget.dataset.buttonType
      console.log('按钮类型:', buttonType)
      console.log('dialog 客服回调:', res)
      let {
        detail
      } = res
      this.triggerEvent(buttonType, {
        contactDetail: detail
      })
    },

    // 授权列表页
    opensettingCallBack(res) {
      // const buttonType = res.currentTarget.dataset.buttonType
      // console.log('按钮类型:', buttonType)
      // console.log('dialog 授权列表页回调:', res)
      // let {
      //   detail
      // } = res
      // this.triggerEvent(buttonType, {
      //   openSettingDetail: detail
      // })
    }
  }
})