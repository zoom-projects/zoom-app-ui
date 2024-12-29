export namespace Task{

  export interface ReqExp {
    /**
     * 任务类型
     */
    type: string
    /**
     * 批次号
     */
    lotNo?: string
    /**
     * 业务系统 一般为JOB应用名：zoom-goroku-job 语录job应用
     */
    appName: string
    /**
     * 文件名
     */
    ossFileName?: string
    /**
     * 请求参数
     */
    param?: Record<string, any>
  }
}
