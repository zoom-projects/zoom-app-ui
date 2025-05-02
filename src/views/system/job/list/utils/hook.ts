import type { FormRules } from 'element-plus'
import type { ActionBarButtonsRow, PageInfo, PlusColumn, PlusDialogFormInstance, PlusDialogInstance, PlusPageInstance } from 'plus-pro-components'
import * as jobApi from '@/api/modules/system/job'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { dictKeys, jobStatusDictKey, systemAppDictKey } from './const'

export function useJob() {
  const { toOptions, getDict, loadDict } = useDictStore()
  const plusPageRef = ref<PlusPageInstance | null>(null)
  const plusDialogFormRef = ref<PlusDialogFormInstance | null>(null)
  const submitLoading = ref(false)
  const formVisible = ref(false)
  const defaultFormModel = {
    status: true,
  }
  const formModel = ref<any>({})
  const formRules: FormRules = {
    appName: [{ required: true, message: '请选择归属应用', trigger: 'blur' }],
    jobClassName: [{ required: true, message: '请输入任务类名', trigger: 'blur' }],
    cronExpression: [{ required: true, message: '请输入cron表达式', trigger: 'blur' }],
  }
  const tableColumns: PlusColumn[] = [
    {
      label: '归属应用',
      prop: 'appName',
      valueType: 'select',
      options: computed(() => toOptions(systemAppDictKey)),
    },
    {
      label: '任务类名',
      prop: 'jobClassName',
    },
    {
      label: '参数',
      prop: 'parameter',
      hideInSearch: true,
    },
    {
      label: 'cron表达式',
      prop: 'cronExpression',
      hideInSearch: true,
      fieldProps: {
        placeholder: '请输入cron表达式',
      },
    },
    {
      label: '描述',
      prop: 'description',
    },
    {
      label: '状态',
      prop: 'status',
      valueType: 'select',
      options: computed(() => toOptions(jobStatusDictKey)),
      render: (value) => {
        const item = getDict(jobStatusDictKey, value)
        return h(ElTag, { type: item.color }, () => item.label)
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
      confirm: {
        title: '提示',
        message: '确定删除吗',
      },
      onConfirm: async ({ row }) => {
        const { success } = await jobApi.remove(row.id)
        if (success) {
          ElMessage.success('删除成功')
          plusPageRef.value?.getList()
        }
      },
    },
    {
      text: '启动',
      show: row => !row.status,
      props: {
        type: 'success',
        underline: 'never',
      },
      confirm: {
        title: '提示',
        message: '确定启动吗',
      },
      onConfirm: async ({ row }) => {
        const { success } = await jobApi.start(row.id)
        if (success) {
          ElMessage.success('启动成功')
          plusPageRef.value?.getList()
        }
      },
    },
    {
      text: '暂停',
      show: row => row.status,
      props: {
        type: 'warning',
        underline: 'never',
      },
      confirm: {
        title: '提示',
        message: '确定暂停吗',
      },
      onConfirm: async ({ row }) => {
        const { success } = await jobApi.pause(row.id)
        if (success) {
          ElMessage.success('暂停成功')
          plusPageRef.value?.getList()
        }
      },
    },
    {
      text: '立即执行',
      props: {
        type: 'primary',
        underline: 'never',
      },
      confirm: {
        title: '提示',
        message: '确定立即执行吗',
      },
      onConfirm: async ({ row }) => {
        const { success } = await jobApi.run(row.id)
        if (success) {
          ElMessage.success('执行成功')
        }
      },
    },
  ]

  function addNew() {
    formModel.value = { ...defaultFormModel }
    formVisible.value = true
  }

  async function loadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    params.sorts = 'status desc,created desc'
    const { data, success } = await jobApi.page(params)
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

  async function _save() {
    return jobApi.save(formModel.value)
  }
  async function _update() {
    return jobApi.update(formModel.value.id, formModel.value)
  }

  const plusDialogRef = ref<Nullable<PlusDialogInstance>>(null)
  const crontabRef = ref<Nullable<any>>(null)
  const cronTabDialogVisible = ref(false)

  function handleShowCronTab() {
    cronTabDialogVisible.value = true
  }

  function handleHideCronTab() {
    cronTabDialogVisible.value = false
    crontabRef.value?.clearCron()
  }

  function handleCronTabConfirm(cron: string) {
    formModel.value.cronExpression = cron
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
    submitLoading,
    tableColumns,
    actionButtions,
    addNew,
    handleSave,
    loadData,
    handleShowCronTab,

    plusDialogRef,
    crontabRef,
    cronTabDialogVisible,
    handleHideCronTab,
    handleCronTabConfirm,
  }
}
