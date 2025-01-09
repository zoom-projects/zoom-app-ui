import type { PageInfo, PlusColumn, PlusPageInstance } from 'plus-pro-components'
import * as noticeMessageApi from '@/api/modules/auth'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { dictKeys, readStatusDictKey } from './const'

export function useMessageListHook() {
  const { loadDict, getDict, toOptions } = useDictStore()

  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const readingVisible = ref(false)
  const readingData = ref<any>(null)
  const columns: PlusColumn[] = [
    {
      label: '关键字',
      prop: 'keyword',
      hideInTable: true,
      fieldProps: {
        placeholder: '标题/内容',
      },
    },
    {
      label: '消息',
      prop: 'title',
      width: 200,
      hideInSearch: true,
      render: (_, { row }) => {
        return h('a', {
          style: {
            color: '#1677ff',
            textDecoration: 'none',
            backgroundColor: 'transparent',
            outline: 'none',
            cursor: 'pointer',
            transition: 'color 0.3s',
          },
          onClick: () => {
            readingData.value = row
            readingVisible.value = true
          },
        }, row.title)
      },
    },
    {
      label: '已读',
      prop: 'status',
      valueType: 'select',
      options: computed(() => toOptions(readStatusDictKey)),
      render: (value) => {
        const item = getDict(readStatusDictKey, value)
        return h(ElTag, { type: item.color }, () => item.label)
      },
    },
    {
      label: '时间',
      prop: 'created',
      valueType: 'plus-date-picker',
      fieldProps: {
        valueFormat: 'YYYY-MM-DD',
        type: 'date',
      },
    },
  ]

  async function loadData(query?: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    // created[]
    if (params.created && params.created.length > 0) {
      params.beginTime = params.created[0]
      params.endTime = params.created[1]
      Reflect.deleteProperty(params, 'created')
    }
    params.sorts = 'created desc'

    const { success, data } = await noticeMessageApi.getNoticeMsg(params)
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

  onMounted(() => {
    loadDict(dictKeys)
  })

  return {
    plusPageRef,
    columns,
    readingVisible,
    readingData,
    loadData,
  }
}
