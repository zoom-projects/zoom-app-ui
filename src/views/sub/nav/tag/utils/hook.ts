import type { FormRules } from 'element-plus'
import type { ActionBarButtonsRow, PageInfo, PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'
import * as navTagApi from '@/api/modules/nav/tag'
import { clone } from '@/utils'
import { resolveDirective } from 'vue'

export function useNavTagHook() {
  const auth = resolveDirective('auth')
  const plusPageRef = ref<Nullable<PlusPageInstance>>()
  const plusDialogFormRef = ref<Nullable<PlusDialogFormInstance>>()
  const formModel = ref<any>({})
  const formRules: FormRules = {
    name: [{ required: true, message: '请输入标签名称', trigger: 'change' }],
  }
  const dialogFormVisible = ref(false)
  const dialogSubmitLoading = ref(false)

  const formColumns: PlusColumn[] = [
    {
      label: '标签名称',
      prop: 'name',
    },
  ]
  const actionButtins: ActionBarButtonsRow[] = [
    {
      text: '编辑',
      props: {
        type: 'primary',
        underline: false,
      },
      directives: [
        [auth, 'nav:tag:update'],
      ],
      onClick: ({ row }) => {
        formModel.value = clone(row, true)
        dialogFormVisible.value = true
      },
    },
    {
      text: '删除',
      props: {
        type: 'danger',
        underline: false,
      },
      directives: [
        [auth, 'nav:tag:delete'],
      ],
      confirm: {
        title: '提示',
        message: '确定删除吗',
      },
      onConfirm: async ({ row }) => {
        const { success } = await navTagApi.remove(row.id)
        if (success) {
          ElMessage.success('删除成功')
          plusPageRef.value?.getList()
        }
      },
    },
  ]

  async function handleAdd() {
    formModel.value = {}
    dialogFormVisible.value = true
  }

  async function loadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    params.sorts = 'status desc,created desc'

    const { success, data } = await navTagApi.page(params)
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

  async function handleSave() {
    dialogSubmitLoading.value = true
    const { success } = formModel.value.id
      ? await _update().finally(() => {
        dialogSubmitLoading.value = false
      })
      : await _save()
        .finally(() => {
          dialogSubmitLoading.value = false
        })

    if (success) {
      ElMessage.success('保存成功')
      dialogFormVisible.value = false
      plusPageRef.value?.getList()
    }
  }

  async function _save() {
    return navTagApi.save(formModel.value)
  }
  async function _update() {
    return navTagApi.update(formModel.value.id, formModel.value)
  }

  return {
    plusPageRef,
    plusDialogFormRef,
    formColumns,
    formRules,
    formModel,
    dialogFormVisible,
    dialogSubmitLoading,
    actionButtins,
    loadData,
    handleAdd,
    handleSave,
  }
}
