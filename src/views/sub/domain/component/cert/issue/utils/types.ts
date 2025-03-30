import type { DomainCert } from '@/api/modules/domain/cert/types'

export interface DialogProps {
  visible: boolean
  formModel?: DomainCert.ResIssue
}

export interface ChallengeProps {
  formModel: DomainCert.ResIssue
}

export interface DownloadProps {
  formModel: DomainCert.ResIssue
}
