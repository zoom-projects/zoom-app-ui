import type { ResPage } from '/src/api/types'
import type { DomainMonitorSSL } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: DomainMonitorSSL.ReqQuery) {
  return http.get<ResPage<DomainMonitorSSL.ResDomainMonitorSSL>>(`${SERVER1}/domain/cert/monitor/page`, query)
}

export function list(query?: DomainMonitorSSL.ReqQuery) {
  return http.get<DomainMonitorSSL.ResDomainMonitorSSL[]>(`${SERVER1}/domain/cert/monitor/list`, query)
}

export function isMonitor(domain: string) {
  return http.get<boolean>(`${SERVER1}/domain/cert/monitor/isMonitor`,{domain})
}

export function save(data: DomainMonitorSSL.ReqCreate) {
  return http.post(`${SERVER1}/domain/cert/monitor/save`, data)
}

export function update(id: string, data: DomainMonitorSSL.ReqCreate) {
  return http.put(`${SERVER1}/domain/cert/monitor/update/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/domain/cert/monitor/delete/${id}`)
}


export function refreshExpireTime(id: string) {
  return http.put(`${SERVER1}/domain/cert/monitor/refreshExpireTime/${id}`)
}
