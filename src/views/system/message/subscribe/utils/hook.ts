import type { FormRules } from 'element-plus'
import type { ActionBarButtonsRow, PageInfo, PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'
import * as msgSubscribeApi from '@/api/modules/system/message/subscribe'
import { clone } from '@/utils'
import { resolveDirective } from 'vue'

export function useOpenApi() {
  const auth = resolveDirective('auth')

  const plusPageRef = ref<PlusPageInstance | null>()
  const plusDialogFormRef = ref<PlusDialogFormInstance | null>()
  const formModel = ref<any>({})
  const formVisible = ref(false)
  const formLoading = ref(false)
  const formRules = ref<FormRules>({
    name: [{ required: true, message: '请输入定义消息名称', trigger: 'blur' }],
    code: [
      { required: true, message: '请输入消息标识', trigger: 'blur' },
      { validator: (_, value, callback) => {
        if (!value) {
          return callback(new Error('请输入消息标识'))
        }
        if (value.includes(' ')) {
          return callback(new Error('消息标识不能包含空格'))
        }
        msgSubscribeApi.hasCode(value, formModel.value.id).then((res) => {
          const { success } = res
          if (success) {
            callback()
          }
          else {
            callback(new Error('消息标识已存在'))
          }
        }).catch(() => {
          callback(new Error('消息标识校验失败'))
        })
      }, trigger: 'blur' },
    ],
  })

  const tableColumns: PlusColumn[] = [
    {
      label: '通知名称',
      prop: 'name',
    },
    {
      label: '通知标识',
      prop: 'code',
    },
    {
      label: '所属模块',
      prop: 'module',
    },
    {
      label: '描述',
      prop: 'desc',
      hideInSearch: true,
      fieldProps: {
        type: 'textarea',
      },
    },
  ]
  const actionButtions: ActionBarButtonsRow[] = [
    {
      text: '编辑',
      props: {
        type: 'primary',
        underline: 'never',
      },
      directives: [
        [auth, 'sys:open:api:update'],
      ],
      onClick: ({ row }) => {
        formModel.value = clone(row, true)
        formVisible.value = true
      },
    },
    {
      text: '删除',
      props: {
        type: 'danger',
        underline: 'never',
      },
      directives: [
        [auth, 'sys:open:api:del'],
      ],
      confirm: {
        title: '删除订阅消息',
        message: '确定删除该订阅消息？',
      },
      onConfirm: async ({ row }) => {
        const { id } = row
        const { success } = await msgSubscribeApi.remove(id)
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
    const { data, success } = await msgSubscribeApi.page(params)
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

  function addNew() {
    formModel.value = {
      status: true,

    }
    formVisible.value = true
  }

  async function saveData() {
    const { id } = formModel.value
    const { success } = id ? await msgSubscribeApi.update(id, formModel.value) : await msgSubscribeApi.save(formModel.value)
    if (success) {
      formVisible.value = false
      plusPageRef.value?.getList()
    }
  }
  return {
    plusPageRef,
    plusDialogFormRef,
    formModel,
    formVisible,
    formLoading,
    formRules,
    actionButtions,
    tableColumns,
    loadData,
    addNew,
    saveData,
  }
}
