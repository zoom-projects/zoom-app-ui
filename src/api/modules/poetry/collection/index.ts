import type { ResPage } from '@/api/types'
import type { PoetryCollection } from './types'
import http from '@/api'

import { SERVER1 } from '@/api/config/server'

export function page(query?: PoetryCollection.ReqQuery) {
  return http.get<ResPage<PoetryCollection.ResCollection>>(`${SERVER1}/poetry/collection/page`, query)
}

export function list(query?: PoetryCollection.ReqQuery) {
  return http.get<PoetryCollection.ResCollection[]>(`${SERVER1}/poetry/collection/list`, query)
}

export function save(data: PoetryCollection.ReqCreate) {
  return http.post(`${SERVER1}/poetry/collection/save`, data)
}

export function update(id: string, data: PoetryCollection.ReqCreate) {
  return http.put(`${SERVER1}/poetry/collection/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/poetry/collection/${id}`)
}
