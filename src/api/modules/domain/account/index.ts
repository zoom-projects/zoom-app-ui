import type { ResPage } from '@/api/types'
import type { DomainAccount } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  分页查询
 * @param query  查询条件
 * @returns .
 */
export function page(query?: DomainAccount.ReqQuery) {
  return http.get<ResPage<DomainAccount.ResAccount>>(`${SERVER1}/domain/account/page`, query)
}

export function list(query?: DomainAccount.ReqQuery) {
  return http.get<DomainAccount.ResAccount[]>(`${SERVER1}/domain/account/list`, query)
}

/**
 *  新增
 * @param form  新增表单
 * @returns .
 */
export function create(form: DomainAccount.ReqCreateAccountForm) {
  return http.post(`${SERVER1}/domain/account/save`, form)
}

/**
 *  更新
 * @param id  id
 * @param form  更新表单
 * @returns .
 */
export function update(id: string, form: DomainAccount.ReqUpdateAccountForm) {
  return http.put(`${SERVER1}/domain/account/update/${id}`, form)
}

/**
 *  删除
 * @param form  删除表单
 * @returns .
 */
export function remove(id: string) {
  return http.delete(`${SERVER1}/domain/account/delete/${id}`)
}
