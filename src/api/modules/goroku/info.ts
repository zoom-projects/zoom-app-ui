import type { ResPage } from '../../types'
import type { Goroku } from '../../types/goroku'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: Goroku.GorokuInfoQuery) {
  return http.get<ResPage<Goroku.ResGorokuInfo>>(`${SERVER1}/goroku/info/page`, query)
}

export function list(query?: Goroku.GorokuInfoQuery) {
  return http.get(`${SERVER1}/goroku/info/list`, query)
}

export function save(data: Goroku.ReqGorokuInfo) {
  return http.post(`${SERVER1}/goroku/info/save`, data)
}

export function update(id: string, data: Goroku.ReqGorokuInfo) {
  return http.put(`${SERVER1}/goroku/info/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/goroku/info/delete`, { id })
}

export function audit(data: Goroku.ReqGorokuAudit) {
  return http.put(`${SERVER1}/goroku/info/audit`, data)
}
