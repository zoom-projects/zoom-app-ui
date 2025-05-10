import type { ReqPage } from '@/api/types'

export namespace PoetryDynasty {

  export interface ReqQuery extends ReqPage {
    /**
     * 朝代名称
     */
    name?: string
    /**
     * 朝代简称
     */
    shortName?: string
  }

  export interface ReqCreate {
    /**
     * 朝代名称
     */
    name: string
    /**
     * 朝代简称
     */
    shortName: string
  }

  /**
   * 朝代信息
   */
  export interface ResDynasty {
    /**
     * 朝代ID
     */
    id: string
    /**
     * 朝代名称
     */
    name: string
    /**
     * 朝代简称
     */
    shortName: string
  }
}
