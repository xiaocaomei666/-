/*
 * @Author: Mak(maiyahong@126.com) 
 * @Date: 2019-03-20 15:52:31 
 * @desc: 小程序页面拦截
 * @Last Modified by: Mak
 * @Last Modified time: 2019-03-22 17:45:58
 */

// 引入async await
import regeneratorRuntime from '../libs/regeneratorRuntime/index.js'

// 引入微信封装类
import { 
  $getCurrentPageUrlWithArgsPromise,
  $getCurrentPageUrl,
  $routerPage,
  $checkAuthSetting,
  $checkSession,
  $toast,
  $getUserInfo,
  $wxLogin,
  $get
} from '../utils/wxUtil.js'


 // 引入配置文件
const { authWhitePages, tabBarPages, wxAuthPage } = require('../config/index.js')

/**
 * 检测页面当前页面是否在白名单 
 * @param {String} currentPage 页面路径
 */
const checkAuthWhitePage = (currentPage) => {
  return authWhitePages.indexOf(currentPage) !== -1
}

/**
 * 判断页面是否为tabbar页
 * @param {String} page 页面路径
 */
export const isTabBarPage = (page) => {
  let arr = tabBarPages.filter(item => {
    return item.startsWith(page)
  })
  return arr.length === 1 
}

const log = (label, str, ...arg) => {
  let styles = `
    color:#fff; 
    background: #67c23a; 
    display: block; 
    text-align: center;
  `
  console.log(`%c #${label}# -----> ${str} <----- `, styles, ...arg)
}

/**
 *  APP级别：
 * 检测微信是否授权
 */
export const appCheckWxAuthSetting = (type) => {
  return new Promise((resolve, reject) => {
     $checkAuthSetting().then(async res => {
      if (res.authSetting['scope.userInfo']) {
        log(`App`, `全局检测：已授权 -> 获取用户信息`)
        // 1、获取用户信息
        const userInfoRes = await $getUserInfo()
        resolve(userInfoRes)
        
      } else {
        log(`App`, `全局检测：未授权 -> 需要再次授权`)
        // 2、判断页面类型
        reject('getUserInfo:fail')
      }
    }).catch(err => {
      log(`App`, `APP $checkAuthSetting error`)
      $toast('微信授权接口请求失败')
      reject('getUserInfo:fail')
    })
  })
}

/**
 * APP级别
 * 检测用户登录方式
 */
export const appCheckLoginType = () => {
  return new Promise(async (resolve, reject) => {
    const res = await $wxLogin()
    const { code } = res
    wx.setStorageSync('code', code)
    const wxLoginRes = await $get(`/login/wxLogin`, { code })
    if (wxLoginRes) {
      wx.setStorageSync('wxLoginRes', JSON.stringify(wxLoginRes))
      resolve(wxLoginRes)
    } else {
      reject(null)
    }
  })
}

/**
 * APP级别: 
 * 检测当前登录状态
 */
export const appCheckLoginStatus = () => {
  return new Promise((resolve, reject) => {
    $checkSession().then(sessionRes => {
      log(`App`, `App sessionKey 状态检测：`)
      log(`App`, `sessionKey 未过期/未失效 -> 正常访问`)
      // 1 页面级别判断路由

    }).catch(sessionErr => {
      log(`App`, `App sessionKey 状态检测：`)
      log(`App`, `sessionKey 已过期/已失效 -> 重新登录`)
      // 2、重新登录获取code

      $wxLogin().then(wxLoginRes => {
        let { code } = wxLoginRes
        wx.setStorageSync('code', code)
        return code
      }).then(code => {
        // 2、保存返回
        $get(`/login/wxLogin`,{ code }).then(resp => {
          console.log('接口返回：', resp)
          wx.setStorageSync('wxLoginRes', JSON.stringify(resp))
        })
      }).catch(wxLoginErr => {
        $toast('微信Api登录接口失败')
      })

    }).finally(async () => {
      // 3、无论 sessionKey是否过期获取检测用户授权情况
      appCheckWxAuthSetting().then(res => {
        resolve(res)
        pageIntercept('wxAuth:success').catch(err => {})
      }).catch(err => {
        reject(err)
        pageIntercept().catch(err => {})
      })
    })
  })
}

/**
 * page级别
 * 小程序页面路由拦截器
 */
export const pageIntercept = (type) => {
  return new Promise((resolve, reject) => {
    log(`App`, `页面路由拦截：`)
    log(`App`, `App 白名单页面：`, authWhitePages)
    $getCurrentPageUrlWithArgsPromise().then(resUrl => {
      // 1、判断当前打来页面 是否当白名单页面
      log(`App`, `当前打开页面：`, resUrl)
      const currentUrl = $getCurrentPageUrl()
      const isInPageAuthWhiteList = checkAuthWhitePage(currentUrl)
      return isInPageAuthWhiteList ? 'isWhitePage' : resUrl
    }).then(resUrl => {
      // 2、根据判断页面类型操作
      if (resUrl !== 'isWhitePage') {
        // 2-1、非白名单页面逻辑操作
        log(`App`, `非白名单页面 `)
        if (type === 'wxAuth:success')  return false
        // 2-1-1 缓存打开页面
        const authCallBackUrl = resUrl
        $routerPage('../../' + wxAuthPage, 'redirectTo').then(() => {
          const isHasAuthCallBackUrl = wx.getStorageSync('authCallBackUrl') || ''
          if (!isHasAuthCallBackUrl) {
            wx.setStorageSync('authCallBackUrl', authCallBackUrl)
          }
          reject('authPage')
        })
        
      } else {
        // 2-2、白名单页面逻辑操作
        log(`App`, `白名单页面 `)
        // todo
        resolve('whitePagePass')
      }
    })
  })
}
