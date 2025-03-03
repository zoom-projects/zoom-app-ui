import type { ResPage } from '@/api/types'
import type { DomainInfo } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  刷新账号下的所有域名
 * @param accountId 账号id
 * @returns .
 */
export function refresh(accountId: string) {
  return http.post<string>(`${SERVER1}/domain/list/refresh/${accountId}`)
}

/**
 * 查询账号下的所有域名
 * @param accountId  账号id
 * @returns  .
 */
export function domainsByAccountId(accountId: string) {
  return http.get<string[]>(`${SERVER1}/domain/list/domains/${accountId}`)
}

/**
 * 分页查询
 * @param query .
 * @returns .
 */
export function page(query?: DomainInfo.ReqQuery) {
  return http.get<ResPage<DomainInfo.ResDomain>>(`${SERVER1}/domain/list/page`, query)
}

/**
 *  列表查询
 * @param query .
 * @returns .
 */
export function list(query?: DomainInfo.ReqQuery) {
  return http.get<DomainInfo.ResDomain[]>(`${SERVER1}/domain/list/list`, query)
}

/**
 * 域名是否存在
 *
 * @param domain .
 * @returns .
 */
export function domainExist(domain: string) {
  return http.get<boolean>(`${SERVER1}/domain/list/exist/${domain}`)
}

/**
 *  创建
 * @param data .
 * @returns .
 */
export function create(data: DomainInfo.ReqCreateDomainForm) {
  return http.post(`${SERVER1}/domain/list/save`, data)
}

/**
 *  删除
 * @param id
 * @returns
 */
export function remove(id: string) {
  return http.delete(`${SERVER1}/domain/list/delete/${id}`)
}

/**
 * 修改过期时间
 * @param id .
 * @param data .
 * @returns .
 */
export function changeExpireTime(id: string, data: DomainInfo.ReqChangeExpireTime) {
  return http.put(`${SERVER1}/domain/list/expire/${id}`, data)
}
