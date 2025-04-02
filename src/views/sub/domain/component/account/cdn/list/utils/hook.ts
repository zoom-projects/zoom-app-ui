import type { ActionBarProps, PageInfo, PlusColumn, PlusPageInstance } from 'plus-pro-components'
import * as domainCDNAccountApi from '@/api/modules/domain/cdn/account'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { Delete, Edit } from '@element-plus/icons-vue'
import { dictKeys, domainCdnProviderDictKey } from './const'

export function useCDNAccountListHook() {
  const { loadDict, getDict, toOptions } = useDictStore()
  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const columns: PlusColumn[] = [
    {
      label: '标签',
      prop: 'label',
    },
    {
      label: '服务商',
      prop: 'provider',
      valueType: 'select',
      options: computed(() => toOptions(domainCdnProviderDictKey)),
    },
    {
      label: '账号',
      prop: 'account',

    },
    {
      label: '密码',
      prop: 'password',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      label: '邮箱',
      prop: 'email',
    },
    {
      label: '备注',
      prop: 'remark',
      hideInSearch: true,
    },
  ]
  const actionBar: ActionBarProps = {
    buttons: [
      {
        text: '编辑',
        icon: Edit,
        tooltipProps: {
          content: '编辑',
        },
        onClick: async ({ row }: any) => {
          handleEdit(row)
        },
      },
      {
        text: '删除',
        icon: Delete,
        tooltipProps: {
          content: '删除',
        },
        confirm: {
          message: '确认删除当前数据吗？',
        },
        onConfirm: async ({ row }: any) => {
          remove(row)
        },
      },
    ],
    type: 'icon',
    confirmType: 'popconfirm',
  }

  const currentModel = ref<any>()
  const dialogVisible = ref(false)

  async function loadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')

    const { success, data } = await domainCDNAccountApi.page(params)
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

  function handleAdd() {
    currentModel.value = {}
    dialogVisible.value = true
  }
  function handleEdit(row: any) {
    currentModel.value = row
    dialogVisible.value = true
  }

  function handleLoadData() {
    plusPageRef.value?.getList()
  }

  async function remove(row: any) {
    const { success } = await domainCDNAccountApi.remove(row.id)
    if (success) {
      handleLoadData()
    }
  }

  onMounted(() => {
    loadDict(dictKeys)
  })

  return {
    plusPageRef,
    columns,
    actionBar,

    currentModel,
    dialogVisible,

    loadData,
    handleAdd,
    handleLoadData,
  }
}
