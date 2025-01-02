import type { ReqPage } from '@/api/types'

export namespace SystemMessageSubscribe {
  export interface ReqQuery extends ReqPage {
    /**
     * 模块
     */
    module?: string
    /**
     * 标识
     */
    code?: string
    /**
     * 名称
     */
    name?: string
  }

  export interface ResPage {
    id: string
    /**
     * 模块
     */
    module: string
    /**
     * 标识
     */
    code: string
    /**
     * 名称
     */
    name: string
    /**
     * 描述
     */
    desc: string
    /**
     * 创建时间
     */
    created: string
  }

  export interface ReqSave {
    /**
     * 模块
     */
    module: string
    /**
     * 标识
     */
    code: string
    /**
     * 名称
     */
    name: string
    /**
     * 描述
     */
    desc: string
  }

  export interface ReqUpdate {
    /**
     * 标识
     */
    code: string
    /**
     * 名称
     */
    name: string
    /**
     * 描述
     */
    desc: string
  }

  export interface ResGroup {
    module: string
    children: ResPage[]
  }
}
