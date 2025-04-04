import type { ResPage } from '@/api/types'
import type { DomainAcmeAccount } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: DomainAcmeAccount.QueryReq) {
  return http.get<ResPage<DomainAcmeAccount.ResAcmeAccount>>(`${SERVER1}/domain/acme/account/page`, query)
}

export function cache() {
  return http.get<DomainAcmeAccount.ResAcmeAccount[]>(`${SERVER1}/domain/acme/account/cache`)
}

export function getCache() {
  return http.get<DomainAcmeAccount.ResAcmeAccount[]>(`${SERVER1}/domain/acme/account/cache`)
}

export function decrypt(id: string) {
  return http.get<string>(`${SERVER1}/domain/acme/account/decrypt/${id}`)
}

export function save(data: DomainAcmeAccount.ReqCreate) {
  return http.post(`${SERVER1}/domain/acme/account/save`, data)
}

export function update(id: string, data: DomainAcmeAccount.ReqUpdate) {
  return http.put(`${SERVER1}/domain/acme/account/update/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/domain/acme/account/remove/${id}`)
}
