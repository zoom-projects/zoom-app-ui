import type { ReqPage } from '@/api/types'

export namespace ResumeTemplate{

  export interface ReqQuery extends ReqPage {
    published?: boolean
  }

  export interface SaveDraftRequest {
    category: string
    jsonId: string
    templateId?: string
    legoJson: any
    cover: string
  }
  export interface ResResumeTemplate {
    /**
     * id
     */
    id: string
    /**
     * 标题
     */
    title: string
    /**
     * 类别
     */
    category: string
    /**
     * jsonId
     */
    jsonId: string
    /**
     * 模板ID
     */
    templateId: string
    /**
     * 内容
     */
    legoJson: any
    /**
     * 封面
     */
    cover: string
    /**
     * 是否发布
     */
    published: boolean
    /**
     * 版本
     */
    version: string
    /**
     * 创建者
     */
    createdBy: string
    /**
     * 创建时间
     */
    created: string
    /**
     * 更新者
     */
    modifiedBy: string
    /**
     * 更新时间
     */
    modified: string
  }
}
