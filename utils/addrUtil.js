// 地址转换格式
const formatAreaList = (areaList) => {
  let provinceArr = []
  let cityArrObj = {}
  let areaArrObj = {}

  areaList.forEach((item, index) => {
    provinceArr.push(item.arName)
    let cityArr = item.list.map(i => {
      return i.arName
    })

    cityArrObj[item.arName] = cityArr

    item.list.forEach((value, count) => {
      let areaArr = value.list.map(j => {
        return j.arName
      })
      areaArrObj[value.arName] = areaArr
    })

  })
  return {
    provinceArr,
    cityArrObj,
    areaArrObj
  }
}

export { formatAreaList }