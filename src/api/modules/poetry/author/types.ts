import type { ReqPage } from '@/api/types'
import type { PoetryDynasty } from '../dynasty/types'

export namespace PoetryAuthor {

  export interface ReqQuery extends ReqPage {
    /**
     * 诗人姓名
     */
    name?: string
    /**
     * 朝代ID
     */
    dynastyId?: string
  }

  export interface ReqCreate {
    /**
     * 诗人姓名
     */
    name: string
    /**
     * 朝代ID
     */
    dynastyId: string
    /**
     * 简介
     */
    introduction: string
    /**
     * 简介
     */
    shortIntroduction: string
  }

  export interface ResAuthor {
    /**
     * 诗人ID
     */
    id: string
    /**
     * 诗人姓名
     */
    name: string
    /**
     * 朝代
     */
    dynasty: PoetryDynasty.ResDynasty
    /**
     * 简介
     */
    introduction: string
    shortIntroduction: string
  }
}
