import type { ResPage } from '@/api/types'
import type { TaskManager } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  分页查询
 * @param query .
 * @returns
 */
export function page(query?: TaskManager.ReqQuery) {
  return http.get<ResPage<TaskManager.ResPage>>(`${SERVER1}/sys/task/page`, query)
}
