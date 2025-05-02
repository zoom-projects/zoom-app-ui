import type { ActionBarButtonsRow, PageInfo, PlusColumn, PlusPageInstance } from 'plus-pro-components'
import * as messageApi from '@/api/modules/system/message'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { computed, resolveDirective } from 'vue'
import { dictKeys, messageTypeDictKey, msgSendStatusDictKey } from './const'

export function useMessage() {
  const auth = resolveDirective('auth')
  const plusPageRef = ref<PlusPageInstance | null>()
  const { toOptions, loadDict, getDict } = useDictStore()
  const formVisible = ref(false)
  const formModel = ref<any>({})
  const tableColumns: PlusColumn[] = [
    {
      label: '消息标题',
      prop: 'msgTitle',
    },
    {
      label: '消息类型',
      prop: 'msgType',
      valueType: 'select',
      options: computed(() => toOptions(messageTypeDictKey)),
      render: (value) => {
        const item = getDict(messageTypeDictKey, value)
        return h(ElTag, {}, () => item.label)
      },
    },
    {
      label: '接收者',
      prop: 'msgReceiver',
      render: (value, { row }) => {
        return h(
          'span',
          [
            row.msgReceiverDecrypted ? row.msgReceiverDecrypt : '*****',
            h(
              ElTag,
              {
                plain: true,
                class: 'cursor-pointer',
                onClick: async () => {
                  const { success, data } = await messageApi.decrypt(value)
                  if (success) {
                    row.msgReceiverDecrypt = data
                  }
                  row.msgReceiverDecrypted = !row.msgReceiverDecrypted
                },
              },
              () => '展示',

            ),
          ],
        )
      },
    },
    {
      label: '消息内容',
      prop: 'msgContent',
      render: (value, { row }) => {
        return h(
          'span',
          [
            row.msgContentDecrypted ? row.msgContentDecrypt : '*****',
            h(
              ElTag,
              {
                plain: true,
                class: 'cursor-pointer',
                onClick: async () => {
                  const { success, data } = await messageApi.decrypt(value)
                  if (success) {
                    row.msgContentDecrypt = data
                  }
                  row.msgContentDecrypted = !row.msgContentDecrypted
                },
              },
              () => '展示',

            ),
          ],
        )
      },
      hideInSearch: true,
    },
    {
      label: '发送时间',
      prop: 'msgSendTime',
      hideInSearch: true,
    },
    {
      label: '发送状态',
      prop: 'msgSendStatus',
      valueType: 'select',
      options: computed(() => toOptions(msgSendStatusDictKey)),
      render: (value) => {
        const items = getDict(msgSendStatusDictKey, value)
        return h(ElTag, { type: items.color }, () => items.label)
      },
    },
    {
      label: '失败原因',
      prop: 'msgResult',
      hideInSearch: true,
    },
  ]
  const buttionActions: ActionBarButtonsRow[] = [
    {
      text: '删除',
      props: {
        type: 'primary',
        underline: 'never',
      },
      confirm: {
        title: '删除提示',
        message: '确定删除该数据吗？',
      },
      onConfirm: async ({ row }) => {
        const { success } = await messageApi.remove(row.id)
        if (success) {
          ElMessage.success('删除成功')
          plusPageRef.value?.getList()
        }
      },
    },
  ]

  async function loadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    params.sorts = 'created desc'
    const { data, success } = await messageApi.page(params)
    if (success) {
      return {
        total: data.total,
        data: data.records,
      }
    }
    return {
      total: 0,
      data: [],
    }
  }

  onBeforeMount(() => {
    loadDict(dictKeys)
  })
  return {
    plusPageRef,
    formVisible,
    formModel,
    tableColumns,
    buttionActions,
    loadData,
  }
}
