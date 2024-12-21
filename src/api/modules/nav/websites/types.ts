import type { ReqPage } from '@/api/types'

export namespace NavWebsites {

  export interface ReqQuery extends ReqPage {
    /**
     * 名称
     */
    title?: string
    /**
     * 分类
     */
    categoryId?: string
    /**
     * 标签
     */
    tag?: string
    /**
     * 是否隐藏
     */
    isHidden?: boolean
    /**
     * 是否推荐
     */
    isRecommend?: boolean
    /**
     * 是否废弃
     */
    isDeprecated?: boolean
  }

  export interface ResPage {
    id: string
    title: string
    url: string
    logo: string
    desc: string
    categoryId: string
    tag: string[]
    isHidden: boolean
    isRecommend: boolean
    isDeprecated: boolean
  }

  export interface ReqForm {
    title: string
    url: string
    logo: string
    desc: string
    categoryId: string
    tag: string[]
    isHidden: boolean
    isRecommend: boolean
    isDeprecated: boolean
  }
}
