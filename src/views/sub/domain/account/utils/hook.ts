import type { DomainAccount } from '/src/api/modules/domain/account/types'
import type { FormRules } from 'element-plus'
import type { PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'
import * as domainAccountApi from '@/api/modules/domain/account'
import { refresh as domainAccountRefresh } from '@/api/modules/domain/info'
import { useDictStore } from '@/store'
import { ElImage, ElSpace } from 'element-plus'
import { dictKeys, domainPlatformDictKey } from './const'

export function useDomainAccountHook() {
  const { toOptions, getDict, loadDict } = useDictStore()

  const plusSearchRef = ref<Nullable<PlusPageInstance>>(null)
  const searchModel = ref<any>({})
  const plusSearchColumns: PlusColumn[] = [
    {
      label: '标签',
      prop: 'label',
    },
    {
      label: '平台',
      prop: 'platform',
      valueType: 'select',
      options: computed(() => toOptions(domainPlatformDictKey)),
      fieldChildrenSlot: (row: any) => {
        return h(ElSpace, null, {
          default: () => [
            h(ElImage, { src: row.icon, style: 'height: 20px;' }),
            h('span', null, row.label),
          ],
        })
      },
      fieldSlots: {
        label: ({ label, value }) => {
          const items = getDict(domainPlatformDictKey, value)
          return h(ElSpace, null, {
            default: () => [
              h(ElImage, { src: items.icon, style: 'height: 18px;' }),
              h('span', null, label),
            ],
          })
        },
      },
    },
  ]

  const dataList = ref<Nullable<DomainAccount.ResAccount[]>>(null)

  const dialogFormRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const dialogVisible = ref<boolean>(false)
  const dialogLoading = ref<boolean>(false)
  const dialogFormColumns: PlusColumn[] = [
    {
      label: '选择平台',
      prop: 'platform',
      valueType: 'select',
      fieldProps: {
        clearable: false,
      },
      options: computed(() => toOptions(domainPlatformDictKey)),
      fieldChildrenSlot: (row: any) => {
        return h(ElSpace, null, {
          default: () => [
            h(ElImage, { src: row.icon, style: 'height:20px;' }),
            h('span', null, row.label),
          ],
        })
      },
      fieldSlots: {
        label: ({ label, value }) => {
          const items = getDict(domainPlatformDictKey, value)
          return h(ElSpace, null, {
            default: () => [
              h(ElImage, { src: items.icon, style: 'height:18px;' }),
              h('span', null, label),
            ],
          })
        },
      },
    },
    {
      label: '标签',
      prop: 'label',
      fieldProps: {
        placeholder: '账号标签，可是是个人，公司，项目等',
      },
    },
    {
      label: 'Access Key',
      prop: 'account',
      hideInForm: computed(() => dialogFormModel.value.platform !== 'aliyun'),
      fieldProps: {
        placeholder: '阿里云Access Key',
      },
    },
    {
      label: 'Secret Key',
      prop: 'password',
      hideInForm: computed(() => dialogFormModel.value.platform !== 'aliyun'),
      fieldProps: {
        placeholder: '阿里云Secret Key',
      },
    },
    {
      label: 'ApiToken',
      prop: 'password',
      hideInForm: computed(() => dialogFormModel.value.platform !== 'cf'),
      fieldProps: {
        placeholder: 'Cloudflare ApiToken',
      },
    },
    {
      label: 'Api Key',
      prop: 'account',
      hideInForm: computed(() => dialogFormModel.value.platform !== 'cf'),
      fieldProps: {
        placeholder: 'Cloudflare Api Key',
      },
    },
    {
      label: 'Secret Id',
      prop: 'account',
      hideInForm: computed(() => dialogFormModel.value.platform !== 'tencent'),
      fieldProps: {
        placeholder: '腾讯云Secret Id',
      },
    },
    {
      label: 'Secret Key',
      prop: 'password',
      hideInForm: computed(() => dialogFormModel.value.platform !== 'tencent'),
      fieldProps: {
        placeholder: '腾讯云Secret Key',
      },
    },
    {
      label: 'Email',
      prop: 'email',
    },
    {
      label: '备注',
      prop: 'remark',
    },
  ]
  const dialogFormModel = ref<any>({})
  const aliyunRules: FormRules = {
    label: [
      { required: true, message: '请输入标签', trigger: 'blur' },
    ],
    account: [
      { required: true, message: '请输入Access Key', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入Secret Key', trigger: 'blur' },
    ],
  }
  const tencentRules: FormRules = {
    label: [
      { required: true, message: '请输入标签', trigger: 'blur' },
    ],
    account: [
      { required: true, message: '请输入Secret Id', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入Secret Key', trigger: 'blur' },
    ],
  }
  const cfRules: FormRules = {
    label: [
      { required: true, message: '请输入标签', trigger: 'blur' },
    ],
    email: [
      { message: '请输入Email', trigger: 'blur', type: 'email' },
    ],
  }
  const dialogFormRules = computed(() => {
    if (dialogFormModel.value.platform === 'aliyun') {
      return aliyunRules
    }
    if (dialogFormModel.value.platform === 'tencent') {
      return tencentRules
    }
    if (dialogFormModel.value.platform === 'cf') {
      return cfRules
    }

    return {}
  })
  const getAccountField = (info: DomainAccount.ResAccount) => {
    const { platform } = info
    if (platform === 'aliyun') {
      return [
        {
          label: 'Access Key',
          value: info.account,
        },
        {
          label: 'Secret Key',
          value: info.password,
        },
      ]
    }
    if (platform === 'tencent') {
      return [
        {
          label: 'Secret Id',
          value: info.account,
        },
        {
          label: 'Secret Key',
          value: info.password,
        },
      ]
    }
    if (platform === 'cf') {
      return [
        {
          label: 'ApiToken',
          value: info.password,
        },
        {
          label: 'Api Key',
          value: info.account,
        },
        {
          label: 'Email',
          value: info.email,
        },
      ]
    }
    return []
  }
  const getDomainPlatform = (value: string) => {
    return getDict(domainPlatformDictKey, value)
  }

  async function handleSearch() {
    const params = {
      ...searchModel.value,
    }
    const { success, data } = await domainAccountApi.list(params)
    if (success) {
      dataList.value = data
    }
  }

  async function handleOpenDialog(row: DomainAccount.ResAccount | null = null) {
    dialogFormModel.value = row || {
      platform: 'aliyun',
    }
    if (row && row.id) {
      const { success, data } = await domainAccountApi.info(row.id)
      if (success) {
        dialogFormModel.value = data
      }
    }
    dialogVisible.value = true
  }

  async function handleConfirm() {
    dialogFormRef.value?.formInstance.validate(async (valid) => {
      if (!valid) {
        return
      }
      if (dialogFormModel.value.id) {
        _update()
      }
      else {
        _save()
      }
    })
  }

  async function _save() {
    dialogLoading.value = true
    const { success } = await domainAccountApi.create(dialogFormModel.value).finally(() => {
      dialogLoading.value = false
    })
    // 异步请求成功
    if (success) {
      dialogVisible.value = false
      handleSearch()
      ElMessageBox.confirm('保存成功，是否刷新域名列表', '提示', {
        confirmButtonText: '刷新',
        cancelButtonText: '取消',
        type: 'success',
      }).then(() => {
        // 确认刷新
      }).catch(() => {

      })
    }
  }

  async function _update() {
    dialogLoading.value = true
    const { success } = await domainAccountApi.update(dialogFormModel.value.id, dialogFormModel.value).finally(() => {
      dialogLoading.value = false
    })
    if (success) {
      dialogVisible.value = false
      handleSearch()
    }
  }

  async function handleDelete(row: DomainAccount.ResAccount) {
    const { success } = await domainAccountApi.remove(row.id)
    if (success) {
      handleSearch()
    }
  }

  async function handlePull(row: DomainAccount.ResAccount) {
    domainAccountRefresh(row.id)
    ElMessage.success('请求已发送，请稍后刷新列表')
  }

  onMounted(() => {
    loadDict(dictKeys)
    handleSearch()
  })

  return {
    toOptions,
    getDict,
    plusSearchRef,
    plusSearchColumns,
    searchModel,
    handleSearch,
    getDomainPlatform,
    dataList,
    dialogFormRef,
    dialogVisible,
    dialogLoading,
    dialogFormColumns,
    dialogFormModel,
    dialogFormRules,
    getAccountField,
    handleOpenDialog,
    handleConfirm,
    handleDelete,
    handlePull,
  }
}
