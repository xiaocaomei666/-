/**
 * @desc 函数防抖：某函数只有在过完一段时间后并且该段时间内不被调用才会被执行。
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
const debounce = (func, wait, immediate) => {
  var timeout

  return function () {
    var context = this
    var args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * @desc 函数节流: 某函数在指定的一个时间段周期性的间断执行
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
const throttle = (func, wait, type) => {
  if (type === 1) {
    var previous = 0
  } else if (type === 2) {
    var timeout
  }

  return function () {
    var context = this
    var args = arguments
    if (type === 1) {
      var now = Date.now()

      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(function () {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

/**
 * 获取url参数
 */

 const filterUrlParam = (urlSearch) => {
  let ret = {}
  let regParam = /([^&=]+)=([\w\W]*?)(&|$|#)/g
  if (urlSearch) {
    var strParam = urlSearch; 
    var result
    while ((result = regParam.exec(strParam)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}

export { debounce, throttle, filterUrlParam }
