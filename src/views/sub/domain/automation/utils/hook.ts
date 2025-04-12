import type { FormRules } from 'element-plus'
import type { ActionBarProps, PageInfo, PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'
import { cache as DomainAcmeAccountCacheApi } from '@/api/modules/domain/acme/account'
import * as domainAutomationSettingApi from '@/api/modules/domain/automation'
import { cache as DomainCertDeployCacheApi } from '@/api/modules/domain/deploy/setting'
import { list as DomainInfoListApi } from '@/api/modules/domain/info'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { Delete, Edit, Tickets } from '@element-plus/icons-vue'
import { dictKeys, domainCADictKey, domainCertAlgorithmDictKey, domainCertDeployTypeDictKey } from './const'

export function useDomainAutomationHook() {
  const { loadDict, getDict, toOptions } = useDictStore()
  const currentCa = ref<any>({})
  const currentCaOptions = ref<any>([])
  const acmeAccountOptions = ref<any>([])
  const deployOptions = ref<any>([])
  const domainInfoList = ref<any>([])

  const formModel = ref<any>({})
  const formDomains = ref<any>([])
  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const dialogLoading = ref(false)
  const columns: PlusColumn[] = [
    {
      label: '域名',
      prop: 'domain',
    },
    {
      label: '证书厂商',
      prop: 'ca',
      valueType: 'select',
      options: computed(() => toOptions(domainCADictKey)),
      fieldProps: {
        placeholder: '请选择证书厂商',
        onChange: (value: string) => {
          currentCa.value = getDict(domainCADictKey, value)
          currentCaOptions.value = acmeAccountOptions.value.filter((item: any) => item.ca === currentCa.value
            .value)
          formModel.value.acmeAccount = currentCaOptions.value[0]?.value
        },
      },
    },
    {
      label: 'ACME账号',
      prop: 'acmeAccountId',
      valueType: 'select',
      options: computed(() => acmeAccountOptions.value),
    },
    {
      label: '加密算法',
      prop: 'certAlgorithm',
      valueType: 'select',
      options: computed(() => toOptions(domainCertAlgorithmDictKey)),
      fieldProps: {
        placeholder: '请选择加密算法',
      },
    },
    {
      label: '部署方式',
      prop: 'deploySettingId',
      valueType: 'select',
      options: computed(() => deployOptions.value),
    },
    {
      label: '是否启用',
      prop: 'enabled',
      valueType: 'select',
      options: [
        {
          label: '启用',
          value: true,
        },
        {
          label: '禁用',
          value: false,
        },
      ],
      fieldProps: {
        placeholder: '请选择是否启用',
      },

    },
    {
      label: '上一次执行时间',
      prop: 'lastExecTime',
      hideInForm: true,
    },
  ]
  const actionBar: ActionBarProps = {
    buttons: [
      {
        text: '编辑',
        icon: Edit,
        tooltipProps: {
          content: '编辑',
        },
        onClick: async ({ row }: any) => {
          handleOpenDialog(row)
        },
      },
      {
        text: '删除',
        icon: Delete,
        tooltipProps: {
          content: '删除',
        },
        confirm: {
          message: '是否删除',
        },
        onConfirm: async ({ row }: any) => {
          remove(row.id)
        },
      },
      // {
      //   text: '执行记录',
      //   icon: Tickets,
      //   tooltipProps: {
      //     content: '执行记录',
      //   },
      // },
    ],
    type: 'icon',
    confirmType: 'popconfirm',
  }
  const formColumns: PlusColumn[] = [
    {
      label: '域名',
      prop: 'domain',
    },
    {
      label: '证书厂商',
      prop: 'ca',
      valueType: 'select',
      options: computed(() => toOptions(domainCADictKey)),
      fieldProps: {
        placeholder: '请选择证书厂商',
        onChange: (value: string) => {
          currentCa.value = getDict(domainCADictKey, value)
          currentCaOptions.value = acmeAccountOptions.value.filter((item: any) => item.ca === currentCa.value
            .value)
          formModel.value.acmeAccount = currentCaOptions.value[0]?.value
        },
      },
    },
    {
      label: 'ACME账号',
      prop: 'acmeAccountId',
      valueType: 'select',
      options: computed(() => currentCaOptions.value),
    },
    {
      label: '加密算法',
      prop: 'certAlgorithm',
      valueType: 'select',
      options: computed(() => toOptions(domainCertAlgorithmDictKey)),
      fieldProps: {
        placeholder: '请选择加密算法',
      },
      tooltip: {
        content: `ECC 效率高、安全性强，兼容性略差,RSA 效率低，广泛兼容,数字越大越安全，速度越慢`,
      },
    },
    {
      label: '部署方式',
      prop: 'deploySettingId',
      valueType: 'select',
      options: computed(() => deployOptions.value),
    },
    {
      label: '是否启用',
      prop: 'enabled',
      valueType: 'select',
      options: [
        {
          label: '启用',
          value: true,
        },
        {
          label: '禁用',
          value: false,
        },
      ],
      fieldProps: {
        placeholder: '请选择是否启用',
      },

    },
    {
      label: '备注',
      prop: 'remark',
      valueType: 'textarea',
      fieldProps: {
        placeholder: '请输入备注',
        rows: 4,
        maxlength: 200,
        showWordLimit: true,
      },
    },
  ]
  const formRules: FormRules = {
    domain: [
      {
        validator: (rule, value, callback) => {
          if (formDomains.value.length === 0) {
            return new Error('域名不能为空')
          }
          // 判断是否有重复的域名
          const domainSet = new Set()
          for (const domain of formDomains.value) {
            domainSet.add(`${domain.record}.${domain.domain}`)
          }
          if (domainSet.size !== formDomains.value.length) {
            return new Error('域名不能重复')
          }
          // 判断是否有空值
          for (const domain of formDomains.value) {
            if (!domain.record) {
              return new Error('域名不能为空')
            }
          }
          formModel.value.domainList = formDomains.value

          return callback()
        },
        trigger: 'blur',
      },

    ],
    ca: [
      {
        required: true,
        message: '请选择证书厂商',
        trigger: 'change',
      },
    ],
    acmeAccount: [
      {
        required: true,
        message: '请选择ACME账号',
        trigger: 'change',
      },
    ],
    certAlgorithm: [
      {
        required: true,
        message: '请选择加密算法',
        trigger: 'change',
      },
    ],
    deploySettingId: [
      {
        required: true,
        message: '请选择部署方式',
        trigger: 'change',
      },
    ],
  }
  const plusDialogFormRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const dialogVisible = ref(false)

  async function handleOpenDialog(row?: any) {
    if (row) {
      formModel.value = { ...row }
      formDomains.value = row.domainList
    }
    else {
      formModel.value = {
        ca: 'letsencrypt',
        certAlgorithm: 'RSA-2048',
        enabled: true,
      }
    }
    dialogVisible.value = true
  }

  async function handleAddDomainRecord() {
    // 获取上一个域名的值
    if (formDomains.value.length) {
      const lastDomain = formDomains.value[formDomains.value.length - 1]
      formDomains.value.push({
        record: '', // 设置默认值为 '*'
        domain: lastDomain.domain,
      })
    }
    else {
      formDomains.value.push({
        record: '', // 设置默认值为 '*'
        domain: domainInfoList.value[0].label, // 确保有默认值
      })
    }
  }

  async function handleSelectDomain(val: any, index: number) {
    formDomains.value[index].domain = val
  }
  async function handleDeleteDomainRecord(index: number) {
    formDomains.value.splice(index, 1)
  }

  async function handleSave() {
    if (formModel.value.id) {
      _update()
    }
    else {
      _save()
    }
  }

  async function remove(id: string) {
    const { success } = await domainAutomationSettingApi.remove(id)
    if (success) {
      plusPageRef.value?.getList()
    }
  }

  async function _save() {
    dialogLoading.value = true
    const { success } = await domainAutomationSettingApi.save(formModel.value).finally(() => dialogLoading.value = false)
    if (success) {
      plusPageRef.value?.getList()
      dialogVisible.value = false
    }
  }

  async function _update() {
    dialogLoading.value = true
    const { success } = await domainAutomationSettingApi.update(formModel.value.id, formModel.value).finally(() => dialogLoading.value = false)
    if (success) {
      plusPageRef.value?.getList()
      dialogVisible.value = false
    }
  }

  async function loadData(query?: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    const { success, data } = await domainAutomationSettingApi.page(params)
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

  async function _loadAcmeAccount() {
    const { success, data } = await DomainAcmeAccountCacheApi()
    if (success) {
      acmeAccountOptions.value = data.map((item) => {
        return {
          label: `${item.email}`,
          ca: item.ca,
          value: item.id,
        }
      })
    }
  }

  async function _loadDeploy() {
    const { success, data } = await DomainCertDeployCacheApi()
    if (success) {
      deployOptions.value = data.map((item) => {
        const dictKey = getDict(domainCertDeployTypeDictKey, item.deployType) ?? {}
        return {
          label: `${item.label} (${dictKey.label})`,
          value: item.id,
        }
      })
    }
  }
  async function _loadDomainInfoList() {
    const { success, data } = await DomainInfoListApi()
    if (success) {
      domainInfoList.value = data.map((item) => {
        return {
          label: item.domain,
          value: item.id,
        }
      })
    }
  }

  watch(
    () => formModel.value.ca,
    (value) => {
      currentCa.value = getDict(domainCADictKey, value)
      currentCaOptions.value = acmeAccountOptions.value.filter((item: any) => item.ca === currentCa.value
        .value)
      formModel.value.acmeAccount = currentCaOptions.value[0]?.value
    },
  )

  watch(
    () => dialogVisible.value,
    (val) => {
      if (!val) {
        formModel.value = {
          ca: 'letsencrypt',
          certAlgorithm: 'RSA-2048',
          enabled: true,
        }
        formDomains.value = []
        plusDialogFormRef.value?.formInstance.resetFields()
      }
    },
  )

  onMounted(() => {
    loadDict(dictKeys)
    _loadAcmeAccount()
    _loadDeploy()
    _loadDomainInfoList()
  })

  return {
    domainInfoList,
    plusPageRef,
    plusDialogFormRef,
    columns,
    actionBar,
    formColumns,
    formRules,
    dialogLoading,

    dialogVisible,
    formModel,
    formDomains,
    loadData,
    handleOpenDialog,
    handleAddDomainRecord,
    handleSelectDomain,
    handleDeleteDomainRecord,
    handleSave,
  }
}
