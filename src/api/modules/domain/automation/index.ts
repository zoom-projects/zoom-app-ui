import type { ResPage } from '@/api/types'
import type { DomainAutomationSetting } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: DomainAutomationSetting.ReqQuery) {
  return http.get<ResPage<DomainAutomationSetting.ResAutomationSetting>>(`${SERVER1}/domain/automation/deploy/setting/page`, query)
}

export function list(query?: DomainAutomationSetting.ReqQuery) {
  return http.get<DomainAutomationSetting.ResAutomationSetting[]>(`${SERVER1}/domain/automation/deploy/setting/list`, query)
}

export function save(data: DomainAutomationSetting.ReqAutomationSetting) {
  return http.post(`${SERVER1}/domain/automation/deploy/setting/save`, data)
}

export function update(id: string, data: DomainAutomationSetting.ReqAutomationSetting) {
  return http.put(`${SERVER1}/domain/automation/deploy/setting/update/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/domain/automation/deploy/setting/delete/${id}`)
}
