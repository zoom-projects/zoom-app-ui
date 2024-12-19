import type { FormRules } from 'element-plus'
import type { ActionBarButtonsRow, PageInfo, PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'
import * as gorokuApi from '@/api/modules/goroku/info'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { resolveDirective } from 'vue'
import { dictKeys, gorokuAuditReason, gorokuAutidStatusDictKey, gorokuTypeDictKey } from './const'

export function useGorokuInfo() {
  const { toOptions, getDict, loadDict } = useDictStore()

  const auth = resolveDirective('auth')
  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const plusDialogFormRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const formAuditVisible = ref(false)
  const formVisible = ref(false)
  const formModel = ref<any>({})
  const formAuditModel = ref<any>({})
  const formRules: FormRules = {
    type: [{ required: true, message: '请选择类型', trigger: 'change' }],
    goroku: [{ required: true, message: '请输入语句', trigger: 'change' }],
  }
  const submitLoading = ref(false)
  const auditLoading = ref(false)
  const createFilter = (queryString: string) => {
    return (auditReason: string) => {
      return (
        auditReason.toLowerCase().includes(queryString.toLowerCase())
      )
    }
  }
  const formColumns: PlusColumn[] = [
    {
      label: '类型',
      prop: 'type',
      valueType: 'select',
      options: computed(() => toOptions(gorokuTypeDictKey)),
    },
    {
      label: '语句',
      prop: 'goroku',
      fieldProps: {
        type: 'textarea',
      },
    },
    {
      label: '来源',
      prop: 'from',
    },
    {
      label: '作者',
      prop: 'fromWho',
    },
    {
      label: '审核状态',
      prop: 'auditStatus',
      valueType: 'select',
      options: computed(() => toOptions(gorokuAutidStatusDictKey)),
      render: (value) => {
        const item = getDict(gorokuAutidStatusDictKey, value)
        return h(ElTag, { type: item.color }, () => item.label)
      },
      hideInForm: true,
    },
    {
      label: '审核人',
      prop: 'auditor',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      label: '创建人',
      prop: 'createdBy',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      label: '创建时间',
      prop: 'created',
      hideInSearch: true,
      hideInForm: true,
    },
  ]
  const formAuditColumns: PlusColumn[] = [
    {
      label: '审核状态',
      prop: 'auditStatus',
      valueType: 'select',
      options: computed(() => toOptions(gorokuAutidStatusDictKey).filter((item: any) => item.value !== -1)),
      render: (value) => {
        const item = getDict(gorokuAutidStatusDictKey, value)
        return h(ElTag, { type: item.color }, () => item.label)
      },
      formProps: {
        rules: {
          auditStatus: [{ required: true, message: '请选择审核状态', trigger: 'change' }],
        },
      },
    },
    {
      label: '审核原因',
      prop: 'auditReason',
      valueType: 'autocomplete',
      fieldProps: {
        type: 'textarea',
        fetchSuggestions: (queryString: string, cb: any) => {
          let results: any = queryString
            ? gorokuAuditReason.filter(createFilter(queryString))
            : gorokuAuditReason
          results = results.map((item: string) => {
            return {
              value: item,
              label: item,
            }
          })
          cb(results)
        },

      },
      formProps: {
        rules: {
          auditReason: [{ required: true, message: '请输入审核原因', trigger: 'change' }],
        },
      },
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
        [auth, 'goroku:info:update'],
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
      confirm: {
        title: '提示',
        message: '确定删除吗',
      },
      directives: [
        [auth, 'goroku:info:delete'],
      ],
      onConfirm: async ({ row }) => {
        const { success } = await gorokuApi.remove(row.id)
        if (success) {
          ElMessage.success('删除成功')
          plusPageRef.value?.getList()
        }
      },
    },
    {
      text: '审核',
      props: {
        type: 'success',
        underline: false,
      },
      directives: [
        [auth, 'goroku:info:audit'],
      ],
      onClick: ({ row }) => {
        formModel.value = clone(row, true)
        formAuditModel.value = {
        }
        formAuditVisible.value = true
      },
    },
  ]

  async function handleAdd() {
    formModel.value = {}
    formVisible.value = true
  }

  async function handleSave() {
    submitLoading.value = true
    const { success } = formModel.value.id
      ? await _update().finally(() => {
        submitLoading.value = false
      })
      : await _save().finally(() => {
        submitLoading.value = false
      })
    if (success) {
      ElMessage.success('保存成功')
      formVisible.value = false
      plusPageRef.value?.getList()
    }
  }
  async function handleAudit() {
    auditLoading.value = true
    const body = {
      ids: [formModel.value.id],
      auditStatus: formAuditModel.value.auditStatus,
      auditReason: formAuditModel.value.auditReason,
    }
    const { success } = await gorokuApi.audit(body).finally(() => {
      auditLoading.value = false
    })
    if (success) {
      ElMessage.success('操作成功')
      formAuditVisible.value = false
      formAuditModel.value = {}
      plusPageRef.value?.getList()
    }
  }

  async function _save() {
    return gorokuApi.save(formModel.value)
  }
  async function _update() {
    return gorokuApi.update(formModel.value.id, formModel.value)
  }

  const loadData = async (query: PageInfo & any) => {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    params.sorts = 'status desc,created desc'

    const { success, data } = await gorokuApi.page(params)
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
    plusDialogFormRef,
    formVisible,
    formAuditVisible,
    formModel,
    formAuditModel,
    submitLoading,
    auditLoading,
    formColumns,
    formAuditColumns,
    formRules,
    actionButtins,
    loadData,
    handleAdd,
    handleSave,
    handleAudit,
  }
}
