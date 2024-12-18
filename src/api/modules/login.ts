import type { Auth, ResPage } from '../types'
import http from '@/api'
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

export async function loginBySocialApi(params: Auth.ReqLoginSocialForm) {
  return http.post<string>(`${SERVER1}/auth/login/social`, params)
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

// 获取用户访问令牌
export function getUserAccessTokenApi(params: Auth.ReqAccessToken) {
  return http.get <ResPage<Auth.ResAccessToken>>(`${SERVER1}/auth/user/access_token`, params)
}

export function createAccessTokenApi(data: Auth.ReqCreateAccessTokenForm) {
  return http.post<string>(`${SERVER1}/auth/user/access_token`, data)
}

export function cancelAccessTokenApi(id: string) {
  return http.put(`${SERVER1}/auth/user/access_token/cancel/${id}`)
}

export function restoreAccessTokenApi(id: string) {
  return http.put(`${SERVER1}/auth/user/access_token/restore/${id}`)
}

export function removeAccessTokenApi(id: string) {
  return http.delete(`${SERVER1}/auth/user/access_token/delete/${id}`)
}

export function getUserSetttings() {
  return http.get(`${SERVER1}/auth/user/settings`)
}

export function updateUserSettings(data: any) {
  return http.put(`${SERVER1}/auth/user/settings`, data)
}
/**
 *  绑定社交账号
 * @param source .
 * @returns .
 */
export function authBindSocial(source: string) {
  return http.get<string>(`${SERVER1}/auth/social/${source}`, {
    domain: window.location.host,
  })
}

/**
 * 社交账号回调
 * @param data
 * @returns
 */
export function socialCallback(data: Auth.ReqSocialCallback) {
  return http.post(`${SERVER1}/auth/social/callback/${data.source}`, data)
}

/**
 *
 * 解除社交账号绑定
 * @param source
 * @returns
 */
export function authUnLockSocial(source: string) {
  return http.delete(`${SERVER1}/auth/social/unbind/${source}`)
}

/**
 * 获取已绑定的社交账号
 * @returns
 */
export function getSocialBind() {
  return http.get<string[]>(`${SERVER1}/auth/social/bind`)
}
