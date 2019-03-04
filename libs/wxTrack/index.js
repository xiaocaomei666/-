import WxTrack from './track.js'

// 代理方法
const proxy = (obj, methodName, custom) => {
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

// 钩子方法demo
const hookMethod = function (event, methodName) {
  console.log('hook '+ methodName)
  if (event){
    console.log(event)
  }
}

let _App = App
let _Page = Page

const wxTrack = new WxTrack()

// App 级别生命周期代理
App = obj => {
  // 注入wxTrack
  obj.wxTrack = wxTrack
  // App 启动
  proxy(obj, 'onLaunch', (options) => {

  })

  // App 进入前台
  proxy(obj, 'onShow', (options) => {
    wxTrack.appInit(options)
  })

  // App 进入后台
  proxy(obj, 'onHide', () => {
    if (!wxTrack.appEndTime) {
      wxTrack.appExit()
    }
  })

  return _App(obj)
}

// 页面级别生命周期代理
Page = obj => {
  proxy(obj, 'onLoad', () => {

  })

  proxy(obj, 'onShow', (options) => {
    wxTrack.pageInit(options)
  })

  proxy(obj, 'onHide', () => {
    wxTrack.pageExit()
  })

  proxy(obj, 'onUnload', () => {
    if (!wxTrack.pageEndTime) {
      wxTrack.pageExit()
    }
  })

  return _Page(obj)
}