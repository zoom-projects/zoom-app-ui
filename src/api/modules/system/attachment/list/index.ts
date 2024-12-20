import type { ResPage } from '@/api/types'
import type { AttachmentList } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  分页查询
 * @param query .
 * @returns
 */
export function page(query?: AttachmentList.ReqQuery) {
  return http.get<ResPage<AttachmentList.ResPage>>(`${SERVER1}/sys/attachment/list/page`, query)
}

/**
 * 删除
 * @param id .
 */
export function remove(id: string) {
  return http.delete(`${SERVER1}/sys/attachment/list/${id}`)
}
