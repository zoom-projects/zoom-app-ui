import type { ResPage } from '@/api/types'
import type { PoetryRhythmic } from './types'
import http from '@/api'

import { SERVER1 } from '@/api/config/server'

export function page(query?: PoetryRhythmic.ResQuery) {
  return http.get<ResPage<PoetryRhythmic.ResRhythmic>>(`${SERVER1}/poetry/rhythmic/page`, query)
}
export function list(query?: PoetryRhythmic.ResQuery) {
  return http.get<PoetryRhythmic.ResRhythmic[]>(`${SERVER1}/poetry/rhythmic/list`, query)
}
export function save(data: PoetryRhythmic.ResCreate) {
  return http.post(`${SERVER1}/poetry/rhythmic/save`, data)
}
export function update(id: string, data: PoetryRhythmic.ResCreate) {
  return http.put(`${SERVER1}/poetry/rhythmic/${id}`, data)
}
export function remove(id: string) {
  return http.delete(`${SERVER1}/poetry/rhythmic/${id}`)
}
