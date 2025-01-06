import type { Auth } from '@/api/modules/auth/types'

export interface NoticeReadingProps {
  /**
   * @description 是否显示
   */
  visible: boolean
  /**
   * @description 通知消息数据
   */
  data?: Auth.ResNoticeMsg
  /**
   * @description 标题 默认值：'消息内容'
   */
  title?: string
  /**
   * @description 是否显示关闭按钮 true
   */
  hideClose?: boolean

  /**
   * @description 宽度 默认值：'35%'
   */
  width?: string
}
