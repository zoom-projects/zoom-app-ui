import type { ReqPage } from '@/api/types'

export namespace NavCategory{
  export interface ReqQuery extends ReqPage {
    name?: string
    isHidden?: boolean
  }

  export interface ResNavCategory {
    id: string
    parentId?: string
    name: string
    icon?: string
    isHidden: boolean
    created: string
  }

  export interface ReqCreateNavCategoryForm {
    parentId?: string
    name: string
    icon?: string
    isHidden: boolean
  }

  export interface ReqUpdateNavCategoryForm {
    id: string
    parentId?: string
    name: string
    icon?: string
    isHidden: boolean
  }
}
