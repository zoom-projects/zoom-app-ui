import type { FormRules } from 'element-plus'
import type { ActionBarButtonsRow, PageInfo, PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'
import * as openApiApi from '@/api/modules/system/openApi'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { resolveDirective } from 'vue'
import { dictKeys, statusDictKey } from './const'

export function useOpenApi() {
  const { loadDict, getDict, toOptions } = useDictStore()
  const auth = resolveDirective('auth')

  const plusPageRef = ref<PlusPageInstance | null>()
  const plusDialogFormRef = ref<PlusDialogFormInstance | null>()
  const formModel = ref<any>({})
  const formVisible = ref(false)
  const formLoading = ref(false)
  const formRules = ref<FormRules>({
    apiName: [{ required: true, message: '请输入接口名称', trigger: 'blur' }],
    apiCode: [
      { required: true, message: '请输入接口标识', trigger: 'blur' },
      { validator: (_, value, callback) => {
        if (!value) {
          return callback(new Error('请输入接口标识'))
        }
        if (value.includes(' ')) {
          return callback(new Error('接口标识不能包含空格'))
        }
        openApiApi.hasCode(value, formModel.value.id).then((res) => {
          const { success } = res
          if (success) {
            callback()
          }
          else {
            callback(new Error('接口标识已存在'))
          }
        }).catch(() => {
          callback(new Error('接口标识校验失败'))
        })
      }, trigger: 'blur' },
    ],
  })

  const tableColumns: PlusColumn[] = [
    {
      label: '接口名称',
      prop: 'apiName',
    },
    {
      label: '接口标识',
      prop: 'apiCode',
    },
    {
      label: '所属模块',
      prop: 'module',
    },
    {
      label: '描述',
      prop: 'description',
      hideInSearch: true,
      fieldProps: {
        type: 'textarea',
      },
    },
    {
      label: '状态',
      prop: 'status',
      valueType: 'select',
      options: computed(() => toOptions('systemStatus')),
      render: (value) => {
        const item = getDict(statusDictKey, value)
        return h(ElTag, { type: item.color }, () => item.label)
      },
    },
  ]
  const actionButtions: ActionBarButtonsRow[] = [
    {
      text: '编辑',
      props: {
        type: 'primary',
        underline: false,
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
        underline: false,
      },
      directives: [
        [auth, 'sys:open:api:del'],
      ],
      confirm: {
        title: '删除接口',
        message: '确定删除该接口？',
      },
      onConfirm: async ({ row }) => {
        const { id } = row
        const { success } = await openApiApi.remove(id)
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
    const { data, success } = await openApiApi.page(params)
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
    const { success } = id ? await openApiApi.update(id, formModel.value) : await openApiApi.save(formModel.value)
    if (success) {
      formVisible.value = false
      plusPageRef.value?.getList()
    }
  }

  onBeforeMount(() => {
    loadDict(dictKeys)
  })

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
