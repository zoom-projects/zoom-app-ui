import type { FormRules } from 'element-plus'
import type { PlusColumn, PlusDialogInstance, PlusFormInstance } from 'plus-pro-components'
import type { DialogProps } from './types'
import { getCache as getAcmeAccountCacheApi } from '@/api/modules/domain/acme/account'
import * as domainCertApi from '@/api/modules/domain/cert'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { dictKeys, domainCADictKey, domainCertAlgorithmDictKey } from './const'

export function useCertIssueHook(props: DialogProps, emits: any) {
  const { toOptions, getDict, loadDict } = useDictStore()
  const visible = ref(props.visible)
  const plusDialogRef = ref<Nullable<PlusDialogInstance>>(null)

  const acmeAccountOptions = ref<any[]>([])
  const currentCaOptions = ref<any[]>([])
  const currentCa = ref<any>('')

  const activeStep = ref(props.formModel?.step ?? 0)
  const currentModel = ref<any>(props.formModel ?? {})
  const plusFormRef = ref<Nullable<PlusFormInstance>>(null)
  const formLoading = ref(false)
  const formModel = ref<any>({
    ca: 'letsencrypt',
    certAlgorithm: 'RSA-2048',
  })
  const formColumns: PlusColumn[] = [
    {
      label: '证书厂商',
      prop: 'ca',
      valueType: 'select',
      options: computed(() => toOptions(domainCADictKey)),
      fieldProps: {
        placeholder: '请选择证书厂商',
        onChange: (value: string) => {
          currentCa.value = getDict(domainCADictKey, value)
          currentCaOptions.value = acmeAccountOptions.value.filter(item => item.ca === currentCa.value
            .value)
          formModel.value.acmeAccount = currentCaOptions.value[0]?.value
        },
      },
    },
    {
      label: '申请域名',
      prop: 'domains',
      valueType: 'textarea',
      fieldProps: {
        placeholder: '请输入域名列表，每行一个,请保持统一性，即要么有权验证要么手动验证',
        rows: 5,
      },
      tooltip: {
        content: '申请域名为www.domain.com的证书同时支持保护domain.com',
      },
    },
    {
      label: 'ACME账号',
      prop: 'acmeAccount',
      valueType: 'select',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: computed(() => currentCa.value.isCa),
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
  ]
  const defaultFormRules: FormRules = {
    ca: [{ required: true, message: '请选择证书厂商', trigger: 'change' }],
    domains: [
      { required: true, message: '请输入域名列表', trigger: 'change' },
      {
        asyncValidator: async (_, value, callback) => {
          const domains = value.split('\n').filter((item: string) => item)
          // 是否有重复域名
          const domainSet = new Set(domains)
          if (domainSet.size !== domains.length) {
            callback(new Error('域名列表中存在重复域名'))
            return
          }
          // 定义域名正则表达式，支持多级域名、通配符域名和中文域名
          const domainReg = /^(?:\*\.)?(?:[a-z0-9\u4E00-\u9FA5-]+\.)+[a-z\u4E00-\u9FA5]{2,}$/i
          // 遍历域名列表，验证每个域名
          for (const domain of domains) {
            if (!domainReg.test(domain)) {
              callback(new Error('域名格式不正确'))
              return
            }
          }

          if (domains.length === 0) {
            callback(new Error('请输入域名列表'))
          }
          else if (domains.length > 10) {
            callback(new Error('域名数量不能超过10个'))
          }
          else {
            callback()
          }
        },
        trigger: 'change',
      },
    ],
  }
  const acmeFormRules: FormRules = {
    ...defaultFormRules,
    acmeAccount: [{ required: true, message: '请选择ACME账号', trigger: 'change' }],
  }
  const formRules = computed(() => currentCa.value.isCa ? acmeFormRules : defaultFormRules)

  async function handleClose() {
    visible.value = false
    emits('update:visible', false)
  }

  async function handleFormConfirm() {
    plusFormRef.value?.formInstance?.validate((valid) => {
      if (valid) {
        _formSave()
      }
    })
  }

  async function handleNextStep(step: number) {
    activeStep.value = step
  }

  async function _formSave() {
    const body = clone(formModel.value, true)
    formLoading.value = true
    const { success, data } = await domainCertApi.issue(body).finally(() => {
      formLoading.value = false
    })
    if (success) {
      currentModel.value = data
      handleNextStep(data.step ?? 2)
    }
  }

  watch(
    () => props.visible,
    (val) => {
      visible.value = val
    },
  )

  watch(
    () => visible.value,
    (val) => {
      emits('update:visible', val)
    },
  )
  watch(formModel, (value) => {
    if (value.ca) {
      currentCa.value = getDict(domainCADictKey, value.ca)
      currentCaOptions.value = acmeAccountOptions.value.filter(item => item.ca === currentCa.value
        .value)
      formModel.value.acmeAccount = currentCaOptions.value[0]?.value
    }
  })

  watch(() => props.formModel, (value) => {
    if (value) {
      formModel.value = value
      currentModel.value = value
      if (value.step) {
        activeStep.value = value.step
      }
      else if (value.id) {
        activeStep.value = 2
      }
      else {
        activeStep.value = 0
      }
    }
    else {
      formModel.value = {
        ca: 'letsencrypt',
        certAlgorithm: 'RSA-2048',
      }
    }
  })

  const dialogAcmeAccountVisible = ref(false)
  const domainAcmeAccountFormModel = ref<any>({})
  async function handleOpenDomainAccountDialog() {
    domainAcmeAccountFormModel.value = {
      ...formModel.value,
      ca: currentCa.value.value,
    }
    dialogAcmeAccountVisible.value = true
  }
  async function loadAcmeAccountCache() {
    const { data, success } = await getAcmeAccountCacheApi()
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

  onMounted(() => {
    loadDict(dictKeys)
    loadAcmeAccountCache()
  })

  return {
    plusDialogRef,
    visible,
    activeStep,
    currentModel,
    plusFormRef,
    formRules,
    formLoading,
    formModel,
    formColumns,
    handleClose,
    handleFormConfirm,
    handleNextStep,

    dialogAcmeAccountVisible,
    domainAcmeAccountFormModel,
    handleOpenDomainAccountDialog,
    loadAcmeAccountCache,
  }
}
