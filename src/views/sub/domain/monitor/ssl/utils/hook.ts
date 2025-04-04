import type { DomainMonitorSSL } from '/src/api/modules/domain/monitor/ssl/types'
import type { ActionBarButtonsRow, FormChangeCallBackParams, PageInfo, PlusColumn, PlusPageInstance } from 'plus-pro-components'
import * as domainMonitorSSLApi from '@/api/modules/domain/monitor/ssl'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { Delete, Edit, Refresh } from '@element-plus/icons-vue'
import { ElProgress } from 'element-plus'
import { dictKeys } from './const'

export function useDoaminMonitorSSLHook() {
  const { loadDict } = useDictStore()

  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const columns: PlusColumn[] = [
    {
      label: '域名',
      prop: 'domain',
    },
    {
      label: '过期时间',
      prop: 'expireDays',
      valueType: 'select',
      options: [
        {
          label: '3天内过期',
          value: 3,
        },
        {
          label: '7天内过期',
          value: 7,
        },
        {
          label: '15天内过期',
          value: 15,
        },
        {
          label: '30天内过期',
          value: 30,
        },
        {
          label: '90天内过期',
          value: 90,
        },
        {
          label: '已过期',
          value: 0,
        },
      ],
      hideInTable: true,
      hideInForm: true,
    },
    {
      label: '证书天数',
      prop: 'expireDays',
      hideInSearch: true,
      render: (_, { row }) => {
        const iserror = row.fetchError || false
        if (iserror) {
          return h(`span`, {
            style: {
              color: 'red',
            },
          }, row.errorMessage)
        }
        return h('div', {
          style: {
            textAlign: 'center',
          },
        }, [
          h(ElProgress, {
            // 百分比=1-（剩余天数/总天数）*100
            percentage: (row.expireDays / row.totalDays) * 100,
            showText: false,
          }),
          h('span', {}, `${row.expireDays} / ${row.totalDays}`),
        ])
      },
    },
    {
      label: '更新时间',
      prop: 'updateTimeLabel',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      label: '监控中',
      prop: 'isMonitor',
      hasLabel: false,
      valueType: 'checkbox',
      options: computed(() => [{ label: '监控中', value: true }]),
      hideInForm: true,
      hideInTable: true,
    },
    {
      label: '自动更新',
      prop: 'isMonitor',
      valueType: 'switch',
      editable: true,
      hideInSearch: true,
    },
    {
      label: '到期提醒',
      prop: 'isRemind',
      valueType: 'switch',
      editable: true,
      hideInSearch: true,
    },
    {
      label: '备注',
      prop: 'remark',
      hideInSearch: true,
    },

  ]

  const refreshState = ref(false)
  const actionButtions: ActionBarButtonsRow[] = [
    {
      text: '刷新',
      icon: Refresh,
      onClick: async ({ row }) => {
        handleRefreshExpireTime(row.id)
      },
    },
    {
      text: '编辑',
      icon: Edit,
      onClick: ({ row }) => {
        handleOpenDialog(row as DomainMonitorSSL.ResDomainMonitorSSL)
      },
    },
    {
      text: '删除',
      icon: Delete,
      confirm: {
        title: '删除',
        message: '确定删除吗？',
      },
      onConfirm: async ({ row }) => {
        const { success } = await domainMonitorSSLApi.remove((row as DomainMonitorSSL.ResDomainMonitorSSL).id)
        if (success) {
          ElMessage.success('删除成功')
          plusPageRef.value?.getList()
        }
      },
    },

  ]

  const formModel = ref<any>({})
  const dialogVisible = ref(false)

  async function handleFormChange(data: FormChangeCallBackParams) {
    console.log(data)
    const { row }: any = data
    await domainMonitorSSLApi.update(row.id, row)
  }

  async function handleRefreshExpireTime(id: string) {
    refreshState.value = true
    const { success } = await domainMonitorSSLApi.refreshExpireTime(id).finally(() => {
      refreshState.value = false
    })
    if (success) {
      ElMessage.success('刷新成功')
      plusPageRef.value?.getList()
    }
  }

  async function handleGetList() {
    plusPageRef.value?.getList()
  }

  async function loadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    Reflect.deleteProperty(params, 'isMonitor')
    if (query.isMonitor && query.isMonitor.length) {
      Reflect.set(params, 'isMonitor', true)
    }
    const { success, data } = await domainMonitorSSLApi.page(params)
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

  async function handleOpenDialog(row?: DomainMonitorSSL.ResDomainMonitorSSL) {
    dialogVisible.value = true
    if (row) {
      formModel.value = clone(row, true)
      formModel.value.certTime = [row?.startTime, row?.expireTime]
    }
    else {
      formModel.value = {
        isMonitor: true,
        isRemind: true,
        sslType: 'SSL',
        port: 443,
      }
    }
  }

  onMounted(() => {
    loadDict(dictKeys)
  })

  return {
    plusPageRef,
    columns,
    actionButtions,

    formModel,
    dialogVisible,

    loadData,
    handleOpenDialog,
    handleFormChange,
    handleGetList,
  }
}
