import { ReqPage } from "@/api/types";

export namespace DomainCdnAccount {

  export interface QueryReq  extends ReqPage{

  }

  export interface ReqAccount {
    
    label: string
    provider: string
    account: string
    password?: string
    email?: string
    remark?: string
  }

  export interface ResAccount {
    id: string
    label: string
    provider: string
    account: string
    password: string
    email: string
    remark: string
  }
}
