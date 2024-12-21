import type { ResPage } from '@/api/types'
import type { NavTag } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  分页查询
 * @param query .
 * @returns
 */
export function page(query?: NavTag.ReqQuery) {
  return http.get<ResPage<NavTag.ResPage>>(`${SERVER1}/nav/tag/page`, query)
}

/**
 *  查询所有
 * @returns .
 */
export function listNames() {
  return http.get<string[]>(`${SERVER1}/nav/tag/tags`)
}

/**
 * 保存
 * @param data .
 * @returns
 */
export function save(data: NavTag.ReqForm) {
  return http.post(`${SERVER1}/nav/tag/save`, data)
}

/**
 * 更新
 * @param id .
 * @param data .
 * @returns
 */
export function update(id: string, data: NavTag.ReqForm) {
  return http.put(`${SERVER1}/nav/tag/${id}`, data)
}

/**
 * 删除
 * @param id .
 * @returns
 */
export function remove(id: string) {
  return http.delete(`${SERVER1}/nav/tag/${id}`)
}
