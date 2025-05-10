import type { ResPage } from '@/api/types'
import type { PoetryDynasty } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: PoetryDynasty.ReqQuery) {
  return http.get<ResPage<PoetryDynasty.ResDynasty>>(`${SERVER1}/poetry/dynasty/page`, query)
}

export function list(query?: PoetryDynasty.ReqQuery) {
  return http.get<PoetryDynasty.ResDynasty[]>(`${SERVER1}/poetry/dynasty/list`, query)
}

export function save(data: PoetryDynasty.ReqCreate) {
  return http.post(`${SERVER1}/poetry/dynasty/save`, data)
}

export function update(id: string, data: PoetryDynasty.ReqCreate) {
  return http.put(`${SERVER1}/poetry/dynasty/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/poetry/dynasty/${id}`)
}
