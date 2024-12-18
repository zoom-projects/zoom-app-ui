import * as authApi from '@/api/modules/login'
import { HOME_URL } from '@/config'
import router from '@/router'
import { initDynamicRouter } from '@/router/modules/dynamicRouter'
import { LoginType } from '@/utils/enums'
import { store, useKeepAliveStore, useTabsStore } from '..'
import piniaPersistConfig from '../helper/persist'

export const useUserStore = defineStore(
  'zoom-user',
  () => {
    const tabsStore = useTabsStore()
    const keepAliveStore = useKeepAliveStore()
    // 登录类型
    const loginType = ref<LoginType>(LoginType.username)

    const token = ref('')
    function setToken(value: string) {
      token.value = value
    }
    const userInfo = ref<any>({})

    // 激活的用户信息面板
    const activeUserInfoPanel = ref<string>('profile')
    function setActiveUserInfoPanel(value: string) {
      activeUserInfoPanel.value = value
    }

    /**
     * 登录成功后的操作
     */
    async function afterLogin() {
      // 1.添加动态路由
      await initDynamicRouter()
      // 2.清空 tabs、keepAlive 数据
      tabsStore.setTabs([])
      keepAliveStore.setKeepAliveName([])
      // 3.跳转到首页
      router.push(HOME_URL)
      // 4. 获取用户信息
      _userInfo()
      // 5. 获取按钮权限
    }

    async function afterLogout() {
      // 1.清空 tabs、keepAlive 数据
      userInfo.value = {}
      token.value = ''
    }

    async function _userInfo() {
      const { data, success } = await authApi.getCurrentUserInfoApi()
      if (success) {
        userInfo.value = data
      }
    }

    return {
      loginType,
      token,
      userInfo,
      activeUserInfoPanel,
      setToken,
      afterLogin,
      afterLogout,
      setActiveUserInfoPanel,
    }
  },
  {
    persist: piniaPersistConfig('zoom-user'),
  },
)

export function userStoreHook() {
  return useUserStore(store)
}
