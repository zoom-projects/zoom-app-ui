import type { ActionBarProps, PageInfo, PlusColumn, PlusPageInstance } from 'plus-pro-components'
import * as domainCertApi from '@/api/modules/domain/cert'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { Delete } from '@element-plus/icons-vue'
import { ElLink } from 'element-plus'
import { dictKeys, domainCADictKey, domainCertStatusDictKey } from './const'

export function useDomainSSLHook() {
  const { toOptions, loadDict } = useDictStore()

  const dialogVisible = ref(false)
  const formModel = ref<any>({})
  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const columns: PlusColumn[] = [
    {
      label: '域名',
      prop: 'domains',
      labelWidth: '100px',
      render: (value, { row }) => {
        return h(ElLink, {
          type: 'primary',
          underline: 'never',
          onClick: () => {
            handleOpenDialog(row)
          },
        }, () => value)
      },
    },
    {
      label: '证书类型',
      prop: 'ca',
      valueType: 'select',
      options: computed(() => toOptions(domainCADictKey)),
    },
    {
      label: 'SSL签发时间',
      prop: 'issueTimes',
      labelWidth: '100px',
      hideInTable: true,
      valueType: 'plus-date-picker',
      fieldProps: {
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
      },
    },
    {
      label: 'SSL签发时间',
      prop: 'issueTime',
      labelWidth: '100px',
      hideInSearch: true,
    },
    {
      label: 'SSL到期时间',
      prop: 'expireTimes',
      labelWidth: '100px',
      hideInTable: true,
      valueType: 'plus-date-picker',
      fieldProps: {
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
      },
    },
    {
      label: 'SSL到期时间',
      prop: 'expireTime',
      labelWidth: '100px',
      hideInSearch: true,
    },
    {
      label: '总证书数',
      prop: 'totalDays',
    },
    {
      label: '验证状态',
      prop: 'status',
      valueType: 'select',
      options: computed(() => toOptions(domainCertStatusDictKey)),
    },
  ]
  const actionBar: ActionBarProps = {
    buttons: [
      {
        text: '删除',
        icon: Delete,
        confirm: {
          message: '确定删除吗？',
        },

        onConfirm: ({ row }) => {
          _delete(row.id)
        },
      },
    ],
    type: 'icon',
    confirmType: 'popconfirm',
  }

  async function handleOpenDialog(data?: any) {
    if (data) {
      formModel.value = data
    }
    else {
      formModel.value = {
        ca: 'letsencrypt',
        certAlgorithm: 'RSA-2048',
      }
    }
    dialogVisible.value = true
  }

  async function loadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    // 设置issueTime和expireTime的时间范围
    if (params.issueTimes && params.issueTimes.length) {
      params.issueTimeStart = params.issueTimes[0]
      params.issueTimeEnd = params.issueTimes[1]
      Reflect.deleteProperty(params, 'issueTimes')
    }
    if (params.expireTimes && params.expireTimes.length) {
      params.expireTimeStart = params.expireTimes[0]
      params.expireTimeEnd = params.expireTimes[1]
      Reflect.deleteProperty(params, 'expireTimes')
    }
    // 设置排序
    params.sorts = 'created desc'

    const { success, data } = await domainCertApi.page(params)
    if (success) {
      return {
        data: data.records,
        total: data.total,
      }
    }
    return {
      data: [],
      total: 0,
    }
  }

  async function _delete(id: string) {
    if (!id) {
      return
    }
    const { success } = await domainCertApi.remove(id)
    if (success) {
      plusPageRef.value?.getList()
    }
  }

  watch(
    () => dialogVisible.value,
    (val) => {
      if (!val) {
        plusPageRef.value?.getList()
      }
    },
  )

  onMounted(() => {
    loadDict(dictKeys)
  })

  return {
    dialogVisible,
    formModel,
    plusPageRef,
    columns,
    actionBar,
    loadData,
    handleOpenDialog,
  }
}
