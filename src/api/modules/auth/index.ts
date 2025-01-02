import type { Auth } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  获取用户的订阅消息
 * @returns .
 */
export function getSubscribeMsg() {
  return http.get<Auth.ResSubscribeMsg[]>(`${SERVER1}/auth/user/subscribe_msg`)
}

/**
 *  更新用户的订阅消息
 * @param data  .
 * @returns  .
 */
export function updateSubscribeMsg(data: Auth.ReqSubscribeMsg) {
  return http.put(`${SERVER1}/auth/user/subscribe_msg`, data)
}
