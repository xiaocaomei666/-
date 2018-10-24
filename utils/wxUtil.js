/**
 * 接口返回code状态码
 */
const $SUCCESS = 0 // 成功
const $ERROR = 500 // 错误
const $WARNING = 600 // 返回其他
const $TOKENFAIL = 401 // token失效

/**
 * 
 * @param {any} str 
 * 这里%c为打印内容定义的样式
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

/**
 * 显示消息提示框
 * toast Promise 封装
 * @param {String} title 提示的内容
 * @param {String} icon 图标 ['success', 'none']
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
 * 隐藏 loading 提示框
 * hideLoading 封装
 */
const $hideLoading = () => {
  wx.hideLoading()
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
const $modal = (title = '提示', content = '内容', showCancel = true, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor = '#008c96') => {
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
 * 显示操作菜单
 *  sheet Promise 封装
 *  @param {Array.<string>} itemList 按钮的文字数组，数组长度最大为 6(必填)
 */
const $sheet = (itemList = ['A', 'B', 'C'], itemColor='#000',) => {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList,
      itemColor,
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}



export {
  $SUCCESS,
  $ERROR,
  $WARNING,
  $TOKENFAIL,
  $log,
  $warn,
  $toast,
  $showLoading,
  $hideLoading,
  $modal,
  $sheet
}