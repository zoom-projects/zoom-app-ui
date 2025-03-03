import type { ReqPage } from '@/api/types'

export namespace DomainInfo {

  export interface ReqQuery extends ReqPage {
    domain?: string
    cloud?: string
    accountId?: string
  }

  export interface ResDomain {
    /**
     * id
     */
    id: string
    /**
     * 域名
     */
    domain: string
    /**
     * 平台
     */
    cloud: string
    /**
     * 账号id
     */
    accountId: string
    /**
     * 账号名称
     */
    accountLabel: string
    /**
     * 过期时间
     */
    expireTime?: string
    /**
     * 过期时间-天数
     */
    expireDays?: number
    /**
     * 区域
     */
    zoneId?: string
    /**
     * 续费链接
     */
    renewLink?: string
    /**
     * 创建者
     */
    createdBy: string
    /**
     * 创建时间
     */
    created: string
  }

  export interface ReqChangeExpireTime {
    expireTime: string
    renewLink?: string
  }

  export interface ReqCreateDomainForm {
    domain: string
    cloud: string
    accountId: string
    expireDays?: number
    zoneId?: string
    renewLink?: string
  }
}
