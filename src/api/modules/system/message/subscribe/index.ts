import type { ResPage } from '@/api/types'
import type { SystemMessageSubscribe } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function hasCode(code: string, id?: string) {
  return http.get<boolean>(`${SERVER1}/sys/message/subscribe/has_code`, { code, id })
}

/**
 *  查询开放接口分组
 * @param query
 * @returns
 */
export function group(query?: SystemMessageSubscribe.ReqQuery) {
  return http.get<SystemMessageSubscribe.ResGroup[]>(`${SERVER1}/sys/message/subscribe/group`, query)
}

/**
 * 分页查询开放接口
 */
export function page(query?: SystemMessageSubscribe.ReqQuery) {
  return http.get<ResPage<SystemMessageSubscribe.ResPage>>(`${SERVER1}/sys/message/subscribe/page`, query)
}

export function save(data: SystemMessageSubscribe.ReqSave) {
  return http.post(`${SERVER1}/sys/message/subscribe/save`, data)
}

export function update(id: string, data: SystemMessageSubscribe.ReqUpdate) {
  return http.put(`${SERVER1}/sys/message/subscribe/update/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/sys/message/subscribe/del`, { id })
}
