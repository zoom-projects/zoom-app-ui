import dayjs from 'dayjs'

// 获取assets静态资源
export function getAssetsFile(url: string) {
  return new URL(`../screenShot/${url}`, import.meta.url).href
}

// 获取assets目录下的images目录下的静态资源
export function getAssetsImagesFile(url: string) {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

// 获取列表静态资源
export function getListStyleImageFile(url: string) {
  return new URL(`../widgets/li/listStyleImg/${url}`, import.meta.url).href
}

// 重新计算每个组件的top值
export function computeWidgetTop(HJSchemaJsonStore: any) {
  for (let i = 0; i < HJSchemaJsonStore.value.componentsTree.length; i++) {
    const oldPageIndex = HJSchemaJsonStore.value.componentsTree[i].oldPageIndex // 以前的页码
    for (let j = 0; j < HJSchemaJsonStore.value.componentsTree[i].children.length; j++) {
      const oldTop = HJSchemaJsonStore.value.componentsTree[i].children[j].css.top // 原来的top值
      const currentPageTop
        = oldTop - (HJSchemaJsonStore.value.css.height * oldPageIndex + 50 * (oldPageIndex + 1)) // 原来在当前页面的top值
      const newTop = HJSchemaJsonStore.value.css.height * i + 50 * (i + 1) + currentPageTop // 最新的top值
      HJSchemaJsonStore.value.componentsTree[i].children[j].css.top = newTop
    }
  }
}

// hex -> rgba
export function hexToRgba(hex: string, opacity: number) {
  return (
    `rgba(${
      Number.parseInt(`0x${hex.slice(1, 3)}`)
    },${
      Number.parseInt(`0x${hex.slice(3, 5)}`)
    },${
      Number.parseInt(`0x${hex.slice(5, 7)}`)
    },${
      opacity
    })`
  )
}

// 月份范围格式转化：['2015-5', '2019-6'] -> 2015.05 - 2019.06
export function legoFormatDate(dataArray: Array<string> | string): string {
  console.log('dataArray:', dataArray)
  if (Array.isArray(dataArray)) {
    // dayjs is a modern JavaScript date utility library that parses, validates, manipulates, and displays dates and times.
    // const startDate = moment(new Date(dataArray[0])).format('YYYY.MM').split('-').join('.')
    const startDate = dayjs(dataArray[0]).format('YYYY.MM').split('-').join('.')
    let endDate
    if (dataArray[1] === '至今') {
      endDate = '至今'
    }
    else {
      // endDate = moment(new Date(dataArray[1])).format('YYYY.MM').split('-').join('.')
      endDate = dayjs(dataArray[1]).format('YYYY.MM').split('-').join('.')
    }
    return `${startDate}-${endDate}`
  }
  else {
    // return moment(new Date(dataArray)).format('YYYY.MM').split('-').join('.')
    return dayjs(dataArray).format('YYYY.MM').split('-').join('.')
  }
}

// 日期范围格式转化：['2015-5-12', '2019-6-12'] -> 2015.05.12 - 2019.06.12
export function legoFormatDateRange(dataArray: Array<string> | string): string {
  if (Array.isArray(dataArray)) {
    // const startDate = moment(new Date(dataArray[0])).format('YYYY.MM.DD').split('-').join('.')
    const startDate = dayjs(dataArray[0]).format('YYYY.MM.DD').split('-').join('.')
    let endDate
    if (dataArray[1] === '至今') {
      endDate = '至今'
    }
    else {
      // endDate = moment(new Date(dataArray[1])).format('YYYY.MM.DD').split('-').join('.')
      endDate = dayjs(dataArray[1]).format('YYYY.MM.DD').split('-').join('.')
    }
    return `${startDate}-${endDate}`
  }
  else {
    // return moment(new Date(dataArray)).format('YYYY.MM.DD').split('-').join('.')
    return dayjs(dataArray).format('YYYY.MM.DD').split('-').join('.')
  }
}
