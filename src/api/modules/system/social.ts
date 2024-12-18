import http from '@/api'
import { SERVER1 } from '@/api/config/server'
/**
 *  绑定社交账号
 * @param source .
 * @returns .
 */
export function authBindSocial(source: string) {
  return http.get<string>(`${SERVER1}/auth/social/${source}`, {
    domain: window.location.host,
  })
}
