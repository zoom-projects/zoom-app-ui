import type { ReqPage } from '@/api/types'

export namespace DomainAcmeAccount {

  /**
   * 查询
   */
  export interface QueryReq extends ReqPage {
    email?: string
  }

  export interface ResAcmeAccount {
    /**
     * id
     */
    id: string
    /**
     * 邮箱
     */
    email: string
  }

  export interface ReqCreate {
    email: string
  }

  export interface ReqUpdate {
    email: string
  }

}
