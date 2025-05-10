import type { ReqPage } from '@/api/types'

export namespace PoetryRhythmic {

  export interface ResQuery extends ReqPage {
    /**
     * 韵律名称
     */
    name?: string
    /**
     * 描述
     */
    notes?: string
  }

  export interface ResCreate {
    /**
     * 韵律名称
     */
    name: string
    /**
     * 描述
     */
    note?: string
  }

  /**
   * 词牌/韵律列表
   */
  export interface ResRhythmic {
    /**
     * 韵律ID
     */
    id: string
    /**
     * 韵律名称
     */
    name: string
    /**
     * 描述
     */
    notes?: string[]
  }
}
