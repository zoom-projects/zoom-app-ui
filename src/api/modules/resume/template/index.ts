import type { ResPage } from '@/api/types'
import type { ResumeTemplate } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

export function page(query?: ResumeTemplate.ReqQuery) {
  return http.get<ResPage<ResumeTemplate.ResResumeTemplate>>(`${SERVER1}/resume/template/page`, query)
}

export function queryPublished(query?: ResumeTemplate.ReqQuery) {
  if (query) {
    query.published = true
  }
  return http.get<ResumeTemplate.ResResumeTemplate[]>(`${SERVER1}/resume/template/published`, query)
}

export function queryById(id: string) {
  return http.get<ResumeTemplate.ResResumeTemplate>(`${SERVER1}/resume/template/${id}`)
}

export function saveDraft(data: ResumeTemplate.SaveDraftRequest) {
  return http.post<ResumeTemplate.ResResumeTemplate>(`${SERVER1}/resume/template/draft`, data)
}
