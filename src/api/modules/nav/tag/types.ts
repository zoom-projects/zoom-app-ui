import type { ReqPage } from '@/api/types'

export namespace NavTag{
  /**
   * 查询参数
   */
  export interface ReqQuery extends ReqPage {
    name?: string
  }
  /**
   * 返回参数
   */
  export interface ResPage {
    id: string
    name: string
  }

  /**
   * 保存参数
   */
  export interface ReqForm {
    name: string
  }
}
