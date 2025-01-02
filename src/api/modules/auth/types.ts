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
}
