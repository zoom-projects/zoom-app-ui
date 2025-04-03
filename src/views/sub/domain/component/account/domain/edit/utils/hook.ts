import type { FormRules } from 'element-plus'
import type { PlusColumn, PlusDialogFormInstance } from 'plus-pro-components'
import { dictKeys, domainPlatformDictKey } from './const'
import { useDictStore } from '/src/store'
import * as domainAccountApi from '@/api/modules/domain/account'

export function useDomainAccountHook(props: any, emit: any) {
  const { toOptions, getDict, loadDict } = useDictStore()
  const currentModel = ref<any>(props.formModel)
  const plusDialogFormRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const dialogVisible = ref<boolean>(props.visible)
  const dialogLoading = ref<boolean>(false)
  const formColumns: PlusColumn[] = [
    {
      label: '选择平台',
      prop: 'platform',
      valueType: 'select',
      fieldProps: {
        clearable: false,
      },
      options: computed(() => toOptions(domainPlatformDictKey)),
      fieldChildrenSlot: (row: any) => {
        return h(ElSpace, null, {
          default: () => [
            h(ElImage, { src: row.icon, style: 'height:20px;' }),
            h('span', null, row.label),
          ],
        })
      },
      fieldSlots: {
        label: ({ label, value }) => {
          const items = getDict(domainPlatformDictKey, value)
          return h(ElSpace, null, {
            default: () => [
              h(ElImage, { src: items.icon, style: 'height:18px;' }),
              h('span', null, label),
            ],
          })
        },
      },
    },
    {
      label: '标签',
      prop: 'label',
      fieldProps: {
        placeholder: '账号标签，可是是个人，公司，项目等',
      },
    },
    {
      label: 'Access Key',
      prop: 'account',
      hideInForm: computed(() => currentModel.value.platform !== 'aliyun'),
      fieldProps: {
        placeholder: '阿里云Access Key',
      },
    },
    {
      label: 'Secret Key',
      prop: 'password',
      hideInForm: computed(() => currentModel.value.platform !== 'aliyun'),
      fieldProps: {
        placeholder: '阿里云Secret Key',
      },
    },
    {
      label: 'ApiToken',
      prop: 'password',
      hideInForm: computed(() => currentModel.value.platform !== 'cf'),
      fieldProps: {
        placeholder: 'Cloudflare ApiToken',
      },
    },
    {
      label: 'Api Key',
      prop: 'account',
      hideInForm: computed(() => currentModel.value.platform !== 'cf'),
      fieldProps: {
        placeholder: 'Cloudflare Api Key',
      },
    },
    {
      label: 'Secret Id',
      prop: 'account',
      hideInForm: computed(() => currentModel.value.platform !== 'tencent'),
      fieldProps: {
        placeholder: '腾讯云Secret Id',
      },
    },
    {
      label: 'Secret Key',
      prop: 'password',
      hideInForm: computed(() => currentModel.value.platform !== 'tencent'),
      fieldProps: {
        placeholder: '腾讯云Secret Key',
      },
    },
    {
      label: 'Email',
      prop: 'email',
    },
    {
      label: '备注',
      prop: 'remark',
    },
  ]

  const aliyunRules: FormRules = {
    label: [
      { required: true, message: '请输入标签', trigger: 'blur' },
    ],
    account: [
      { required: true, message: '请输入Access Key', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入Secret Key', trigger: 'blur' },
    ],
  }
  const tencentRules: FormRules = {
    label: [
      { required: true, message: '请输入标签', trigger: 'blur' },
    ],
    account: [
      { required: true, message: '请输入Secret Id', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入Secret Key', trigger: 'blur' },
    ],
  }
  const cfRules: FormRules = {
    label: [
      { required: true, message: '请输入标签', trigger: 'blur' },
    ],
    email: [
      { message: '请输入Email', trigger: 'blur', type: 'email' },
    ],
  }
  const dialogFormRules = computed(() => {
    if (currentModel.value.platform === 'aliyun') {
      return aliyunRules
    }
    if (currentModel.value.platform === 'tencent') {
      return tencentRules
    }
    if (currentModel.value.platform === 'cf') {
      return cfRules
    }

    return {}
  })

  watch(() => props.visible, (val) => {
    dialogVisible.value = val
  })

  watch(() => dialogVisible.value, (val) => {
    emit('update:visible', val)
    if(!val){
      nextTick(() => {
        plusDialogFormRef.value?.formInstance.resetFields()
      })
    }
  })

  watch(() => currentModel.value, (val) => {
    emit('update:formModel', val)
  })
  watch(() => props.formModel, (val) => {
    currentModel.value = val
  })



  async function handleConfirm() {
    plusDialogFormRef.value?.formInstance.validate(async (valid) => {
      if (!valid) {
        return
      }
      if (currentModel.value.id) {
        _update()
      }
      else {
        _save()
      }
    })
  }

  async function _save() {
    dialogLoading.value = true
    const { success } = await domainAccountApi.create(currentModel.value).finally(() => {
      dialogLoading.value = false
    })
    // 异步请求成功
    if (success) {
      emit("success")
      dialogVisible.value = false
      ElMessageBox.confirm('保存成功，是否刷新域名列表', '提示', {
        confirmButtonText: '刷新',
        cancelButtonText: '取消',
        type: 'success',
      }).then(() => {
        // 确认刷新
      }).catch(() => {

      })
    }
  }

  async function _update() {
    dialogLoading.value = true
    const { success } = await domainAccountApi.update(currentModel.value.id, currentModel.value).finally(() => {
      dialogLoading.value = false
    })
    if (success) {
      dialogVisible.value = false
      emit("success")
    }
  }


  onMounted(() => {
    loadDict(dictKeys)
  })

  return {
    plusDialogFormRef,
    dialogVisible,
    dialogLoading,
    formColumns,
    currentModel,
    dialogFormRules,
    handleConfirm,
  }
}
