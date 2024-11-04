import type { ReqPage } from '.'

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

  export interface UserQuery extends ReqPage {
    username?: string
    nickname?: string
    status?: boolean
    phone?: string
    email?: string
  }

  export interface ResUser {
  }

  export interface ReqSaveUserForm {
    username: string
    nickname: string
    password: string
    phone?: string
    email?: string
    gender?: number
    status?: boolean
  }
  export interface ReqUpdateUserForm {
    nickname: string
    phone?: string
    email?: string
    gender?: number
    status?: boolean
  }

  export interface ResUserRole {
    id: string
    userId: string
    roleId: string
    endTime?: string
  }

  export interface ReqUserRoleForm {
    roleId: string
    endTime?: string
  }

  export interface MessageTemplateQuery extends ReqPage {
    templateType?: string
    templateName?: string
    templateCode?: string
    status?: boolean
  }

  export interface ResMessageTemplate {
    id: string
    templateName: string
    templateCode: string
    templateType: string
    templateContentText: string
    templateContentHtml: string
    status: boolean
    created: string
    modifiedBy: string
  }

  export interface ReqMessageTemplateForm {
    id?: string
    templateName: string
    templateCode?: string
    templateType: string
    templateContentText: string
    templateContentHtml: string
    status: boolean
  }

  export interface MessageQuery extends ReqPage {
    msgType?: string
    msgTitle?: string
    msgReceiver?: string
    msgSendStatus?: number
  }

  export interface ResMessage {
    id: string
    msgType: string
    msgTitle: string
    msgReceiver: string
    msgParam: string
    msgContent: string
    msgSendTime: string
    msgSendStatus: number
    msgSendNum: number
    msgResult: string
    remark: string
  }

  export interface JobQuery extends ReqPage {
    appName?: string
    className?: string
    description?: string
    status?: boolean
  }

  export interface ResJob {
    id: string
    appName: string
    className: string
    parameter: string
    cronExpression: string
    description: string
    status: boolean
  }

  export interface ReqJobForm {
    id?: string
    appName: string
    className: string
    parameter: string
    cronExpression: string
    description: string
    status: boolean
  }

  export interface OpenApiQuery extends ReqPage {
    apiCode?: string
    apiName?: string
    module?: string
    status?: boolean
  }

  export interface ResOpenApi {
    id: string
    apiCode: string
    apiName: string
    module: string
    description: string
    status: boolean
  }

  export interface ReqOpenApiForm {
    id?: string
    apiCode: string
    apiName: string
    module: string
    description: string
    status: boolean
  }

  export interface ResOpenApiGroup {
    module: string
    children: ResOpenApi[]
  }

}
