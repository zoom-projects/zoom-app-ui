import type { NavWebsiteSetting } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 * 查询
 * @returns
 */
export function getInfo() {
  return http.get<NavWebsiteSetting.ResWebsiteSetting>(`${SERVER1}/nav/website/setting/`)
}

/**
 * 更新
 * @param data .
 * @returns
 */
export function update(id: string, data: NavWebsiteSetting.ReqUpdateSettingForm) {
  return http.put(`${SERVER1}/nav/website/setting/${id}`, data)
}
