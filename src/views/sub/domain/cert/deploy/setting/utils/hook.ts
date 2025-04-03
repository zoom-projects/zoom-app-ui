import type { DomainCdnAccount } from '/src/api/modules/domain/cdn/account/types'
import type { FormRules } from 'element-plus'
import type { ActionBarProps, PageInfo, PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'
import { list as cdnAccountApi } from '@/api/modules/domain/cdn/account'
import * as domainCertDeploySettingApi from '@/api/modules/domain/deploy/setting'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { Delete, Edit } from '@element-plus/icons-vue'
import { dictKeys, domainCdnProviderDictKey, domainCertDeployCommandDictKey, domainCertDeployTypeDictKey, systemSshLoginTypeDictKey } from './const'

export function useCertDeploySettingHook() {
  const { loadDict, getDict, toOptions } = useDictStore()

  const plusPageRef = ref<Nullable<PlusPageInstance>>()
  const plusDialogFormRef = ref<Nullable<PlusDialogFormInstance>>()
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
      hideInForm: true,
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
    },
    {
      label: 'CDN厂商',
      prop: 'cdnAccountId',
      hideInForm: computed(() => formModel.value?.deployType !== 'cdn'),
      valueType: 'select',
      hideInTable: true,
      hideInSearch: true,
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
  const sshLoginFormRules: FormRules = {
    label: [
      { required: true, message: '请输入部署标签', trigger: 'blur' },
    ],
    host: [
      { required: true, message: '请输入主机', trigger: 'blur' },
    ],
    port: [
      { required: true, message: '请输入端口', trigger: 'blur' },
      {
        validator: (_: any, value: any, callback: any) => {
          // 是否是数字
          const reg = /^\d*$/
          if (value && !reg.test(value)) {
            callback(new Error('端口必须是数字'))
          }
          else {
            callback()
          }
        },
        trigger: 'blur',
      },
    ],
    username: [
      { required: true, message: '请输入用户', trigger: 'blur' },
    ],
    sshLoginType: [
      { required: true, message: '请选择登陆方式', trigger: 'blur' },
    ],
    password: [
      {
        validator: (_: any, value: any, callback: any) => {
          if (formModel.value?.sshLoginType === 'password' && !value) {
            callback(new Error('请输入密码'))
          }
          else {
            callback()
          }
        },
        trigger: 'blur',
      },
    ],
    privateKey: [
      {
        validator: (_: any, value: any, callback: any) => {
          if (formModel.value?.sshLoginType === 'privatekey' && !value) {
            callback(new Error('请输入私钥'))
          }
          else {
            callback()
          }
        },
        trigger: 'blur',
      },
    ],

  }
  const cdnAccountFormRules = {
    label: [
      { required: true, message: '请输入标签', trigger: 'blur' },
    ],
    cdnAccountId: [
      { required: true, message: '请选择CDN厂商', trigger: 'blur' },
    ],
  }

  const formRules = computed(() => {
    if (formModel.value?.deployType === 'ssh') {
      return sshLoginFormRules
    }
    if (formModel.value?.deployType === 'cdn') {
      return cdnAccountFormRules
    }
  })
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
  const confirmLoading = ref(false)

  const cdnDialogVisible = ref(false)
  const cdnAccountFormModel = ref<any>({})
  const cdnAccountColumns: PlusColumn[] = [
    {
      label: '标签',
      prop: 'label',

    },
  ]
  const cdnAccountListVisible = ref(false)
  const actionBar: ActionBarProps = {
    type: 'icon',
    confirmType: 'popconfirm',
    buttons: [
      {
        text: '编辑',
        icon: Edit,
        tooltipProps: {
          content: '编辑',
        },
        onClick: async ({ row }) => {
          formModel.value = row
          dialogVisible.value = true
        },

      },
      {
        text: '删除',
        icon: Delete,
        tooltipProps: {
          content: '删除',
        },
        confirm: {
          message: '确认删除吗？',
        },
        onConfirm: async ({ row }) => {
          remove(row)
        },
      },
    ],
  }

  async function handleAdd() {
    formModel.value = {
      ...defaultModel,
    }
    dialogVisible.value = true
  }

  async function handleAddCdnAccount() {
    cdnAccountFormModel.value = {
      provider: 'aliyun',
    }
    cdnDialogVisible.value = true
  }
  async function handleOpenCdnAccountList() {
    cdnAccountListVisible.value = true
  }
  async function handleLoadCdnAccount() {
    _getCDNAccountList()
  }

  async function handleConfirm() {
    if (formModel.value.id) {
      _update()
    }
    else {
      _save()
    }
  }

  async function _save() {
    confirmLoading.value = true
    const { success } = await domainCertDeploySettingApi
      .save(formModel.value)
      .finally(() => confirmLoading.value = false)
    if (success) {
      dialogVisible.value = false
      plusPageRef.value?.getList()
    }
  }
  async function _update() {
    confirmLoading.value = true
    const { success } = await domainCertDeploySettingApi
      .update(formModel.value.id, formModel.value)
      .finally(() => confirmLoading.value = false)
    if (success) {
      dialogVisible.value = false
      plusPageRef.value?.getList()
    }
  }

  async function remove(row: any) {
    confirmLoading.value = true
    const { success } = await domainCertDeploySettingApi
      .remove(row.id)
      .finally(() => confirmLoading.value = false)
    if (success) {
      plusPageRef.value?.getList()
    }
  }

  async function loadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    const { success, data } = await domainCertDeploySettingApi.page(params)
    if (success) {
      return {
        data: data.records,
        total: data.total,
      }
    }

    return {
      total: 0,
      data: [],
    }
  }

  async function _getCDNAccountList() {
    const { success, data } = await cdnAccountApi()
    if (success) {
      cdnAccountList.value = data
    }
  }

  watch(
    () => dialogVisible.value,
    (val) => {
      if (!val) {
        formModel.value = {}
        plusDialogFormRef.value?.formInstance.resetFields()
      }
    },
  )

  onMounted(() => {
    loadDict(dictKeys)
    _getCDNAccountList()
  })

  return {
    plusPageRef,
    columns,
    actionBar,
    plusDialogFormRef,
    formModel,
    dialogVisible,
    formRules,
    confirmLoading,

    cdnDialogVisible,
    cdnAccountFormModel,
    cdnAccountColumns,
    cdnAccountListVisible,

    loadData,
    handleAdd,
    handleAddCdnAccount,
    handleOpenCdnAccountList,
    handleLoadCdnAccount,
    handleConfirm,
  }
}
