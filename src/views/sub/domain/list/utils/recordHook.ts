import type { DomainRecord } from '/src/api/modules/domain/record/types'
import type { DomainAccount } from '@/api/modules/domain/account/types'
import type { DomainInfo } from '@/api/modules/domain/info/types'
import type { ActionBarButtonsRow, FormChangeCallBackParams, PageInfo, PlusColumn, PlusPageInstance } from 'plus-pro-components'
import type { PlusDialogFormProps } from 'plus-pro-components/lib/components/index.js'
import { list as domainAccountListApi } from '@/api/modules/domain/account'
import { list as domainInfoListApi } from '@/api/modules/domain/info'
import * as domainRecordApi from '@/api/modules/domain/record'
import ReIcon from '@/components/ReIcon/index.vue'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { Delete, Edit } from '@element-plus/icons-vue'
import { dictKeys, domainPlatformDictKey, domainRecordTypeDictKey } from './const'

export function useRecordHook(props: { visible: boolean, domainObj?: any }) {
  const { toOptions, getDict, loadDict } = useDictStore()
  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const domainAccountList = ref<DomainAccount.ResAccount[]>([])
  const domainInfoList = ref<DomainInfo.ResDomain[]>([])
  const currentCloud = ref<any>({})
  const currentDomain = ref<any>({})
  const domainOptions = computed(() => {
    return domainInfoList.value.map((item) => {
      const cloudInfo = getDict(domainPlatformDictKey, item.cloud)
      return {
        label: `${cloudInfo.label} - ${item.domain}`,
        value: item.id,
        cloud: cloudInfo,
      }
    })
  })
  const groupCount = ref<DomainRecord.ResGroupCount[]>()
  const recordTotal = computed(() => {
    return groupCount.value?.reduce((prev, curr) => {
      return prev + curr.count
    }, 0)
  })
  const syncState = ref(false)
  const tableSelectedState = ref(false)
  const deleteState = ref(false)

  async function handleDomainChange(value: string) {
    const domain = domainInfoList.value.find(item => item.id === value)
    currentDomain.value = clone(domain, true)
    currentCloud.value = getDict(domainPlatformDictKey, domain?.cloud)
    plusPageRef.value?.getList()
  }

  async function _getCurrentCloud() {
    currentCloud.value = getDict(domainPlatformDictKey, props.domainObj.cloud)
  }

  async function _init() {
    if (!props.domainObj) {
      return
    }
    _getCurrentCloud()
    currentDomain.value = clone(props.domainObj, true)
  }

  async function _loadDomainAccountList() {
    const { success, data } = await domainAccountListApi()
    if (success) {
      domainAccountList.value = data
    }
  }
  async function _loadDomainInfoList() {
    const { success, data } = await domainInfoListApi()
    if (success) {
      domainInfoList.value = data
    }
  }
  async function _loadGroupCount() {
    const id = currentDomain.value?.id
    if (!id) {
      return
    }
    const { success, data } = await domainRecordApi.groupCount(id)
    if (success) {
      groupCount.value = data
    }
  }

  const formColumns: PlusColumn[] = [
    {
      label: '解析类型',
      prop: 'type',
      valueType: 'select',
      options: computed(() => toOptions(domainRecordTypeDictKey)),
      hideInForm: true,
      hideInTable: true,
    },
    {
      label: '解析状态',
      prop: 'status',
      valueType: 'select',
      options: computed(() => { return [{ label: '启用', value: true }, { label: '禁用', value: false }] }),
      hideInSearch: computed(() => currentCloud.value?.value === 'cf'),
      hideInForm: true,
      hideInTable: true,
    },
    {
      label: '代理状态',
      prop: 'proxyStatus',
      valueType: 'select',
      options: computed(() => [{ label: '已代理', value: true }, { label: '仅DNS', value: false }]),
      hideInSearch: computed(() => currentCloud.value?.value !== 'cf'),
      hideInForm: true,
      hideInTable: true,
    },
    {
      label: '关键字',
      prop: 'keyword',
      hideInTable: true,
      hideInForm: true,
    },
    {
      label: '监控中',
      prop: 'isMonitor',
      hasLabel: false,
      valueType: 'checkbox',
      options: computed(() => [{ label: '监控中', value: true }]),
      hideInForm: true,
      hideInTable: true,
    },

    // table
    {
      label: '主机记录',
      prop: 'name',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      label: '记录类型',
      prop: 'type',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      label: '记录值',
      prop: 'value',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      label: 'TTL',
      prop: 'ttl',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      label: '备注',
      prop: 'remark',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      label: '代理',
      prop: 'proxyStatus',
      options: computed(() => [{ label: '已代理', value: true }, { label: '仅DNS', value: false }]),
      hideInSearch: true,
      hideInForm: true,
      hideInTable: computed(() => currentCloud.value?.value !== 'cf'),
      render: (value) => {
        const proxy = h('div', {
          class: 'flex items-center justify-center',
        }, [
          h(ReIcon, { icon: 'svg-icon:cf-proxy', size: 25 }),
          h('span', '已代理'),
        ])
        const dns = h('div', {
          class: 'flex items-center justify-center',
        }, [
          h(ReIcon, { icon: 'svg-icon:cf-dns', size: 25 }),
          h('span', '仅DNS'),
        ])
        return value ? proxy : dns
      },
    },
    {
      label: '状态',
      prop: 'status',
      valueType: 'switch',
      editable: true,
      hideInSearch: true,
      hideInTable: computed(() => currentCloud.value?.value === 'cf'),
    },
  ]

  async function searchChange() {
    plusPageRef.value?.getList()
  }

  async function syncRecord() {
    const id = currentDomain.value?.id
    if (!id) {
      return
    }
    syncState.value = true
    const { success } = await domainRecordApi.syncRecord(id).finally(() => {
      syncState.value = false
    })
    if (success) {
      ElMessage.success('同步成功')
      plusPageRef.value?.getList()
    }
  }

  async function handleSelectionChange(val: any) {
    if (val && val.length) {
      tableSelectedState.value = true
    }
    else {
      tableSelectedState.value = false
    }
  }

  async function handleFormChange(data: FormChangeCallBackParams) {
    const { row } = data
    await domainRecordApi.update(row.id, row as DomainRecord.ReqUpdate)
  }

  watch(
    () => props.visible,
    (val) => {
      if (val) {
        _init()
      }
    },
  )
  watch(
    currentDomain,
    () => {
      _loadGroupCount()
    },
  )

  async function loadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    Reflect.deleteProperty(params, 'isMonitor')
    if (query.isMonitor && query.isMonitor.length) {
      Reflect.set(params, 'isMonitor', true)
    }

    // Reflect.set
    params.sorts = 'created desc'
    params.domainId = currentDomain.value.id
    const { success, data } = await domainRecordApi.page(params)
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

  const plusDialogFormRef = ref<Nullable<PlusDialogFormProps>>(null)
  const dialogFormVisible = ref(false)
  const dialogFormModel = ref<any>({})
  const dialogFormColumns: PlusColumn[] = [
    {
      label: '主机记录',
      prop: 'name',
      fieldProps: {
        placeholder: '主机记录, @代表根域名',
      },
      fieldSlots: {
        append: () => currentDomain.value.domain,
      },
    },
    {
      label: '记录类型',
      prop: 'type',
      valueType: 'select',
      options: computed(() => toOptions(domainRecordTypeDictKey)),
      fieldProps: {
        clearable: false,
      },
    },
    {
      label: '记录值',
      prop: 'value',
      valueType: 'textarea',
    },
    {
      label: '备注',
      prop: 'remark',
      valueType: 'textarea',
    },
    {
      label: '是否代理',
      prop: 'proxyStatus',
      valueType: 'switch',
      hideInForm: computed(() => currentCloud.value?.value !== 'cf'),
      fieldProps: {
        'active-text': '已代理',
        'inactive-text': '仅DNS',
      },
    },
    {
      label: '是否启用',
      prop: 'status',
      valueType: 'switch',
      hideInForm: computed(() => currentCloud.value?.value === 'cf'),
      fieldProps: {
        'active-text': '启用',
        'inactive-text': '禁用',
      },
    },
  ]
  const dialogFormLoading = ref(false)

  const handleOpenDialogForm = (row?: any) => {
    dialogFormVisible.value = true
    if (row) {
      dialogFormModel.value = clone(row, true)
    }
    else {
      dialogFormModel.value = {}
    }
  }
  const actionButtions: ActionBarButtonsRow[] = [
    {
      text: '编辑',
      props: {
        type: 'primary',
        icon: Edit,
      },
      onClick: ({ row }) => {
        handleOpenDialogForm(row)
      },
    },
    {
      text: '删除',
      props: {
        type: 'danger',
        icon: Delete,
      },
      confirm: {
        message: '确认删除吗？',
        title: '删除',
      },
      onConfirm: async ({ row }) => {
        await _delete([row.id])
      },
    },
  ]

  async function handleDialogFormSubmit() {
    if (dialogFormModel.value.id) {
      _update()
    }
    else {
      _save()
    }
  }

  async function handleDelete() {
    const rows = plusPageRef.value?.plusTableInstance?.tableInstance?.getSelectionRows()
    if (!rows || !rows.length) {
      ElMessage.warning('请选择要删除的数据')
      return
    }
    const ids = rows.map((item: any) => item.id)
    _delete(ids)
  }

  async function _delete(ids: string[]) {
    const { success } = await domainRecordApi.batchDelete(ids)
    if (success) {
      ElMessage.success('操作成功')
      plusPageRef.value?.getList()
    }
  }

  async function _save() {
    const id = currentDomain.value.id
    if (!id) {
      return
    }
    dialogFormLoading.value = true
    const model = clone(dialogFormModel.value, true)
    model.domainId = id
    const { success } = await domainRecordApi.create(model).finally(() => dialogFormLoading.value = false)
    if (success) {
      ElMessage.success('操作成功')
      dialogFormVisible.value = false
      plusPageRef.value?.getList()
    }
  }
  async function _update() {
    const id = currentDomain.value.id
    if (!id) {
      return
    }
    dialogFormLoading.value = true
    const model = clone(dialogFormModel.value, true)
    model.domainId = id
    const { success } = await domainRecordApi.update(model.id, model).finally(() => dialogFormLoading.value = false)
    if (success) {
      ElMessage.success('操作成功')
      dialogFormVisible.value = false
      plusPageRef.value?.getList()
    }
  }

  onMounted(() => {
    loadDict(dictKeys)
    _loadDomainAccountList()
    _loadDomainInfoList()
  })
  return {
    currentCloud,
    currentDomain,
    domainOptions,
    handleDomainChange,

    groupCount,
    recordTotal,
    syncState,
    tableSelectedState,
    deleteState,

    plusPageRef,
    formColumns,

    actionButtions,
    loadData,
    searchChange,
    syncRecord,
    handleSelectionChange,
    handleFormChange,

    plusDialogFormRef,
    dialogFormVisible,
    dialogFormModel,
    dialogFormColumns,
    dialogFormLoading,
    handleOpenDialogForm,
    handleDialogFormSubmit,
    handleDelete,
  }
}
