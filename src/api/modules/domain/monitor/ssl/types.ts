import type { ReqPage } from '@/api/types'

export namespace DomainMonitorSSL{

  /**
   * 查询
   */
  export interface ReqQuery extends ReqPage {
    domain?: string
    isMonitor?: boolean
    isRemind?: boolean
    sslType?: string
    expireDay?: number
  }

  export interface ResDomainMonitorSSL {
    /**
     * id
     */
    id: string
    /**
     * 域名
     */
    domain: string
    /**
     * 端口
     */
    port: number
    /**
     * 证书开始时间
     */
    startTime: string
    /**
     * 证书结束时间
     */
    expireTime: string
    /**
     * 证书剩余天数
     */
    expireDays: number
    /**
     * 是否监控
     */
    isMonitor: boolean
    /**
     * 是否提醒
     */
    isRemind: boolean
    /**
     * 加密类型 SSL/TLS
     */
    sslType: string
    /**
     * 证书总天数
     */
    totalDays: number
    /**
     * 更新时间
     */
    updateTime: string
    /**
     *  更新时间标签
     */
    updateTimeLabel: string
    /**
     * 创建者
     */
    createdBy: string
    /**
     * 创建时间
     */
    created: string
    /**
     * 是否错误
     */
    fetchError: boolean
    /**
     * 错误信息
     */
    errorMessage: string
  }

  export interface ReqCreate {
    domain: string
    port: number
    startTime: string
    expireTime: string
    isMonitor: boolean
    isRemind: boolean
    sslType: string
  }
}
