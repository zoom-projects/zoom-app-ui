import type { Attachment } from './types'
import http from '@/api'
import { SERVER1 } from '@/api/config/server'

/**
 *  创建上传的文件信息
 * @param body
 */
export function createFile(body: Attachment.ReqCreateFile) {
  return http.post(`${SERVER1}/sys/common/create_file`, body)
}

/**
 * 上传文件
 * @param body
 */
export function uploadFile(file: File) {
  return http.post<Attachment.ResCreateFile>(`${SERVER1}/sys/common/upload_file`, { file }, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/**
 * 获取预签名地址
 * @param filename
 * @param mediaType
 */
export function getPresignedUrl(filename: string, mediaType: string) {
  return http.get<Attachment.ResGetPresignedUrl>(`${SERVER1}/sys/common/presigned_url`, {
    filename,
    mediaType,
  })
}
