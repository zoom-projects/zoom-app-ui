import type { ReqPage } from '@/api/types'

export namespace DomainAccount{

  export interface ReqQuery extends ReqPage {
    label?: string
    platform?: string
  }

  export interface ResAccount {
    /**
     * id
     */
    id: string
    /**
     * 标签
     */
    label: string
    /**
     * 平台
     */
    platform: string
    /**
     * 账号
     */
    account: string
    /**
     * 密码
     */
    password: string
    /**
     * 邮箱
     */
    email?: string
    /**
     * 创建者
     */
    createdBy: string
    /**
     * 创建时间
     */
    created: string
  }

  export interface ReqCreateAccountForm {
    label: string
    platform: string
    account: string
    password: string
  }

  export interface ReqUpdateAccountForm {
    id: string
    label: string
    platform: string
    account: string
    password: string
  }

  export interface ReqDeleteAccountForm {
    id: string
  }
}
