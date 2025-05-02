import type { FormRules } from 'element-plus'
import type { ActionBarButtonsRow, PageInfo, PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'
import * as messageTemplateApi from '@/api/modules/system/messageTemplate'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { resolveDirective } from 'vue'
import { dictKeys, messageTemplateStatusDictKey, messageTypeDictKey } from './const'

export function useMessageTemplate() {
  const { toOptions, loadDict, getDict } = useDictStore()
  const auth = resolveDirective('auth')
  const plusPageRef = ref<PlusPageInstance | null>(null)
  const plusDialogFormRef = ref<PlusDialogFormInstance | null>(null)
  const formVisible = ref(false)
  const formModel = ref<any>({})
  const submitLoading = ref(false)
  const formRules: FormRules = {
    templateName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
    templateCode: [
      { required: true, message: '请输入模板编码', trigger: 'blur' },
      {
        validator: (_, value, callback) => {
          if (!value) {
            return callback(new Error('请输入模板编码'))
          }
          messageTemplateApi.hasCode(value, formModel.value.id)
            .then(() => {
              callback()
            })
            .catch(() => {
              callback(new Error('模板编码校验失败'))
            })
        },
      },

    ],
    templateType: [{ required: true, message: '请选择模板类型', trigger: 'change' }],
    templateContentHtml: [{ required: true, message: '请输入模板内容', trigger: 'blur' }],
  }

  const tableColumns: PlusColumn[] = [
    {
      label: '模板名称',
      prop: 'templateName',
    },
    {
      label: '模板编码',
      prop: 'templateCode',
      fieldProps: computed(() => {
        return {
          disabled: formModel.value.id !== undefined,
        }
      }),
    },
    {
      label: '模板类型',
      prop: 'templateType',
      valueType: 'select',
      options: computed(() => toOptions(messageTypeDictKey)),

    },
    {
      label: '模板内容',
      prop: 'templateContentText',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      label: '模版内容',
      prop: 'templateContentHtml',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      label: '状态',
      prop: 'status',
      valueType: 'select',
      options: computed(() => toOptions(messageTemplateStatusDictKey)),
      render: (value) => {
        const item = getDict(messageTemplateStatusDictKey, value)
        return h(ElTag, { type: item.color }, () => item.label)
      },
    },
    {
      label: '创建时间',
      prop: 'created',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      label: '更新人',
      prop: 'modifiedBy',
      hideInSearch: true,
      hideInForm: true,
    },
  ]

  const actionButtons: ActionBarButtonsRow[] = [
    {
      text: '编辑',
      props: {
        type: 'primary',
        underline: 'never',
      },
      directives: [
        [auth, 'sys:message:template:update'],
      ],
      onClick: ({ row }) => {
        formModel.value = clone(row, true)
        formVisible.value = true
      },
    },
    {
      text: '删除',
      props: {
        type: 'primary',
        underline: 'never',
      },
      directives: [
        [auth, 'sys:message:template:delete'],
      ],
      confirm: {
        title: '删除提示',
        message: '确定删除该数据吗？',
      },
      onConfirm: async ({ row }) => {
        const { success } = await messageTemplateApi.remove(row.id)
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

    const { data, success } = await messageTemplateApi.page(params)
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

  async function addNew() {
    plusDialogFormRef.value?.formInstance?.resetFields()
    formModel.value = {
      status: true,
    }
    formVisible.value = true
  }

  async function contentChange(data: { content: string, text: string }) {
    formModel.value.templateContentHtml = data.content
    formModel.value.templateContentText = data.text
  }

  async function handleSave() {
    console.log(formModel.value)
    submitLoading.value = true
    const { success } = formModel.value.id
      ? await _update()
        .finally(() => submitLoading.value = false)
      : await _save()
        .finally(() => submitLoading.value = false)

    if (success) {
      formVisible.value = false
      ElMessage.success('操作成功')
      // 重置表单
      plusDialogFormRef.value?.formInstance?.resetFields()
      // 重置表单校验
      plusDialogFormRef.value?.formInstance?.clearValidate()
      // 刷新列表
      plusPageRef.value?.getList()
    }
  }

  async function _save() {
    const data = clone(formModel.value, true)
    return messageTemplateApi.save(data)
  }
  async function _update() {
    const data = clone(formModel.value, true)
    return messageTemplateApi.update(data.id, data)
  }

  onBeforeMount(() => {
    loadDict(dictKeys)
  })

  return {
    plusPageRef,
    plusDialogFormRef,
    formVisible,
    formModel,
    formRules,
    tableColumns,
    submitLoading,
    actionButtons,
    addNew,
    contentChange,
    handleSave,
    loadData,
  }
}
