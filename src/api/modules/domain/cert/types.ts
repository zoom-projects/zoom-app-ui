import type { ReqPage } from '@/api/types'

export namespace DomainCert{

  export interface QueryReq extends ReqPage {
    domains?: string
    status?: string

  }

  /**
   * @description 证书申请
   */
  export interface IssueReq {
    domains: string[]
    certAlgorithm: string
    email: string
    directoryType: string
  }

  /**
   * @description 证书申请 信息
   */
  export interface ResIssue {
    id: string
    domains: string
    certAlgorithm: string
    acmeAccount: string
    ca: string
    autoChallenge: boolean
    status: string
    orderId: string
    issueTime: string
    expireTime: string
    totalDays: number
    fileUrl: string
    step: number
    created: string
    createdBy: string
  }

  /**
   * @description 证书申请 challenge 信息
   */
  export interface ResChallenge {
    id: string
    domain: string
    rootDomain: string
    subDomain: string
    issueId: string
    domainId?: string
    recordId?: string
    url: string
    type: string // DNS-01 HTTP-01
    status: string
    recordName: string
    token: string
    value: string
  }
}
