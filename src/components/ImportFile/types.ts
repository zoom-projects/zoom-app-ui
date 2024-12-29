export interface ImportFileProps {
  /**
   * 是否显示上传文件组件
   */
  visible: boolean
  /**
   * 标题
   */
  title?: string
  /**
   * 上传文件数量限制,默认 `1`
   */
  num?: number
  /**
   * 上传文件大小限制,默认 5M
   */
  fileSize?: number
  /**
   * 上传文件类型限制,默认 `['.xlsx', '.xls']`
   */
  accept?: string[]
  /**
   * 是否自动上传,默认 `false`
   */
  autoUpload?: boolean
  /**
   * dialog 宽度,默认 `50%`
   */
  width?: string

  /**
   * 业务应用
   */
  bizApp: string
  /**
   * 任务类型
   */
  taskType: string

}
