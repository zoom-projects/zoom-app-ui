import type { ResPage } from '@/api/types'
import type { NavWebsites } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  通过网站链接获取网站LOGO
 * @param url  .
 * @returns
 */
export function findWebsiteFavicon(url: string) {
  return http.get<string>(`${SERVER1}/nav/websites/favicon`, { url })
}

/**
 *  分页查询
 * @param query .
 * @returns
 */
export function page(query?: NavWebsites.ReqQuery) {
  return http.get<ResPage<NavWebsites.ResPage>>(`${SERVER1}/nav/websites/page`, query)
}

/**
 * 保存
 * @param data .
 * @returns
 */
export function save(data: NavWebsites.ReqForm) {
  return http.post(`${SERVER1}/nav/websites/save`, data)
}

/**
 * 更新
 * @param id .
 * @param data .
 * @returns
 */
export function update(id: string, data: NavWebsites.ReqForm) {
  return http.put(`${SERVER1}/nav/websites/${id}`, data)
}

/**
 * 删除
 * @param id .
 * @returns
 */
export function remove(id: string) {
  return http.delete(`${SERVER1}/nav/websites/${id}`)
}
