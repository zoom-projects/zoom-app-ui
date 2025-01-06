import type { ResPage } from '../../types'
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

/**
 *  获取用户的通知消息
 * @param data  .
 * @returns  .
 */
export function getNoticeMsg(data: Auth.ReqNoticeMsg) {
  return http.get<ResPage<Auth.ResNoticeMsg>>(`${SERVER1}/auth/user/notice/page`, data)
}

/**
 *  获取用户的通知消息数量
 * @returns  .
 */
export function getNoticeMsgCount(queryUnread?: boolean) {
  return http.get<number>(`${SERVER1}/auth/user/notice/count`, { queryUnread })
}

/**
 *  是否有未读通知消息
 * @returns .
 */
export function getNoticeMsgHasUnread() {
  return http.get<boolean>(`${SERVER1}/auth/user/notice/has_unread`)
}

/**
 *  读取通知消息
 * @param id  .
 * @returns  .
 */
export function readNoticeMsg(id: string) {
  return http.put(`${SERVER1}/auth/user/notice/read/${id}`)
}

/**
 *  读取所有通知消息
 * @returns  .
 */
export function readAllNoticeMsg() {
  return http.put(`${SERVER1}/auth/user/notice/read_all`)
}

/**
 *  删除通知消息
 * @param id  .
 * @returns  .
 */
export function removeNoticeMsg(id: string) {
  return http.delete(`${SERVER1}/auth/user/notice/del`, { id })
}

/**
 *  删除所有通知消息
 * @returns  .
 */
export function removeAllNoticeMsg() {
  return http.delete(`${SERVER1}/auth/user/notice/clear`)
}
