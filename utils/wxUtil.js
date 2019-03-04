/**
 * 封装相关微信方法
 */
const config = require('../config/index.js')

// 添加promise finally 事件
Promise.prototype.finally = function(callback) {
  var Promise = this.constructor
  return this.then(
    function(value) {
      Promise.resolve(cgetSystemInfoallback()).then(
        function() {
          return value
        }
      );
    },
    function(reason) {
      Promise.resolve(callback()).then(
        function() {
          throw reason
        }
      )
    }
  );
}


// 接口返回code状态码
const $SUCCESS = 0 // 成功
const $ERROR = 500 // 错误
const $WARNING = 600 // 返回其他
const $TOKENFAIL = 401 // token失效

/**
 * 
 * @param {any} str 
 */
const $log = (str = 'log') => {
  console.log('\n')
  console.log('%c<----$log / start:---->', 'font-weight:bold;')
  console.log(str)
  console.log('%c<----$log / end:---->', 'font-weight:bold;')
  console.log('\n')
}

/**
 * 
 * @param {any} str 
 */
const $warn = (str = 'warn') => {
  console.log('\n')
  console.log('%c<----$log / start:---->', 'color:red; font-weight:bold;')
  console.log(str)
  console.log('%c<----$log / end:---->', 'color:red; font-weight:bold;')
  console.log('\n')
}

/** -------------------------界面交互（提示）-------------------------- */

/**
 * 显示消息提示框
 * toast Promise 封装
 * @param {String} title 提示的内容
 * @param {String} icon 图标 ['success', 'none','loading']
 * @param {Number} duration 延迟时间
 * @param {Boolean} mask 显示透明蒙层，防止触摸穿透,
 */
const $toast = (title = '提示', icon = 'none', duration = 1500, mask = true) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title, // 提示的内容,
      icon, // 图标,
      duration, // 延迟时间,
      mask, // 显示透明蒙层，防止触摸穿透,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 显示模态对话框
 *  modal Promise 封装
 * @param {String} title 提示的标题
 * @param {String} content 提示的内容
 * @param {Boolean} showCancel 是否显示取消按钮，默认为 true
 * @param {String} cancelText 取消按钮的文字，默认为"取消"，最多 4 个字符
 * @param {String} cancelColor 取消按钮的文字颜色，默认为"#000000"
 * @param {String} confirmText 确定按钮的文字，默认为"确定"，最多 4 个字符
 * @param {String} confirmColor 确定按钮的文字颜色，默认为"#008c96"
 */
const $modal = (title = '提示', content = 'tips', showCancel = true, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor = '#00B94E') => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor,
      success: res => {
        if (res.confirm) {
          // 确定
          resolve(res)
        } else if (res.cancel) {
          // 取消
          reject(res)
        }
      },
      fail: err => reject(err)
    })
  })
}

/**
 * 显示 loading 提示框
 * showLoading Promise 封装
 * @param {String} title 提示的内容
 * @param {Boolean} mask 显示透明蒙层，防止触摸穿透
 */
const $showLoading = (title = '加载中', mask = true) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title, // 提示的内容,
      mask, // 显示透明蒙层，防止触摸穿透,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 显示操作菜单
 * showActionSheet Promise 封装
 * @param {Array} itemList 按钮的文字数组，数组长度最大为 6
 * @param {String} itemColor 按钮的文字颜色
 */
const $showActionSheet = (itemList = ['A', 'B', 'C'], itemColor = '#000000') => {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList, // 提示的内容,
      itemColor, // 显示透明蒙层，防止触摸穿透,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 隐藏消息提示框
 * hideToast 封装
 */
const $hideToast = () => {
  wx.hideToast()
}

/**
 * 隐藏 loading 提示框
 * hideLoading 封装
 */
const $hideLoading = () => {
  wx.hideLoading()
}

/** -------------------------导航栏-------------------------- */

/**
 * 在当前页面显示导航条加载动画
 * showNarBarLoading 封装
 */
const $showNarBarLoading = () => {
  wx.showNavigationBarLoading()
}


/**
 * 动态设置当前页面的标题
 *  setNarBar Promise 封装
 * @param {String} title 页面标题
 */
const $setNavBar = (title = '微信小程序') => {
  return new Promise((resolve, reject) => {
    wx.setNavigationBarTitle({
      title, //页面标题
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 设置页面导航条颜色
 *  setNarBarColor Promise 封装
 * @param {String} frontColor 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
 * @param {String} backgroundColor 背景颜色值，有效值为十六进制颜色
 * @param {Object} animation 动画效果 (duration（动画变化时间，单位 ms）、timingFunc（动画变化方式 linear、easeIn、easeOut、easeInOut）)
 */
const $setNarBarColor = (frontColor = '#000000', backgroundColor = '#ffffff', duration = 0, timingFunc = 'linear') => {
  return new Promise((resolve, reject) => {
    wx.setNavigationBarColor({
      frontColor,
      backgroundColor,
      animation: {
        duration,
        timingFunc
      },
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 在当前页面隐藏导航条加载动画
 * hideNarBarLoading 封装
 */
const $hideNarBarLoading = () => {
  wx.hideNavigationBarLoading()
}

/** -------------------------背景-------------------------- */
/**
 * 动态设置下拉背景字体、loading 图的样式
 * setBgTextStyle Promise 封装
 * @param {String} textStyle dark/light 下拉背景字体、loading 图的样式。
 */
const $setBgTextStyle = (textStyle = 'light') => {
  return new Promise((resolve, reject) => {
    wx.setBackgroundTextStyle({
      textStyle,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}
/**
 * 动态设置窗口的背景色
 * setBgColor Promise 封装
 * @param {String} backgroundColor 窗口的背景色，必须为十六进制颜色值
 * @param {String} backgroundColorTop 顶部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持
 * @param {String} backgroundColorBottom 底部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持
 */
const $setBgColor = (backgroundColor = '#ffffff', backgroundColorTop = '#ffffff', backgroundColorBottom = '#ffffff') => {
  return new Promise((resolve, reject) => {
    wx.setBackgroundColor({
      backgroundColor,
      backgroundColorTop,
      backgroundColorBottom,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/** -------------------------Tab Bar-------------------------- */
/**
 * 显示 tabBar 某一项的右上角的红点
 * showTbRedDot Promise 封装
 * @param {Number} index tabBar的哪一项，从左边算起
 */
const $showTbRedDot = (index = 0) => {
  return new Promise((resolve, reject) => {
    wx.showTabBarRedDot({
      index,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 隐藏 tabBar 某一项的右上角的红点
 * hideTbRedDot Promise 封装
 * @param {Number} index tabBar的哪一项，从左边算起
 */
const $hideTbRedDot = (index = 0) => {
  return new Promise((resolve, reject) => {
    wx.hideTabBarRedDot({
      index,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 显示tabbar
 * showTabBar  Promise 封装
 * @param {Boolean} animation 是否需要动画效果
 */
const $showTabBar = (animation = true) => {
  return new Promise((resolve, reject) => {
    wx.showTabBar({
      animation,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}


/**
 *  hideTabBar [隐藏tabbar]  Promise 封装
 * @param {Boolean} animation 是否需要动画效果
 */
const $hideTabBar = (animation = true) => {
  return new Promise((resolve, reject) => {
    wx.hideTabBar({
      animation,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 动态设置 tabBar 的整体样式
 * setTabBarStyle Promise 封装
 * @param {HexColor} color tab上的文字默认颜色
 * @param {HexColor} selectedColor tab上的文字选中时的颜色
 * @param {HexColor} backgroundColor tab的背景色
 * @param {String} borderStyle tabbar上边框的颜色， 仅支持 black/white
 */
const $setTabBarStyle = (color = '#000', selectedColor = '#f44', backgroundColor = '#fff', borderStyle = 'black') => {
  return new Promise((resolve, reject) => {
    wx.setTabBarStyle({
      color,
      selectedColor,
      backgroundColor,
      borderStyle,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}


/**
 * 动态设置 tabBar 某一项的内容
 * setTbItem Promise 封装 
 * @param {Number} index tabBar的哪一项，从左边算起
 * @param {String} text tab上按钮文字
 * @param {String} iconPath 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片
 * @param {String} selectedIconPath 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效
 */
const $setTbItem = (index = 0, text = '小草莓', iconPath = '', selectedIconPath = '') => {
  return new Promise((resolve, reject) => {
    wx.setTabBarItem({
      index,
      text,
      iconPath,
      selectedIconPath,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 为 tabBar 某一项的右上角添加文本
 * setTbBadge Promise 封装 
 * @param {Number} index tabBar的哪一项，从左边算起
 * @param {String} text 显示的文本，超过 4 个字符则显示成 ...
 */
const $setTbBadge = (index = 0, text = '小草莓') => {
  return new Promise((resolve, reject) => {
    wx.setTabBarBadge({
      index,
      text,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 移除 tabBar 某一项右上角的文本
 * removeTbBadge Promise 封装
 * @param {Number} index tabBar的哪一项，从左边算起
 */
const $removeTbBadge = (index = 0) => {
  return new Promise((resolve, reject) => {
    wx.removeTabBarBadge({
      index,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/** -------------------------路由-------------------------- */
/**
 * 切换页面路由 Promise 封装
 * @param {String} url 访问路径
 * @param {String} type 跳转方式 'navigateTo'、'redirectTo'、 'switchTab'、 'reLaunch'
 * switchTab 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面，路径后不能带参数
 * reLaunch 关闭所有页面，打开到应用内的某个页面
 * redirectTo 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
 * navigateTo 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面
 */
const $routerPage = (url = '', type = 'navigateTo') => {
  return new Promise((resolve, reject) => {
    if (!url) return reject('url error')
    switch (type) {
      case 'navigateTo':
        wx.navigateTo({
          url,
          success: res => resolve(res),
          fail: err => reject(err)
        })
        break
      case 'redirectTo':
        wx.redirectTo({
          url,
          success: res => resolve(res),
          fail: err => reject(err)
        })
        break
      case 'switchTab':
        if (url.indexOf('?') !== -1) return reject('url error')
        wx.switchTab({
          url,
          success: res => resolve(res),
          fail: err => reject(err)
        })
        break
      case 'reLaunch':
        setTimeout(() => {
          wx.reLaunch({
            url,
            success: res => resolve(res),
            fail: err => reject(err)
          })
        }, 200)
        break
    }
  })
}

/**
 * 返回路由 封装
 * @param {Number} delta 返回层数
 */
const $routerBack = (delta = 1) => {
  wx.navigateBack({
    delta
  })
}

/** -------------------------系统信息-------------------------- */

/**
 * 获取系统信息
 * getSystemInfo Promise 封装
 */
const $getSystemInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: res => {
        resolve(res)
        // console.log(res.brand) 设备品牌
        // console.log(res.model) 设备型号
        // console.log(res.pixelRatio) 设备像素比
        // console.log(res.screenWidth) 屏幕宽度，单位px
        // console.log(res.screenHeight) 屏幕高度，单位px
        // console.log(res.windowWidth) 可使用窗口宽度，单位px
        // console.log(res.windowHeight) 可使用窗口高度，单位px
        // console.log(res.statusBarHeight) 状态栏的高度，单位px
        // console.log(res.language) 微信设置的语言
        // console.log(res.version)  微信版本号
        // console.log(res.system)  操作系统及版本	
        // console.log(res.platform) 客户端平台
        // console.log(res.fontSizeSetting) 用户字体大小（单位px）。以微信客户端「我-设置-通用-字体大小」中的设置为准	
        // console.log(res.benchmarkLevel) 设备性能等级（仅Android小游戏）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好，目前最高不到50）
      },
      fail: err => {
        reject(err)
      }
    })
  })
}
/**
 * getSystemInfoSync [获取系统信息(同步版)]  Promise 封装
 */
const $getSystemInfoSync = () => {
  return new Promise((resolve, reject) => {
    try {
      const res = wx.getSystemInfoSync()
      resolve(res)
    } catch (error) {
      console.log('wx:getSystemInfoSync fail')
      const res = {}
      reject(res)
    }
  })
}


/**
 *  获取自定设备参数
 */
const $getWXSystemInfo = () => {
  return new Promise((resolve, reject) => {
    $getSystemInfoSync().then(res => {
      const sysInfo = {}
      let isIphone = res.model.indexOf('iPhone') !== -1
      sysInfo.isIphone = isIphone
      let {
        screenHeight,
        pixelRatio
      } = res

      // 判断ipx以上设备
      if (isIphone && screenHeight >= 812) {
        sysInfo.isIpx = true
      } else {
        sysInfo.isIpx = false
      }

      // 判断大屏设备
      if (sysInfo.isIpx || (screenHeight > 736 && pixelRatio >= 2.5)) {
        sysInfo.isFullDisplay = true
      } else {
        sysInfo.isFullDisplay = false
      }
      resolve(sysInfo)
    }).catch(err => {
      reject(err)
    })
  })
}


/**
 * requestPayment 【微信支付】 Promise 封装
 * @param {String} timeStamp  // 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间,
 * @param {String} nonceStr  // 随机字符串，长度为32个字符以下,
 * @param {String} packageWxa // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*,
 * @param {String} signType // 签名算法，暂支持 MD5,
 * @param {String} paySign // 签名,具体签名方案参见小程序支付接口文档,
 */
const $wxpay = (timeStamp, nonceStr, packageWxa, signType = 'MD5', paySign) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp,
      nonceStr,
      package: packageWxa,
      signType,
      paySign,
      success: res => resolve(res),
      fail: err => reject(err),
      complete: () => {}
    });
  })
}


/**
 * getNetworkType [当前网络情况]  Promise 封装
 */
const $getNetworkType = () => {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success: res => {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        let networkType = res.networkType
        resolve(networkType)
      }
    })
  })
}


/**
 * getSetting [检测授权情况]  Promise 封装
 */
const $checkAuthSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * checkSession [检测用户当前session_key是否有效]  Promise 封装
 */
const $checkSession = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: res => resolve(res),
      fail: err => reject(err),
      complete: () => {}
    })
  })
}

/**
 * login 【微信登录】 Promise 封装
 */
const $wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => resolve(res),
      fail: err => reject(err),
      complete: () => {}
    })
  })
}

/**
 * getUserInfo【获取用户信息】 Promise 封装
 */
const $getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      withCredentials: true,
      success: res => resolve(res),
      fail: err => reject(err),
      complete: () => {}
    });
  })
}


/**
 * 获取当前页url
 */
const $getCurrentPageUrl = () => {
  let pages = getCurrentPages() //获取加载的页面
  let currentPage = pages[pages.length - 1] //获取当前页面的对象
  let url = currentPage.route //当前页面url
  return url
}

/**
 * 获取当前页带参数的url
 */
const $getCurrentPageUrlWithArgs = () => {
  let pages = getCurrentPages() //获取加载的页面
  let currentPage = pages[pages.length - 1] //获取当前页面的对象
  let url = currentPage.route //当前页面url
  let options = currentPage.options //如果要获取url中所带的参数可以查看options

  if (Object.keys(options).length > 0) {
    //拼接url的参数
    let urlWithArgs = url + '?'
    for (let key in options) {
      let value = options[key]
      urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

    return urlWithArgs
  } else {
    //拼接url的参数
    let urlWithArgs = url
    return urlWithArgs
  }
}

/**
 * 获取当前页带参数的url Promise 封装
 */
const $getCurrentPageUrlWithArgsPromise = () => {
  return new Promise((resolve, reject) => {
    let urlWithArgs = $getCurrentPageUrlWithArgs()
    if (urlWithArgs) {
      resolve(urlWithArgs)
    } else {
      reject('error')
    }
  })
}

/**
 * 获取地理坐标信息 Promise 封装
 */
const $chooseLocation = () => {
  return new Promise((resolve, reject) => {
    wx.chooseLocation({
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

const $authorize = scope => {
  return new Promise((resolve, reject) => {
    wx.authorize({
      scope,
      success: res => resolve(res),
      fail: err => reject(err),
      complete: () => {}
    });
  })
}

const $openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: res => resolve(res),
      fail: err => reject(err),
    })
  })
}

/** 保存图片到系统相册 */
const $saveImageToPhoto = (filePath) => {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      filePath,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/** 下载文件 */
const $downloadFile = (url) => {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 基础网络请求request
 * @param {String} url 请求接口path
 * @param {Object} data 请求参数 
 * @param {Boolean} needToken 是否需求token
 * @param {String} method 请求类型
 * @param {String} contentType  请求和响应的HTTP内容类型
 */
const request = (url = '', data = {}, needToken = true, contentType = 'application/json', method = 'GET') => {
  const token = needToken ? wx.getStorageSync('token') : ''
  const baseURL = config.requestBaseURL
  const reqURL = baseURL + url
  $showLoading()
  return new Promise((resolve, reject) => {
    wx.request({
      url: reqURL, //开发者服务器接口地址,
      data, //请求的参数,
      method: method.toUpperCase(),
      header: {
        'Content-Type': contentType,
        token
      },
      dataType: 'json', //，默认json, 设置json会尝试对返回的数据做一次 JSON.parse
      success: res => {
        // 请求开发者服务器成功
        const result = res.data
        const {
          code,
          msg
        } = result
        switch (code) {
          case $SUCCESS:
            // SUCCESS
            delete result.code
            delete result.msg

            // console.log('\n')
            console.group('------------ 请求参数 / S----------------')
            console.log(`%cBaseURL:`, 'font-weight:bold;', baseURL)
            console.log(`%cPath:`, 'font-weight:bold;', url)
            console.log(`%cMethod:`, 'font-weight:bold;', method)
            console.log(`%cParams:`, 'font-weight:bold;', data)
            console.log(`%cToken:`, 'font-weight:bold;', needToken)
            console.log(`%cResult:`, 'font-weight:bold;', result)
            console.groupEnd()
            console.log('\n')
            resolve(result)
            break
          case $WARNING:
            // WARNING
            reject(msg)
            break
          case $TOKENFAIL:
            // TOKENFAIL
            // todo 授权跳转
            break
          case $ERROR:
            // ERROR
            reject(msg)
            break
          default:
            reject(msg)
        }
      },
      fail: () => {
        // 请求开发者服务器失败

      },
      complete: () => {
        // 请求开发者服务器完成
        $hideLoading()
      }
    })
  })
}

/**
 *  网络请求GET方法
 * @param {String} url 请求接口path
 * @param {Object} data 请求参数 
 * @param {Boolean} needToken 是否需求token
 */
const $get = (url, data, needToken, contentType) => request(url, data, needToken, contentType = 'application/json', 'GET')

/**
 * 网络请求POST方法
 * @param {String} url 请求接口path
 * @param {Object} data 请求参数 
 * @param {Boolean} needToken 是否需求token
 */
const $post = (url, data, needToken, contentType) => request(url, data, needToken, contentType = 'application/json', 'POST')

/**
 * 网络请求PUT方法
 * @param {String} url 请求接口path
 * @param {Object} data 请求参数 
 * @param {Boolean} needToken 是否需求token
 */
const $put = (url, data, needToken, contentType) => request(url, data, needToken, contentType = 'application/json', 'PUT')

/**
 * 网络请求DELETE方法
 * @param {String} url 请求接口path
 * @param {Object} data 请求参数 
 * @param {Boolean} needToken 是否需求token
 */
const $del = (url, data, needToken, contentType) => request(url, data, needToken, contentType = 'application/json', 'DELETE')

export {
  $SUCCESS,
  $ERROR,
  $WARNING,
  $TOKENFAIL,
  $toast,
  $showLoading,
  $showActionSheet,
  $hideLoading,
  $hideToast,
  $modal,
  $setNavBar,
  $setNarBarColor,
  $showNarBarLoading,
  $hideNarBarLoading,
  $setBgTextStyle,
  $setBgColor,
  $showTbRedDot,
  $hideTbRedDot,
  $showTabBar,
  $hideTabBar,
  $setTabBarStyle,
  $setTbItem,
  $setTbBadge,
  $removeTbBadge,
  $routerPage,
  $routerBack,
  $wxpay,
  $log,
  $warn,
  $get,
  $post,
  $put,
  $del,
  $getNetworkType,
  $checkAuthSetting,
  $checkSession,
  $wxLogin,
  $getUserInfo,
  $getSystemInfo,
  $getSystemInfoSync,
  $getWXSystemInfo,
  $getCurrentPageUrl,
  $getCurrentPageUrlWithArgs,
  $getCurrentPageUrlWithArgsPromise,
  $chooseLocation,
  $authorize,
  $openSetting,
  $saveImageToPhoto,
  $downloadFile
}