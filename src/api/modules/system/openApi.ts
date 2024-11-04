import type { ResPage, System } from '../../types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function hasCode(code: string, id?: string) {
  return http.get<boolean>(`${SERVER1}/sys/open/api/has_code`, { code, id })
}

/**
 * 分页查询开放接口
 */
export function page(query?: System.OpenApiQuery) {
  return http.get<ResPage<System.ResOpenApi>>(`${SERVER1}/sys/open/api/page`, query)
}

export function list(query?: System.OpenApiQuery) {
  return http.get<System.ResOpenApi[]>(`${SERVER1}/sys/open/api/list`, query)
}

/**
 *  查询开放接口分组
 * @param query
 * @returns
 */
export function group(query?: System.OpenApiQuery) {
  return http.get<System.ResOpenApiGroup[]>(`${SERVER1}/sys/open/api/group`, query)
}

export function save(data: System.ReqOpenApiForm) {
  return http.post(`${SERVER1}/sys/open/api/save`, data)
}

export function update(id: string, data: System.ReqOpenApiForm) {
  return http.put(`${SERVER1}/sys/open/api/update/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/sys/open/api/del`, { id })
}
