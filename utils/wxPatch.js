/*
 * @Author: Mak(maiyahong@126.com)
 * @Date: 2019-03-20 15:47:30
 * @desc: 微信小程序自定义增强补丁
 * @Last Modified by: Mak
 * @Last Modified time: 2019-03-21 14:06:53
 */

// 引入async await
import regeneratorRuntime from '../libs/regeneratorRuntime/index.js'

// 引入小程序computed、watch增强补丁
const { patchPage, patchComponent } = require('../libs/wxPatch/index.js')

// 添加promise finally 事件
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(function () {
        return value
      })
    },
    function (reason) {
      Promise.resolve(callback()).then(function () {
        throw reason
      })
    }
  )
}

// 装饰代理
const hookingProxy = (obj, methodName, custom) => {
  if (obj[methodName]) {
    let method = obj[methodName]
    obj[methodName] = function (event) {
      custom.call(this, event, methodName)
      method.call(this, event)
    }
  } else {
    obj[methodName] = function (event) {
      custom.call(this, event, methodName)
    }
  }
}

/**
 * 小程序装饰代理
 */
class MiniAppProxy {
  constructor(Page, Component) {
    this._Page = patchPage(Page)
    this._Component = patchComponent(Component)
    // 页面级别
    this.pageHandlers = {
      onLoad: function (opts) {
        // console.log('Page 增强补丁已打:', this)
        // console.log('page onLoad')
      },
      onShow: function(opts) {
        // console.log('page onShow')
      }
    }

    // 组件级别
    this.componentHandlers = {
      created: function (opts) {
        // console.log('Component 增强补丁已打：', this)
      }
    }
    this.init()
  }
  proxy (target, type) {
    let handlers = {}
    let _origin = {}
    switch (type) {
      case 'Page':
        handlers = this.pageHandlers
        _origin = this._Page
        break
      case 'Component':
        handlers = this.componentHandlers
        _origin = this._Component
        break
      default:
        handlers = {}
    }

    for (const key in handlers) {
      if (handlers.hasOwnProperty(key)) {
        hookingProxy(target, handlers[key].name, handlers[key]);
      }
    }
    _origin(target)
  }
  init () {
    // Page 装饰代理
    Page = target => {
      this.proxy(target, 'Page')
    }
    // component 装饰代理
    Component = target => {
      this.proxy(target, 'Component')
    }
  }
}

// 执行
new MiniAppProxy(Page, Component)

