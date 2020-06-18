export default class ShareImage {
  constructor (qrCode) {
    this.qrCode = qrCode
    console.log(qrCode)
  }

  palette () {
    return ({
      width: '750rpx',
      height: '1210rpx',
      background: 'https://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/distributor/bg_code.png',
      views: [
        {
          type: 'image',
          url: this.qrCode,
          css: {
            width: '270rpx',
            height: '270rpx',
            top: '396rpx',
            left: '241rpx'
          }
        },
      ]
    })
  }
}