import type { ResPage } from '@/api/types'
import type { DomainCertDeploy } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: DomainCertDeploy.QueryReq) {
  return http.get<ResPage<DomainCertDeploy.ResDeploy>>(`${SERVER1}/domain/cert/deploy/setting/page`, query)
}

export function list(query?: DomainCertDeploy.QueryReq) {
  return http.get<DomainCertDeploy.ResDeploy[]>(`${SERVER1}/domain/cert/deploy/setting/list`, query)
}

export function save(data: DomainCertDeploy.ReqDeploy) {
  return http.post<DomainCertDeploy.ResDeploy>(`${SERVER1}/domain/cert/deploy/setting/save`, data)
}

export function update(id: string, data: DomainCertDeploy.ReqDeploy) {
  return http.put<DomainCertDeploy.ResDeploy>(`${SERVER1}/domain/cert/deploy/setting/update/${id}`, data)
}

export function remove(id: string) {
  return http.delete(`${SERVER1}/domain/cert/deploy/setting/delete/${id}`)
}
