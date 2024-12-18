<script setup lang="ts">
import type { Auth } from '@/api/types'
import { loginBySocialApi, socialCallback } from '@/api/modules/login'
import { useUserStore } from '@/store'

const { token, setToken, afterLogin } = useUserStore()
const route = useRoute()
/**
 * 接收Route传递的参数
 * @param {object} route.query.
 */
const code = route.query.code as string
const state = route.query.state as string
const source = route.query.source as string
const stateJson = JSON.parse(atob(state))
const domain = stateJson.domain as string

async function init() {
  // 如果域名不相等 则重定向处理
  const host = window.location.host
  if (domain !== host) {
    const urlFull = new URL(window.location.href)
    urlFull.host = domain
    window.location.href = urlFull.toString()
  }
  console.log('code', code)
  console.log('state', state)
  console.log('source', source)
  console.log('stateJson', stateJson)
  console.log('domain', domain)
  console.log('host', host)

  // 判断是否登陆还是注册
  // token存在则是绑定授权callback
  if (token) {
    const body: Auth.ReqSocialCallback = {
      code,
      source,
      state,
    }
    callback(body)
  }
  else {
    // token不存在则是登陆授权callback
    const body: Auth.ReqLoginSocialForm = {
      socialCode: code,
      socialSource: source,
      socialState: state,
    }
    login(body)
  }
}
async function callback(data: Auth.ReqSocialCallback) {
  const { success } = await socialCallback(data)
  if (success) {
    location.href = '/'
  }
}
async function login(body: Auth.ReqLoginSocialForm) {
  const { success, data } = await loginBySocialApi(body)
  if (success) {
    setToken(data)
    // 2.执行登录后的操作
    await afterLogin()
  }
}
onMounted(() => {
  nextTick(() => {
    init()
  })
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
