import { ReqPage } from "@/api/types";

export namespace DomainCertDeploy{

  export interface QueryReq extends ReqPage {

  }

  export interface ResDeploy {
    id: string
    label: string
    deployType: string
    cdnAccountId: string
    host: string
    port: number
    username: string
    password: string
    privateKey: string
    sshLoginType: string
    execCmd: string
    deployPath: string
    remark: string
  }
}
