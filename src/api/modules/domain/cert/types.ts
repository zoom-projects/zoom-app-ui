export namespace DomainCert{

  /**
   * @description 证书申请
   */
  export interface IssueReq {
    domains: string[]
    certAlgorithm: string
    email: string
    directoryType: string
  }
}
