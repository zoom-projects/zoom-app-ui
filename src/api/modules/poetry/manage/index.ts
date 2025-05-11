import type { ResPage } from '@/api/types'
import type { PoetryInfo } from './types'

import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: PoetryInfo.ReqQuery) {
  return http.get<ResPage<PoetryInfo.ResPoetryInfo>>(`${SERVER1}/poetry/page`, query)
}

export function list(query?: PoetryInfo.ReqQuery) {
  return http.get<PoetryInfo.ResPoetryInfo[]>(`${SERVER1}/poetry/list`, query)
}

export function save(data: PoetryInfo.ReqCreate) {
  return http.post(`${SERVER1}/poetry/save`, data)
}

export function update(id: string, data: PoetryInfo.ReqCreate) {
  return http.put(`${SERVER1}/poetry/update/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/poetry/${id}`)
}
