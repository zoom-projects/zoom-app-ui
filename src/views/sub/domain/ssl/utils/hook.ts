import type { type PlusColumn, PlusPageInstance, type PlusStepFromRow } from 'plus-pro-components'
import { getCurrentUserInfoApi2 } from '@/api/modules/login'
import { useDictStore } from '@/store'
import { dictKeys, domainCertAlgorithmDictKey, domainDirectoryTypeDictKey } from './const'

export function useDomainSSLHook() {
  const { toOptions, getDict, loadDict } = useDictStore()

  const dialogVisible = ref(false)
  const currentUserEmail = ref('')
  const stepForm = ref<PlusStepFromRow[]>([
    {
      title: '填写域名',
      form: {},
    },
    {
      title: '验证域名',
      form: {},
    },
    {
      title: '下载证书',
      form: {},
    },
  ])
  const activeStep = ref(0)
  const formModel = ref<any>({})
  const formColumns: PlusColumn[] = [
    {
      label: '证书厂商',
      prop: 'directoryType',
      valueType: 'select',
      options: computed(() => toOptions(domainDirectoryTypeDictKey)),
      fieldProps: {
        placeholder: '请选择证书厂商',
      },
    },
    {
      label: '申请域名',
      prop: 'domains',
      valueType: 'textarea',
      fieldProps: {
        placeholder: '请输入域名列表，每行一个',
      },
      tooltip: {
        content: '申请域名为www.domain.com的证书同时支持保护domain.com',
      },
    },
    {
      label: '电子邮件',
      prop: 'email',
      fieldProps: {
        placeholder: '在申请ACME证书时，需要填写电子邮件',
      },
    },
    {
      label: '加密算法',
      prop: 'certAlgorithm',
      valueType: 'select',
      options: computed(() => toOptions(domainCertAlgorithmDictKey)),
      fieldProps: {
        placeholder: '请选择加密算法',
      },
      tooltip: {
        content: `ECC 效率高、安全性强，兼容性略差,RSA 效率低，广泛兼容,数字越大越安全，速度越慢`,
      },

    },
  ]

  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const columns: PlusColumn[] = [
    {
      label: '域名',
      prop: 'domain',
    },
    {
      label: 'SSL签发时间',
      prop: 'sslIssuedAt',
    },
    {
      label: 'SSL到期时间',
      prop: 'sslExpireAt',
    },
  ]

  async function handleOpenDialog(data?: any) {
    if (data) {
      formModel.value = data
    }
    else {
      formModel.value = {
        directoryType: 'letsencrypt',
        email: currentUserEmail.value,
        certAlgorithm: 'RSA-2048',
      }
    }
    dialogVisible.value = true
  }

  async function _loadUserInfo() {
    const { data, success } = await getCurrentUserInfoApi2('email')
    if (success) {
      currentUserEmail.value = data
    }
  }

  onMounted(() => {
    loadDict(dictKeys)
    _loadUserInfo()
  })

  return {
    dialogVisible,
    stepForm,
    activeStep,
    formModel,
    formColumns,

    plusPageRef,
    columns,

    handleOpenDialog,
  }
}
