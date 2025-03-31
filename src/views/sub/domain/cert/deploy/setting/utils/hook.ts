import type { DomainCdnAccount } from '/src/api/modules/domain/cdn/account/types'
import type { PlusColumn } from 'plus-pro-components'
import { list as cdnAccountApi } from '@/api/modules/domain/cdn/account'
import { useDictStore } from '@/store'
import { dictKeys, domainCdnProviderDictKey, domainCertDeployCommandDictKey, domainCertDeployTypeDictKey, systemSshLoginTypeDictKey } from './const'

export function useCertDeploySettingHook() {
  const { loadDict, getDict, toOptions } = useDictStore()

  const cdnAccountList = ref<DomainCdnAccount.ResAccount[]>([])
  const formModel = ref<any>({})
  const columns: PlusColumn[] = [
    {
      label: '部署标签',
      prop: 'label',
    },
    {
      label: '部署方式',
      prop: 'deployType',
      valueType: 'select',
      options: computed(() => toOptions(domainCertDeployTypeDictKey)),
    },

    {
      label: 'CDN厂商',
      prop: 'cdnAccountId',
      hideInForm: computed(() => formModel.value?.deployType !== 'cdn'),
      valueType: 'select',
      options: computed((): any => {
        return cdnAccountList.value?.map((item) => {
          const dictItem = getDict(domainCdnProviderDictKey, item.provider)
          return {
            label: `${dictItem.label} - ${item.label}`,
            value: item.id,
          }
        })
      }),
      colProps: {
        span: 24,
      },
    },

    {
      label: '主机',
      prop: 'host',
      hideInForm: computed(() => formModel.value?.deployType !== 'ssh'),
      hideInSearch: true,
    },
    {
      label: '端口',
      prop: 'port',
      hideInForm: computed(() => formModel.value?.deployType !== 'ssh'),
      hideInSearch: true,
    },
    {
      label: '用户',
      prop: 'username',
      hideInForm: computed(() => formModel.value?.deployType !== 'ssh'),
      hideInSearch: true,
    },
    {
      label: '登陆方式',
      prop: 'sshLoginType',
      valueType: 'select',
      options: computed(() => toOptions(systemSshLoginTypeDictKey)),
      hideInForm: computed(() => formModel.value?.deployType !== 'ssh'),
      hideInTable: true,
      hideInSearch: true,
    },
    {
      label: '密码',
      prop: 'password',
      hideInForm: computed(() => formModel.value?.sshLoginType !== 'password' || formModel.value?.deployType !== 'ssh'),
      hideInTable: true,
      hideInSearch: true,
    },
    {
      label: '私钥',
      prop: 'privateKey',
      hideInForm: computed(() => formModel.value?.sshLoginType !== 'privatekey' || formModel.value?.deployType !== 'ssh'),
      hideInTable: true,
      hideInSearch: true,
      valueType: 'textarea',
      rowProps: {
        span: 5,
      },
      colProps: {
        span: 24,
      },
    },
    {
      label: '上传目录',
      prop: 'deployPath',
      hideInForm: computed(() => formModel.value?.deployType !== 'ssh'),
      hideInTable: true,
      hideInSearch: true,
      colProps: {
        span: 24,
      },
      fieldProps: {
        placeholder: '请输入上传目录',
      },
      tooltip: ' 例如： /usr/local/nginx/conf，注意：目录必须存在，且有读写权限，系统将自动解压相关文件',
    },
    {
      label: '执行命令',
      prop: 'execCmd',
      valueType: 'select',
      options: computed(() => toOptions(domainCertDeployCommandDictKey)),
      hideInForm: computed(() => formModel.value?.deployType !== 'ssh'),
      hideInTable: true,
      hideInSearch: true,
      tooltip: ' 出于安全考虑，仅能使用预设的命令',
      colProps: {
        span: 24,
      },
    },
    {
      label: '备注',
      prop: 'remark',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
      colProps: {
        span: 24,
      },
    },
  ]
  const defaultModel = {
    deployType: 'ssh',
    sshLoginType: 'password',
    host: '',
    port: 22,
    username: '',
    password: '',
    privateKey: '',
    deployPath: '',
    command: 'docker exec -id nginx nginx -s reload',
    description: '',
  }

  const dialogVisible = ref(false)

  const cdnDialogVisible = ref(false)
  const cdnAccountFormModel = ref<any>({})
  const cdnAccountColumns: PlusColumn[] = [
    {
      label: '标签',
      prop: 'label',

    },
  ]

  async function handleAdd() {
    formModel.value = {
      ...defaultModel,
    }
    dialogVisible.value = true
  }

  async function handleAddCdnAccount() {
    cdnAccountFormModel.value = {}
    cdnDialogVisible.value = true
  }
  async function handleLoadCdnAccount() {
    _getCDNAccountList()
  }

  async function _getCDNAccountList() {
    const { success, data } = await cdnAccountApi()
    if (success) {
      cdnAccountList.value = data
    }
  }

  onMounted(() => {
    loadDict(dictKeys)
    _getCDNAccountList()
  })

  return {
    columns,

    formModel,
    dialogVisible,

    cdnDialogVisible,
    cdnAccountFormModel,
    cdnAccountColumns,

    handleAdd,
    handleAddCdnAccount,
    handleLoadCdnAccount,
  }
}
