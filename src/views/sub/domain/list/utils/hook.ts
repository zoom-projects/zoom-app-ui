import type { DomainAccount } from '@/api/modules/domain/account/types'
import type { DomainInfo } from '@/api/modules/domain/info/types'
import type { FormRules } from 'element-plus'
import type { PageInfo, PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'
import { list as domainAccountListApi } from '@/api/modules/domain/account'
import * as domainInfoApi from '@/api/modules/domain/info'
import { useDictStore } from '@/store'
import { copyText } from '@/utils'
import { dictKeys, domainPlatformDictKey } from './const'

export function useDomainInfoHook() {
  const { toOptions, getDict, loadDict } = useDictStore()
  const getDomainPlatform = (value: string) => {
    return getDict(domainPlatformDictKey, value)
  }

  const domainAccountList = ref<Nullable<DomainAccount.ResAccount[]>>(null)
  const plusSearchRef = ref<Nullable<PlusPageInstance>>(null)
  const searchModel = ref<any>({})
  const plusSearchColumns: PlusColumn[] = [
    {
      label: '域名',
      prop: 'domain',
    },
    {
      label: '平台',
      prop: 'cloud',
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
    {
      label: '账号',
      prop: 'accountId',
      valueType: 'select',
      options: computed((): any => {
        return domainAccountList.value?.map((item) => {
          const dictItem = getDict(domainPlatformDictKey, item.platform)
          return {
            label: `${dictItem.label} - ${item.label}`,
            value: item.id,
          }
        })
      }),
    },
  ]

  const pageRef = ref<Nullable<PlusPageInstance>>(null)
  const pagination = ref<PageInfo>({
    page: 1,
    pageSize: 6,
  })
  const pageTotal = ref(0)

  const dataList = ref<Nullable<DomainInfo.ResDomain[]>>(null)

  const dialogExpireTimeRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const dialogExpireTimeVisible = ref(false)
  const dialogExpireTimeLoading = ref(false)
  const dialogExpireTimeModel = ref<any>({})
  const dialogExpireTimeColumns: PlusColumn[] = [
    {
      label: '当前域名',
      prop: 'domain',
      renderField: (value) => {
        return h('span', {
          style: {
            color: 'var(--el-color-primary)',
          },
        }, value as string)
      },
    },
    {
      label: '过期时间',
      prop: 'expireTime',
      valueType: 'date-picker',
      fieldProps: {
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
      },
    },
    {
      label: '续费链接',
      prop: 'renewLink',
    },
  ]

  const dialogDomainRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const dialogDomainVisible = ref(false)
  const dialogDomainLoading = ref(false)
  const dialogDomainModel = ref<any>({})
  const dialogDomainColumns: PlusColumn[] = [
    {
      label: '主域名',
      prop: 'domain',
      fieldProps: {
        placeholder: '请输入主域名 如: example.com',
      },
    },
    {
      label: '平台账号',
      prop: 'accountId',
      valueType: 'select',
      options: computed((): any => {
        return domainAccountList.value?.map((item) => {
          const dictItem = getDict(domainPlatformDictKey, item.platform)
          return {
            label: `${dictItem.label} - ${item.label}`,
            value: item.id,
          }
        })
      }),
    },
  ]
  const dialogDomainRules: FormRules = {
    domain: [
      { required: true, message: '请输入域名', trigger: 'blur' },
      {
        // 主域名格式
        validator: (_: any, value: string) => {
          // 顶级域名
          const reg = /^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]\.[a-z]{2,}$/i
          return reg.test(value)
        },
        message: '请输入正确的域名',
        trigger: 'blur',
      },
      {
        validator: (_: any, value: string, callback) => {
          domainInfoApi.domainExist(value).then(({ success, data }) => {
            if (success && data) {
              callback(new Error('域名已存在'))
            }
            else {
              callback()
            }
          })
        },
        trigger: 'blur',
      },
    ],
    cloud: [{ required: true, message: '请选择平台', trigger: 'change' }],
  }

  const onLoad = async () => {
    const params: DomainInfo.ReqQuery = {
      ...searchModel.value,
      size: pagination.value.pageSize,
      current: pagination.value.page,
    }
    const { success, data } = await domainInfoApi.page(params)
    if (success) {
      dataList.value = data.records
      pageTotal.value = data.total
    }
  }

  const handleSearch = async () => {
    pagination.value.page = 1
    onLoad()
  }

  const handleChangePage = (pageInfo: PageInfo) => {
    pagination.value = pageInfo
    onLoad()
  }

  const handleCopy = async (row: any, key: string) => {
    const text = row[key]
    await copyText(text)
    ElMessage.success('复制成功')
  }

  async function _loadAccountList() {
    const { success, data } = await domainAccountListApi()
    if (success) {
      domainAccountList.value = data
    }
  }

  async function openExpireTimeDialog(row: DomainInfo.ResDomain) {
    dialogExpireTimeModel.value = { ...row }
    dialogExpireTimeVisible.value = true
  }

  async function handleExpireTimeSave() {
    dialogExpireTimeLoading.value = true
    const { success } = await domainInfoApi.changeExpireTime(dialogExpireTimeModel.value.id, dialogExpireTimeModel.value).finally(() => {
      dialogExpireTimeLoading.value = false
    })
    if (success) {
      ElMessage.success('修改成功')
      dialogExpireTimeVisible.value = false
      onLoad()
    }
  }

  async function handleOpenDomainDialog() {
    dialogDomainModel.value = {}
    dialogDomainVisible.value = true
  }

  async function handleDomainSave() {
    dialogDomainLoading.value = true
    const { success } = await domainInfoApi.create(dialogDomainModel.value).finally(() => {
      dialogDomainLoading.value = false
    })
    if (success) {
      ElMessage.success('创建成功')
      dialogDomainVisible.value = false
      onLoad()
    }
  }

  async function handleRemove(row: DomainInfo.ResDomain) {
    const { success } = await domainInfoApi.remove(row.id)
    if (success) {
      ElMessage.success('删除成功')
      onLoad()
    }
  }

  const recordVisible = ref(false)
  const currentDomainInfo = ref<Nullable<DomainInfo.ResDomain>>(null)

  async function openRecordDialog(row: DomainInfo.ResDomain) {
    currentDomainInfo.value = row
    recordVisible.value = true
  }

  onMounted(() => {
    loadDict(dictKeys)
    _loadAccountList()
    onLoad()
  })

  return {
    getDomainPlatform,
    plusSearchRef,
    searchModel,
    plusSearchColumns,
    handleSearch,
    handleCopy,
    pageRef,
    pagination,
    pageTotal,
    handleChangePage,
    dataList,

    dialogExpireTimeRef,
    dialogExpireTimeVisible,
    dialogExpireTimeLoading,
    dialogExpireTimeModel,
    dialogExpireTimeColumns,
    openExpireTimeDialog,
    handleExpireTimeSave,

    dialogDomainRef,
    dialogDomainVisible,
    dialogDomainLoading,
    dialogDomainModel,
    dialogDomainColumns,
    dialogDomainRules,
    handleOpenDomainDialog,
    handleDomainSave,
    handleRemove,

    recordVisible,
    currentDomainInfo,
    openRecordDialog

  }
}
