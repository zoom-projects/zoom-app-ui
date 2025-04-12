export const domainNotifyEventTypeDictKey = 'domainNotifyEventTypeDict'
export const domainNotifyTypeDictKey = 'domainNotifyTypeDict'
export const systemStatusDictKey = 'systemStatus'

export const dictKeys = [
  domainNotifyEventTypeDictKey,
  domainNotifyTypeDictKey,
  systemStatusDictKey,
]

export type NotifyType = 'email' | 'dingTalk' | 'workWechat' | 'feishu'
