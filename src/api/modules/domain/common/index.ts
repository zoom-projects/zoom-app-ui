import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 * 是否为一级域名 example.com.cn => true  www.example.com.cn => false
 * @param domain 域名
 * @returns .
 */
export function isTopDomain(domain: string) {
  return http.get<boolean>(`${SERVER1}/domain/common/isTopDomain`, { domain })
}
