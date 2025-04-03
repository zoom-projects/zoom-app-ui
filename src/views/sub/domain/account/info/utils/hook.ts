import type { DomainAccount } from '/src/api/modules/domain/account/types'
import type { PlusColumn, PlusPageInstance } from 'plus-pro-components'
import * as domainAccountApi from '@/api/modules/domain/account'
import { refresh as domainAccountRefreshApi, domainsByAccountId as domainsByAccountIdApi } from '@/api/modules/domain/info'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
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

  const pageLoading = ref<boolean>(false)
  const dataList = ref<Nullable<DomainAccount.ResAccount[]>>(null)
  const dialogVisible = ref<boolean>(false)
  const dialogFormModel = ref<any>({})
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
    pageLoading.value = true
    const { success, data } = await domainAccountApi.list(params).finally(() => pageLoading.value = false)
    if (success) {
      dataList.value = data
    }
  }

  async function handleOpenDialog(row: DomainAccount.ResAccount | null = null) {
    dialogFormModel.value = clone(row, true) || {
      platform: 'aliyun',
    }
    dialogVisible.value = true
  }

  async function handleDelete(row: DomainAccount.ResAccount) {
    const { success, data } = await domainsByAccountIdApi(row.id)
    if (success && data.length > 0) {
      const vnodes: any = []
      data.forEach((item) => {
        vnodes.push(h('div', null, item))
      })
      ElNotification.warning({
        title: '删除失败',
        message: h('div', null, [
          h('p', null, '账号下存在域名，无法删除'),
        ].concat(vnodes)),
        duration: 2000,
      })
      return
    }
    const res = await domainAccountApi.remove(row.id)
    if (res.success) {
      handleSearch()
    }
  }

  async function handlePull(row: DomainAccount.ResAccount) {
    domainAccountRefreshApi(row.id)
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
    pageLoading,
    dataList,
    dialogFormModel,
    dialogVisible,
    getAccountField,
    handleOpenDialog,
    handleDelete,
    handlePull,
  }
}
