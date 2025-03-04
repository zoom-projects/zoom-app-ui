import type { ResPage } from '@/api/types'
import type { DomainRecord } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: DomainRecord.ReqQuery) {
  return http.get<ResPage<DomainRecord.ResRecord>>(`${SERVER1}/domain/record/page`, query)
}

export function list(query?: DomainRecord.ReqQuery) {
  return http.get<DomainRecord.ResRecord[]>(`${SERVER1}/domain/record/list`, query)
}

/**
 * @description 同步云解析记录
 * @param domainId
 * @returns
 */
export function syncRecord(domainId: string) {
  return http.put(`${SERVER1}/domain/record/sync/${domainId}`)
}

/**
 *  @description 获取记录分组统计
 * @param domainId
 * @returns
 */
export function groupCount(domainId: string) {
  return http.get<DomainRecord.ResGroupCount[]>(`${SERVER1}/domain/record/count/${domainId}`)
}

export function create(data: DomainRecord.ReqCreate) {
  return http.post(`${SERVER1}/domain/record/save`, data)
}

export function update(id: string, data: DomainRecord.ReqUpdate) {
  return http.put(`${SERVER1}/domain/record/update/${id}`, data)
}

export function batchDelete(ids: string[]) {
  return http.delete(`${SERVER1}/domain/record/delete`, {}, { data: ids })
}
