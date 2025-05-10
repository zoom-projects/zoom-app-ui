import type { ResPage } from '@/api/types'
import type { PoetryAuthor } from './types'
import http from '@/api'

import { SERVER1 } from '@/api/config/server'

export function page(query?: PoetryAuthor.ReqQuery) {
  return http.get<ResPage<PoetryAuthor.ResAuthor>>(`${SERVER1}/poetry/author/page`, query)
}

export function list(query?: PoetryAuthor.ReqQuery) {
  return http.get<PoetryAuthor.ResAuthor[]>(`${SERVER1}/poetry/author/list`, query)
}

export function save(data: PoetryAuthor.ReqCreate) {
  return http.post(`${SERVER1}/poetry/author/save`, data)
}

export function update(id: string, data: PoetryAuthor.ReqCreate) {
  return http.put(`${SERVER1}/poetry/author/${id}`, data)
}
export function remove(id: string) {
  return http.delete(`${SERVER1}/poetry/author/${id}`)
}
