import type { ReqPage } from '@/api/types'

export namespace TaskManager{
  export interface ReqQuery extends ReqPage {
    taskName?: string
    taskType?: string
    taskStatus?: string
  }

  export interface ResPage {
    id: string
    taskName: string
    taskType: string
    taskStatus: string
    taskDesc: string
    createTime: string
  }
}
