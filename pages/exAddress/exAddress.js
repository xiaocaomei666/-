// pages/exAddress/exAddress.js
import {
  $getSystemInfoSync
} from '../../utils/wxUtil.js'

import { formatAreaList } from '../../utils/addrUtil.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fullAddr: '',
    multiArray: [
      [],
      []
    ],
    multiIndex: [0, 0, 0],
    areaList: [{
      "arName": "广东",
      "arNo": "001",
      "list": [{
        "arName": "广州",
        "arNo": "001001",
        "list": [{
          "arName": "越秀区",
          "arNo": "001001001",
          "list": []
        }, {
          "arName": "天河区",
          "arNo": "001001002",
          "list": []
        }, {
          "arName": "白云区",
          "arNo": "001001003",
          "list": []
        }, {
          "arName": "海珠区",
          "arNo": "001001004",
          "list": []
        }, {
          "arName": "番禺区",
          "arNo": "001001005",
          "list": []
        }, {
          "arName": "黄埔区",
          "arNo": "001001006",
          "list": []
        }, {
          "arName": "荔湾区",
          "arNo": "001001007",
          "list": []
        }, {
          "arName": "南沙区",
          "arNo": "001001008",
          "list": []
        }, {
          "arName": "增城区",
          "arNo": "001001009",
          "list": []
        }, {
          "arName": "花都区",
          "arNo": "001001010",
          "list": []
        }, {
          "arName": "从化区",
          "arNo": "001001011",
          "list": []
        }, {
          "arName": "萝岗区",
          "arNo": "001001012",
          "list": []
        }]
      }, {
        "arName": "肇庆",
        "arNo": "001002",
        "list": [{
          "arName": "端州区",
          "arNo": "001002001",
          "list": []
        }, {
          "arName": "高要区",
          "arNo": "001002002",
          "list": []
        }, {
          "arName": "鼎湖区",
          "arNo": "001002003",
          "list": []
        }, {
          "arName": "四会区",
          "arNo": "001002004",
          "list": []
        }]
      }, {
        "arName": "佛山",
        "arNo": "001003",
        "list": [{
          "arName": "禅城区",
          "arNo": "001003001",
          "list": []
        }, {
          "arName": "南海区",
          "arNo": "001003002",
          "list": []
        }]
      }]
    }],
    provinceArr: '',
    cityArrObj: '',
    areaArrObj: '',
    fullAddrObj: '',
    // 传给后台
    areaCode: '',
    // 是否是ios
    isIOS: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 地址格式化
    let {
      areaList
    } = this.data

    let {
      provinceArr,
      cityArrObj,
      areaArrObj
    } = formatAreaList(areaList)

    // 默认第一个的省 市  区
    let province = provinceArr[0]
    let city = cityArrObj[province][0]
    let area = areaArrObj[city][0]

    // 省市区拼接
    let fullAddr = `${province}${city}${area}`
    let fullAddrObj = {
      province,
      city,
      area
    }

    this.setData({
      multiArray: [
        provinceArr,
        cityArrObj[province],
        areaArrObj[city]
      ],
      multiIndex: [0, 0, 0],
      provinceArr,
      cityArrObj,
      areaArrObj,
      areaList,
      fullAddrObj,
      fullAddr
    })
    // 调用方法获取机型
    $getSystemInfoSync().then(res => {
      console.log(res, '调用方法获取机型')
      this.setData({
        isIOS: res.platform == 'ios'
      })
    })
  },

  // 确定地址选择器的选择
  addrPicker(e) {
    let {
      multiArray,
      areaList
    } = this.data
    let multiIndex = e.detail.value
    let index0 = multiIndex[0]
    let index1 = multiIndex[1]
    let index2 = multiIndex[2]

    // 区名字
    let area = multiArray[2][index2]

    // 选中的市对象
    let cityObj = areaList[index0].list[index1]

    // 市code
    let cityCode = cityObj.arNo
    // 区code
    let areaCode = ''


    // 不存在区，将市的code传给后台,存在则传区的code
    if (!area) {
      area = ''
      areaCode = cityCode
    } else {
      areaCode = cityObj.list[index2].arNo
    }

    // 省市区拼接
    let province = multiArray[0][index0]
    let city = multiArray[1][index1]
    let fullAddr = `${province}${city}${area}`
    let fullAddrObj = {
      province,
      city,
      area
    }

    this.setData({
      fullAddrObj,
      multiIndex,
      fullAddr,
      areaCode
    })
  },

  // 地址选择器滚动中
  addrPickerCol(e) {
    let {
      multiArray,
      multiIndex,
      provinceArr,
      cityArrObj,
      areaArrObj
    } = this.data

    let col = e.detail.column
    let val = e.detail.value
    multiIndex[col] = val

    switch (col) {
      case 0:
        let index = multiIndex[0]
        console.log('滑动第一级别', index)

        switch (index) {
          case index:
            let provIndex = provinceArr[index]
            multiArray[1] = cityArrObj[provIndex]
            multiArray[2] = areaArrObj[cityArrObj[provIndex][0]]
            break
        }

        multiIndex[1] = 0
        multiIndex[2] = 0
        break

      case 1:
        let index2 = multiIndex[1]
        console.log('滑动第二级别', index2, areaArrObj[multiArray[1][index2]])

        switch (index2) {
          case index2:
            multiArray[2] = areaArrObj[multiArray[1][index2]]
            break
        }

        multiIndex[2] = 0
        break
    }

    this.setData({
      multiIndex,
      multiArray
    })
  },

  // 取消地址选择器的选择
  addrCancel(e) {
    let {
      fullAddrObj,
      provinceArr,
      cityArrObj,
      areaArrObj
    } = this.data

    // 可确定选择的省市区
    let province = fullAddrObj['province']
    let city = fullAddrObj['city']
    let area = fullAddrObj['area']

    console.log(fullAddrObj, 'fullAddrObj')

    // 查询已确定的省市区在当前数组中的下标位置
    let cityArr = cityArrObj[province]
    let areaArr = areaArrObj[city]

    let provinceIndex = provinceArr.indexOf(province) || 0
    let cityIndex = cityArr.indexOf(city) || 0
    let areaIndex = areaArr.indexOf(area) || 0

    // 赋值回去
    let multiArray = [provinceArr, cityArr, areaArr]
    this.setData({
      multiIndex: [provinceIndex, cityIndex, areaIndex],
      multiArray
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})