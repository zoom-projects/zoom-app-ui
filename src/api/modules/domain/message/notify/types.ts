import type { ReqPage } from '@/api/types'

export namespace DomainNotify{

  export interface ReqQuery extends ReqPage {
    event?: string
    notifyType?: string
  }

  export interface ResNotify {
    id: string
    event: string
    notifyType: string
    expireDays: number
    meta: NotifyMeta
    createdBy: string
    created: string
  }

  export interface ReqNotify {
    event: string
    notifyType: string
    expireDays: number
    meta: NotifyMeta
    remark?: string
  }

  export interface NotifyMeta {
    emailList?: string[]
    dingTalkWebhook?: string
    dingTalkSecret?: string
    workWechatWebhook?: string
    workWechatSecret?: string
    feiShuWebhook?: string
    feiShuSecret?: string
    body?: any
  }

}
