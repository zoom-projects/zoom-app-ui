import type { ResPage } from '@/api/types'
import type { DomainCdnAccount } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: DomainCdnAccount.QueryReq) {
  return http.get<ResPage<DomainCdnAccount.ResAccount>>(`${SERVER1}/domain/cdn/account/page`, query)
}

export function list(query?: DomainCdnAccount.QueryReq) {
  return http.get<DomainCdnAccount.ResAccount[]>(`${SERVER1}/domain/cdn/account/list`, query)
}

export function save(data: DomainCdnAccount.ReqAccount) {
  return http.post<DomainCdnAccount.ResAccount>(`${SERVER1}/domain/cdn/account/save`, data)
}

export function update(id: string, data: DomainCdnAccount.ReqAccount) {
  return http.put<DomainCdnAccount.ResAccount>(`${SERVER1}/domain/cdn/account/update/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/domain/cdn/account/delete/${id}`)
}
