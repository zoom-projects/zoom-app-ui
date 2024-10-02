const mode = import.meta.env.VITE_ROUTER_MODE ?? 'history'
/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {object} result 处理后的结果
 * @returns {object}
 */
export function getAllBreadcrumbList(menuList: Menu.MenuOptions[], parent = [], result: { [key: string]: any } = {}) {
  for (const item of menuList) {
    result[item.path] = [...parent, item]
    if (item.children)
      getAllBreadcrumbList(item.children, result[item.path], result)
  }
  return result
}

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter((item) => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.isHide
  })
}

/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {string}
 */
export function getUrlWithParams(): string {
  const url = {
    hash: location.hash.substring(1),
    history: location.pathname + location.search,
  }
  return url[mode]
}

/**
 * @description 生成随机字符串
 * @param length 长度
 * @returns {string}
 */
export function random(length: number = 16): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const maxPos = chars.length
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return result
}
