import type { ReqPage } from '@/api/types'

export namespace DomainAutomationSetting {

  export interface ReqQuery extends ReqPage {}

  export interface ResAutomationSetting {
    /**
     * id
     */
    id: string
    /**
     * 域名
     */
    domain: string
    domainList: {
      domain: string
      record: string
    }[]
    /**
     * 证书厂商
     */
    ca: string
    /**
     * acme账号
     */
    acmeAccountId: string
    /**
     * 加密算法
     */
    certAlgorithm: string
    /**
     * 部署方式
     */
    deploySettingId: string

    enabled: boolean

    /**
     * 上一次执行时间
     */
    lastExecTime: string

    /**
     * 创建时间
     */
    created: string
  }

  export interface ReqAutomationSetting {
    domainList: {
      domain: string
      record: string
    }[]

    /**
     * 证书厂商
     */
    ca: string

    /**
     * acme账号
     */
    acmeAccountId: string

    /**
     * 加密算法
     */
    certAlgorithm: string

    /**
     * 部署方式
     */
    deploySettingId: string
    /**
     * 是否启用
     */
    enabled: boolean
    /**
     * 备注
     */
    remark: string
  }
}
