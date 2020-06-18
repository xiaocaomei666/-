export default class ShareImage {
  constructor (name, image, qrCode) {
    this.name = name
    this.image = image
    this.qrCode = qrCode
  }

  palette () {
    return ({
      width: '573rpx',
      height: '1010rpx',
      background: 'https://jxkf-dts-xcx.oss-cn-shenzhen.aliyuncs.com/xcx/recommend/share_dialog_demo.jpg',
      views: [
        {
          type: 'image',
          url: this.image,
          css: {
            width: '60rpx',
            height: '60rpx',
            overflow: 'hidden',
            borderRadius: '60rpx',
            left: '65rpx',
            bottom: '254rpx',
            borderWidth: '2px',
            borderColor: '#FF6F61'
          }
        },
        {
          type: 'text',
          text: this.name,
          css: {
            bottom: '275rpx',
            fontSize: '26rpx',
            fontWeight: 'bold',
            left: '260rpx',
            color: '#E7474B'
          },
        },
        {
          type: 'image',
          url: this.qrCode,
          css: {
            width: '130rpx',
            height: '130rpx',
            right: '54rpx',
            bottom: '64rpx'
          }
        },
      ]
    })
  }
}