import type { System } from '../../types'
import http from '@/api'
import { SERVER1 } from '../../config/server'

/**
 *  菜单树
 * @returns .
 */
export function tree(query?: System.PermissionTreeQuery) {
  return http.get<System.PermissionTree[]>(`${SERVER1}/sys/permission/tree`, query)
}

/**
 *  列表查询
 *
 * @param query
 * @returns
 */
export function list(query?: System.PermissionQuery) {
  return http.get<any>(`${SERVER1}/sys/permission/list`, query)
}

/**
 * 保持权限
 * @param data .
 * @returns .
 */
export function save(data: System.ReqPermissionForm) {
  return http.post<string>(`${SERVER1}/sys/permission/save`, data)
}

/**
 *  删除权限
 * @param id  .
 * @returns
 */
export function del(id: string) {
  return http.delete<string>(`${SERVER1}/sys/permission/del`, { id })
}

/**
 *  更新权限
 * @param id .
 * @param data .
 * @returns  .
 */
export function update(id: string, data: System.ReqPermissionForm) {
  return http.put<string>(`${SERVER1}/sys/permission/update/${id}`, data, { loading: false })
}
