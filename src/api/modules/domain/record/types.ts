import type { ReqPage } from '@/api/types'

export namespace DomainRecord {

  export interface ReqQuery extends ReqPage {
    domainId?: string
    recordId?: string
    type?: string
    name?: string
    value?: string
    line?: string
    status?: boolean
    proxyStatus?: boolean
  }

  export interface ResRecord {
    id: string
    domainId: string
    domain: string
    cloud: string
    recordId: string
    type: string
    name: string
    value: string
    ttl: number
    line: string
    status: boolean
    proxyStatus: boolean
  }

  export interface ReqCreate {
    domainId: string
    type: string
    name: string
    value: string
    ttl?: number
    line?: string
    remark?: string
    status: boolean
    proxyStatus: boolean
  }

  export interface ReqUpdate {
    id: string
    type: string
    name: string
    value: string
    ttl: number
    line: string
    status: boolean
    proxyStatus: boolean
  }

  export interface ResGroupCount {
    type: string
    count: number
  }
}
