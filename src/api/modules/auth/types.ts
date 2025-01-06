import type { ReqPage } from '../../types'

export namespace Auth{
  export interface ResSubscribeMsg {
    module: string
    children?: ResSubscribeMsgChild[]
  }
  export interface ResSubscribeMsgChild {
    id: string
    name: string
    code: string
    desc: string
    isSite: boolean
    isEmail: boolean
    isSms: boolean
  }

  export interface ReqSubscribeMsg {
    id?: string
    name?: string
    value: boolean
    type: 'SITE' | 'EMAIL' | 'SMS'
  }

  export interface ResNoticeMsg {
    id: string
    title: string
    content: string
    status: number
    created: string
  }

  export interface ReqNoticeMsg extends ReqPage {
    status?: number

  }
}
