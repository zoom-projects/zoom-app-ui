import type { ResPage } from '@/api/types'
import type { DomainCert } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *
 * @description 详情
 * @param id
 * @returns
 */
export function getInfo(id: string) {
  return http.get<DomainCert.ResIssue>(`${SERVER1}/domain/cert/issue/${id}`)
}
/**
 *
 * @description 分页
 * @param query .
 * @returns .
 */
export function page(query?: DomainCert.QueryReq) {
  return http.get<ResPage<DomainCert.ResIssue>>(`${SERVER1}/domain/cert/issue/page`, query)
}
/**
 *  证书申请
 * @param data  .
 * @returns
 */
export function issue(data: DomainCert.IssueReq) {
  return http.post<DomainCert.ResIssue>(`${SERVER1}/domain/cert/issue/`, data)
}

export function getChallenges(issueId: string) {
  return http.get<DomainCert.ResChallenge[]>(`${SERVER1}/domain/cert/issue/${issueId}/challenge`)
}

/**
 * @description 触发挑战
 * @param id
 * @param challengeType
 */
export function triggerChallenge(id: string, challengeType: string) {
  return http.put(`${SERVER1}/domain/cert/issue/${id}/challenge`, {
  }, {
    params: {
      challengeType,
    },
  })
}

/**
 * @description 删除 证书申请
 * @param id
 * @returns
 */
export function remove(id: string) {
  return http.delete(`${SERVER1}/domain/cert/issue/${id}`)
}
