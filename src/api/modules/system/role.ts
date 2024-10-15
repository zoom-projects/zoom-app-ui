import type { ResPage, System } from '../../types'
import http from '@/api'
import { SERVER1 } from '../../config/server'

/**
 *  code是否存在
 * @param code .
 * @param id .
 * @returns .
 */
export function hasCode(code: string, id?: string) {
  return http.get<boolean>(`${SERVER1}/sys/role/has_code`, { code, id })
}
/**
 *  分页查询
 * @param params .
 * @returns .
 */
export function page(params?: System.RoleQuery) {
  return http.get<ResPage<System.ResRole>>(`${SERVER1}/sys/role/page`, params, { loading: false })
}

/**
 *  列表查询
 * @param params
 * @returns
 */
export function list(params?: System.RoleQuery) {
  return http.get<System.ResRole[]>(`${SERVER1}/sys/role/list`, params, { loading: false })
}

/**
 * 保持
 * @param params  .
 * @returns .
 */
export function save(params: System.ReqRoleForm) {
  return http.post<string>(`${SERVER1}/sys/role/save`, params, { loading: false })
}

/**
 * 更新
 * @param params .
 * @returns .
 */
export function update(id: string, params: System.ReqRoleForm) {
  return http.put<string>(`${SERVER1}/sys/role/update/${id}`, params, { loading: false })
}

/**
 * 删除
 * @param id .
 * @returns .
 */
export function delById(id: string) {
  return http.delete<string>(`${SERVER1}/sys/role/del`, { id })
}

/**
 *  获取角色权限
 * @param id .
 * @returns .
 */
export function getPerms(id: string) {
  return http.get<string[]>(`${SERVER1}/sys/role/perms`, { id })
}

/**
 *  保存角色权限
 * @param id .
 * @param perms .
 * @returns .
 */
export function savePerms(id: string, perms: string[]) {
  return http.put<string>(`${SERVER1}/sys/role/perms/${id}`, perms)
}
