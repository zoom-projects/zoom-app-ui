import type { ReqPage } from '.'

export namespace Goroku{
  export interface GorokuInfoQuery extends ReqPage {
    goroku?: string
    type?: string
    form?: string
    formWho?: string
    auditStatus?: number
    auditor?: string
  }

  export interface ResGorokuInfo {
    id: string
    goroku: string
    type: string
    form: string
    formWho: string
    auditStatus: number
    auditor: string
    createdBy: string
    created: string
  }

  export interface ReqGorokuInfo {
    goroku: string
    type: string
    form?: string
    formWho?: string
  }

  export interface ReqGorokuAudit {
    ids: string[]
    auditStatus: number
    auditReason: string
  }

}
