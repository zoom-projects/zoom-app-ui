import type { ActionBarButtonsRow, PageInfo, PlusColumn, PlusPageInstance } from 'plus-pro-components'
import * as taskApi from '@/api/modules/system/task'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { resolveDirective } from 'vue'
import { dictKeys, taskStateDictKey, taskTypeDictKey } from './const'

export function useTaskListHook() {
  const {
    toOptions,
    getDict,
    loadDict,
  } = useDictStore()

  const auth = resolveDirective('auth')

  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const columns: PlusColumn[] = [
    {
      label: '任务编号',
      prop: 'taskNum',
    },
    {
      label: '任务名称',
      prop: 'taskName',
    },
    {
      label: '任务类型',
      prop: 'type',
      valueType: 'select',
      options: computed(() => toOptions(taskTypeDictKey)),
    },
    {
      label: '任务状态',
      prop: 'disState',
      valueType: 'select',
      options: computed(() => toOptions(taskStateDictKey)),
      render: (val) => {
        const item = getDict(taskStateDictKey, val)
        return h(ElTag, { type: item.color }, () => item.label)
      },
    },
    {
      label: '任务描述',
      prop: 'taskDesc',
      hideInSearch: true,
    },
    {
      label: '任务开始时间',
      prop: 'disTimeBegin',
      hideInSearch: true,
    },
    {
      label: '任务结束时间',
      prop: 'disTimeEnd',
      hideInSearch: true,
    },
    {
      label: '消息',
      prop: 'message',
      hideInSearch: true,
    },
  ]
  const actionButtions: ActionBarButtonsRow[] = [
    {
      text: '下载',
      props: {
        type: 'primary',
        underline: 'never',
      },
      confirm: {
        title: '确认下载',
        message: '确认下载该任务附件吗？',
      },
      directives: [
        [auth, 'task:list:download'],
      ],
      onConfirm: ({ row }) => {
        window.open(row.fileUrl)
      },
    },
  ]

  async function onLoad(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    params.sorts = 'created desc'

    const { success, data } = await taskApi.page(params)
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

  onBeforeMount(() => {
    loadDict(dictKeys)
  })

  return {
    plusPageRef,
    columns,
    actionButtions,
    onLoad,
  }
}
