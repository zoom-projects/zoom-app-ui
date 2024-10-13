import type { ReqPage, ResPage } from '.'

/**
 * 系统模块
 */
export namespace System {
  export interface PermissionQuery {
    title?: string
    parentId?: number
    menuType?: number
  }
  export interface ReqPermissionForm {
    /**
     * 菜单类型
     */
    menuType?: number
    /**
     * 菜单名称
     */
    title?: string
    /**
     * 路由名称
     */
    routeName?: string
    /**
     * 路由地址
     */
    routePath?: string
    /**
     * 菜单图标
     */
    icon?: string
    /**
     * 菜单排序
     */
    sort?: number
    /**
     * id
     */
    id?: string
    /**
     * 父级id
     */
    parentId?: string
    /**
     * 是否隐藏
     */
    hidden?: boolean
    /**
     * 是否缓存
     */
    keepAlive?: boolean
    /**
     * 是否全屏
     */
    fullScreen?: boolean
  }

  export interface PermissionTreeQuery {
    menuType?: string
  }

  export interface PermissionTree {
    id: string
    title: string
    parentId: string
    children: PermissionTree[]
  }

  export interface RoleQuery extends ReqPage {
    roleName?: string
    roleCode?: string
    status?: number
  }
  export interface ResRole {
    id: string
    roleName: string
    roleCode: string
    remark?: string
    status: number
  }

  export interface ReqRoleForm {
    id?: string
    roleName: string
    roleCode: string
    remark?: string
    status: number
  }

  export interface DictQuery extends ReqPage {
    keyword?: string
    status?: number
  }

  export interface ResDict {
    id: string
    dictName: string
    dictCode: string
    status: number
    description?: string
  }

  export interface ReqDictForm {
    id?: string
    dictName: string
    dictCode: string
    status: number
    description?: string
  }

  export interface DictItemQuery extends ReqPage {
    dictId?: string
    keyword?: string
    status?: number
  }

  export interface ResDictItem {
    id: string
    dictId: string
    itemName: string
    itemValue: string
    status: number
    description?: string
  }

  export interface ReqDictItemForm {
    id?: string
    dictId: string
    itemName: string
    itemValue: string
    status: number
    description?: string
  }

  export interface ResDictType {
    label: string
    value: any
    description?: string
    attrs?: any
  }

  /**
   * 操作日志查询
   */
  export interface OperatorLogQuery extends ReqPage {
    module?: string
    type?: string
    /**
     * 执行时间
     */
    executeTime?: string[]
  }

  export interface ResOperatorLog {
    id: string
    /**
     * 操作人ID
     */
    operatorId?: string
    /**
     * 操作人
     */
    operator?: string
    /**
     * traceId
     */
    traceId?: string
    /**
     * 请求ip
     */
    address?: string
    /**
     * 地址
     */
    location: string

    /**
     * userAgent
     */
    userAgent: string

    /**
     * 操作模块
     */
    module: string

    /**
     * 操作类型
     */
    type?: string
    /**
     * 风险等级
     */
    riskLevel?: string
    /**
     * 操作内容
     */
    logInfo?: string
    /**
     * 请求参数
     */
    extra?: string
    /**
     * 操作结果，0-成功，1-失败
     */
    result?: number
    /**
     * 错误信息
     */
    errorMessage?: string
    /**
     * 返回值
     */
    returnValue?: string
    /**
     * 操作时间
     */
    duration?: number
    /**
     * 开始时间
     */
    startTime?: string
    /**
     * 结束时间
     */
    endTime?: string
  }
}
