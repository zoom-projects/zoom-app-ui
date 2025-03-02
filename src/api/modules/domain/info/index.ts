import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  刷新账号下的所有域名
 * @param accountId 账号id
 * @returns .
 */
export function refresh(accountId: string) {
  return http.post<string>(`${SERVER1}/domain/list/refresh/${accountId}`)
}
