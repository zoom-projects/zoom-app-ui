import type { ResPage } from '@/api/types'
import type { NavCategory } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  分页查询
 * @param query .
 * @returns
 */
export function page(query?: NavCategory.ReqQuery) {
  return http.get<ResPage<NavCategory.ResNavCategory>>(`${SERVER1}/nav/category/page`, query)
}

/**
 * 查询所有
 * @returns
 */
export function list(query?: NavCategory.ReqQuery) {
  return http.get<NavCategory.ResNavCategory[]>(`${SERVER1}/nav/category/list`, query)
}

/**
 * 保存
 * @param data .
 * @returns
 */
export function save(data: NavCategory.ReqCreateNavCategoryForm) {
  return http.post(`${SERVER1}/nav/category/save`, data)
}

/**
 * 更新
 * @param id .
 * @param data .
 * @returns
 */
export function update(id: string, data: NavCategory.ReqUpdateNavCategoryForm) {
  return http.put(`${SERVER1}/nav/category/${id}`, data)
}

/**
 * 删除
 * @param id .
 * @returns
 */
export function remove(id: string) {
  return http.delete(`${SERVER1}/nav/category/${id}`)
}
