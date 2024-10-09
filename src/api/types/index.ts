// 请求响应参数（不包含data）
export interface Result {
  code: string
  msg: string
  success: boolean
  timestamp: number
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T
}

// 分页响应参数
export interface ResPage<T> {
  records: T[]
  pageNum: number
  pageSize: number
  total: number
}

// 分页请求参数
export interface ReqPage {
  current: number
  size: number
  sorts?: string
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string
  }
}

// 登录模块
export namespace Auth {
  export interface ReqLoginForm {
    username: string
    password: string
  }
  export interface ReqLoginPhoneForm {
    phone: string
    code: string
  }
  /**
   * 重置密码
   */
  export interface ReqRestPasswordForm {
    // 旧密码
    oldPassword: string
    // 新密码
    newPassword: string
  }

  export interface ResLogin {
  }
}

// 系统模块
export * from './system'
