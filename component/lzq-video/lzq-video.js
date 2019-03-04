// component/lzq-video/lzq-video.js
import {
  $getNetworkType,
  $modal
} from '../../utils/wxUtil.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoId: {
      type: String,
      value: '1'
    },
    videoSrc: {
      type: String,
      value: ''
    },
    posterSrc: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowVideoPoster: true
  },
  ready() {
    this.data.videoContext = wx.createVideoContext(`lzq-video-${this.data.videoId}`, this)
  },
  /**
   * 组件的方法列表
   */
  methods: {

    // 点击播放视频
    handleTapVideoPlay() {
      $getNetworkType().then(res => {
        console.log('当前网络情况：', res)
        return res === 'wifi'
      }).then(res => {
        if (res) {
          // 播放
          this.setData({
            isShowVideoPoster: false
          })
          this.data.videoContext.play()
        } else {
          // 非wifi环境下
          console.log('非wifi环境运行函数')
          $modal('', '非wifi环境是否播放视频').then(res => {
            console.log(res)
            // 播放
            this.setData({
              isShowVideoPoster: false
            })
            this.data.videoContext.play()
          }).catch(res => {
            console.log(res)
          })
        }
      })
    },

    // 开始/继续播放时触发play事件
    videoPlay() {
      console.log('videoPlay')
      // this.setData({
      //   isShowVideoPoster: !this.data.isShowVideoPoster
      // })
    },

    // 当暂停播放时触发 pause 事件
    videoPause() {
      console.log('videoPause')
      // this.setData({
      //   isShowVideoPoster: true
      // })
    },

    // 当播放到末尾时触发 ended 事件
    videoEnded() {
      console.log('videoEnded')
      this.setData({
        isShowVideoPoster: true
      })
    }


  }
})