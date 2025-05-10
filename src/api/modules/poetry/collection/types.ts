import type { ReqPage } from '@/api/types'

export namespace PoetryCollection {

  export interface ReqQuery extends ReqPage {
    /**
     * 收藏夹名称
     */
    name?: string
    /**
     * 收藏夹描述
     */
    note?: string
  }

  export interface ReqCreate {
    /**
     * 收藏夹名称
     */
    name: string
    /**
     * 收藏夹描述
     */
    note: string
  }

  export interface ResCollection {

    /**
     * 收藏夹ID
     */
    id: string
    /**
     * 收藏夹名称
     */
    name: string
    /**
     * 收藏夹描述
     */
    note: string
  }
}
