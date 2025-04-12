import type { ResPage } from '@/api/types'
import type { DomainNotify } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: DomainNotify.ReqQuery) {
  return http.get<ResPage<DomainNotify.ResNotify>>(`${SERVER1}/domain/notify/page`, query)
}

export function list(query?: DomainNotify.ReqQuery) {
  return http.get<DomainNotify.ResNotify[]>(`${SERVER1}/domain/notify/list`, query)
}

export function save(data: DomainNotify.ReqNotify) {
  return http.post(`${SERVER1}/domain/notify/save`, data)
}
export function update(id: string, data: DomainNotify.ReqNotify) {
  return http.put(`${SERVER1}/domain/notify/update/${id}`, data)
}
export function remove(id: string) {
  return http.delete(`${SERVER1}/domain/notify/delete/${id}`)
}
