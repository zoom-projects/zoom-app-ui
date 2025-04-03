import type { FormRules } from 'element-plus'
import type { PlusColumn, PlusDialogFormInstance } from 'plus-pro-components'
import * as DomainAcmeAccountApi from '@/api/modules/domain/acme/account'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { dictKeys, domainCADictKey } from './const'

export function useDomainAccountAcmeEditHook(props: any, emits: any) {
  const { toOptions, loadDict } = useDictStore()
  const dialogFormRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const dialogVisible = ref<boolean>(props.visible)
  const dialogFormModel = ref<any>(props.formModel)
  const dialogFormColumns: PlusColumn[] = [
    {
      label: '邮箱',
      prop: 'email',
    },
    {
      label: '证书厂商',
      prop: 'ca',
      valueType: 'select',
      options: computed(() => toOptions(domainCADictKey).filter(item => item.isCa)),
      fieldProps: {
        clearable: false,
      },
    },
    {
      label: 'kid',
      tooltip: {
        content: '外部账户绑定',
      },
      hideInForm: computed(() => dialogFormModel.value.ca === 'letsencrypt'),
      prop: 'kid',
    },
    {
      label: 'hmacKey',
      tooltip: '外部账户绑定',
      hideInForm: computed(() => dialogFormModel.value.ca === 'letsencrypt'),
      prop: 'hmacKey',
    },

  ]
  const dialogFormRules: FormRules = {
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
    ],
    ca: [{ required: true, message: '请选择证书厂商', trigger: 'blur' }],
  }
  const confirmLoading = ref<boolean>(false)

  watch(
    () => props.visible,
    (val) => {
      dialogVisible.value = val
    },
  )

  watch(
    () => dialogVisible.value,
    (val) => {
      emits('update:visible', val)
      if (!val) {
        dialogFormRef.value?.formInstance.resetFields()
      }
    },
  )

  watch(
    () => props.formModel,
    (val) => {
      dialogFormModel.value = val
    },
  )

  watch(
    () => dialogFormModel.value,
    (val) => {
      emits('update:formModel', val)
    },
  )

  async function handleSave() {
    const body = clone(dialogFormModel.value, true)
    confirmLoading.value = true
    const { success } = await DomainAcmeAccountApi.save(body).finally(() => confirmLoading.value = false)
    if (success) {
      dialogVisible.value = false
      emits('success')
    }
  }

  onMounted(() => {
    loadDict(dictKeys)
  })

  return {

    dialogFormRef,
    dialogVisible,
    dialogFormModel,
    dialogFormColumns,
    dialogFormRules,
    confirmLoading,
    handleSave,
  }
}
