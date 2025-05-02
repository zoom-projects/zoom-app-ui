import type { ActionBarButtonsRow, PageInfo, PlusColumn, PlusPageInstance } from 'plus-pro-components'
import * as DomainAcmeAccountApi from '@/api/modules/domain/acme/account'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { dictKeys, domainCADictKey } from './const'

export function useDomainAcmeAccountHook() {
  const { toOptions, loadDict } = useDictStore()

  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const columns: PlusColumn[] = [
    {
      label: '邮箱',
      prop: 'email',
      render: (value, { row }) => {
        return h('span', [
          row.hasDecrypt ? row.emailDecrypt : row.email,
          h(ElTag, {
            plain: true,
            class: 'cursor-pointer',
            onClick: async () => {
              row.hasDecrypt = !row.hasDecrypt
              if (row.emailDecrypt) {
                return
              }
              const { success, data } = await DomainAcmeAccountApi.decrypt(row.id)
              if (success) {
                row.emailDecrypt = data

                row.hasDecrypt = true
              }
            },
          }, {
            default: () => row.hasDecrypt ? '隐藏' : '展示',
          }),
        ])
      },
    },
    {
      label: '证书厂商',
      prop: 'ca',
      valueType: 'select',
      options: computed(() => toOptions(domainCADictKey).filter(item => item.isCa)),
    },
    {
      label: 'kid',
      prop: 'kid',
    },
    {
      label: '创建时间',
      prop: 'created',
      hideInSearch: true,
    },
  ]
  const actionButtions: ActionBarButtonsRow[] = [
    {
      text: '删除',
      props: {
        type: 'danger',
        underline: false,
      },
      confirm: {
        title: '删除',
        message: '确定要删除吗？',
      },
      onConfirm: async ({ row }) => {
        const { id } = row
        const { success } = await DomainAcmeAccountApi.remove(id)
        if (success) {
          plusPageRef.value?.getList()
        }
      },
    },
  ]
  const dialogVisible = ref<boolean>(false)
  const dialogFormModel = ref<any>({})

  const handleOpenDialog = () => {
    dialogFormModel.value = {
      ca: 'letsencrypt',
    }
    dialogVisible.value = true
  }

  async function onLoadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')

    const { success, data } = await DomainAcmeAccountApi.page(params)

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

  async function handleSeach() {
    plusPageRef.value?.getList()
  }

  onMounted(() => {
    loadDict(dictKeys)
  })
  return {
    plusPageRef,
    columns,
    actionButtions,
    onLoadData,
    handleSeach,
    dialogVisible,
    dialogFormModel,
    handleOpenDialog,
  }
}
