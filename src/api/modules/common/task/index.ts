import type { Task } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  请求导出任务
 * @param body
 * @returns
 */
export function exp(body: Task.ReqExp) {
  return http.post<string>(`${SERVER1}/sys/common/task/exp`, body)
}

/**
 *  请求导入任务
 * @param data {file:File,bizApp:string,taskType:string}
 * @returns
 */
export function imp(data: FormData) {
  return http.post<string>(`${SERVER1}/sys/common/task/imp`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
