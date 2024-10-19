import type { Auth } from '../types'
import http from '@/api'
import authMenuList from '@/mock/data/authMenuList.json'
import { SERVER1 } from '../config/server'
import { random } from '/src/utils'
import { AES, SHA, str2Hex } from '/src/utils/crypto'

/**
 *  用户名登录
 * @param params .
 */
export async function loginApiByUsernameApi(params: Auth.ReqLoginForm) {
  const timestamp = new Date().getTime()
  const iv = random(16)
  const _key = await SHA.has256Hex(iv + timestamp)
  const _iv = await str2Hex(iv)
  const data = await AES.encryptHex(params.password, _key, _iv)
  return http.post<string>(`${SERVER1}/auth/login/password`, {
    username: params.username,
    password: data,
    captchaKey: iv,
    timestamp,
  }, { loading: false })
}

/**
 *  手机号登录
 * @param params .
 */
export async function loginApiByPhoneApi(params: Auth.ReqLoginPhoneForm) {
  const timestamp = new Date().getTime()
  const iv = random(16)
  const _key = await SHA.has256Hex(iv + timestamp)
  const _iv = await str2Hex(iv)
  const data = await AES.encryptHex(params.phone, _key, _iv)
  return http.post<string>(`${SERVER1}/auth/login/mobile`, {
    phone: data,
    captchaCode: params.code,
    captchaKey: iv,
    timestamp,
  }, { loading: false })
}

/**
 *  获取验证码
 * @param type  mobile | email
 * @param account 手机号或邮箱
 * @returns .
 */
export async function getCaptchaCode(type: string, account: string) {
  const timestamp = new Date().getTime()
  const iv = random(16)
  const _key = await SHA.has256Hex(iv + timestamp)
  const _iv = await str2Hex(iv)
  const data = await AES.encryptHex(account, _key, _iv)
  return http.post<string>(`${SERVER1}/auth/captcha/${type}`, {
    value: data,
    captchaKey: iv,
    timestamp,
  })
}

/**
 *  登出
 * @returns
 */
export async function logoutApi() {
  return http.post(`${SERVER1}/auth/logout`, {}, { loading: false })
}

/**
 *  获取当前用户信息
 * @returns
 */
export function getCurrentUserInfoApi() {
  return http.get(`${SERVER1}/auth/user`, {}, { loading: false })
}

/**
 * 重置密码
 * @returns
 */
export async function resetPasswordApi(data: Auth.ReqRestPasswordForm) {
  const timestamp = new Date().getTime()
  const iv = random(16)
  const _key = await SHA.has256Hex(iv + timestamp)
  const _iv = await str2Hex(iv)
  const oldPassword = await AES.encryptHex(data.oldPassword, _key, _iv)
  const newPassword = await AES.encryptHex(data.newPassword, _key, _iv)

  return http.put<string>(`${SERVER1}/auth/user/reset_password`, {
    oldPassword,
    newPassword,
    captchaKey: iv,
    timestamp,
  }, { loading: false })
}

// 获取菜单列表
export function getAuthMenuListApi() {
  // return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { loading: false });
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
  return http.get<any>(`${SERVER1}/auth/menu`, {})
  // return http.get<any>(`${SERVER1}/auth/menu`, {}).then(() => authMenuList)
}
