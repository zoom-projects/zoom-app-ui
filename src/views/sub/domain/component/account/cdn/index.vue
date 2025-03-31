<script setup lang="ts">
import type { DomainCdnAccount } from '@/api/modules/domain/cdn/account/types'
import type { FormRules } from 'element-plus'
import type { PlusColumn, PlusDialogFormInstance } from 'plus-pro-components'
import * as domainCDNAccountApi from '@/api/modules/domain/cdn/account'
import { dictKeys, domainCdnProviderDictKey } from './const'
import { useDictStore } from '/src/store'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  formModel: {
    type: Object as PropType<DomainCdnAccount.ResAccount>,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:visible', 'update:formModel', 'success'])
const plusDialogFormRef = ref<Nullable<PlusDialogFormInstance>>(null)
const { loadDict, getDict, toOptions } = useDictStore()
const currentModel = ref<any>(props.formModel)
const dialogVisible = ref(props.visible)
const formLoading = ref(false)

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
  },
  { immediate: true },
)
watch(
  () => props.formModel,
  (val) => {
    currentModel.value = val
  },
  { immediate: true },
)

watch(
  () => dialogVisible.value,
  (val) => {
    emit('update:visible', val)
    if (!val) {
      currentModel.value = {}
      plusDialogFormRef.value?.formInstance?.resetFields()
    }
  },
)
watch(
  () => currentModel.value,
  (val) => {
    emit('update:formModel', val)
  },
)

const columns: PlusColumn[] = [
  {
    label: '标签',
    prop: 'label',
  },
  {
    label: '服务商',
    prop: 'provider',
    valueType: 'select',
    options: computed(() => toOptions(domainCdnProviderDictKey)),
  },
  {
    label: 'Access Key',
    prop: 'account',
    hideInForm: computed(() => currentModel.value.provider !== 'aliyun'),
    fieldProps: {
      placeholder: '阿里云Access Key',
    },
  },
  {
    label: 'Secret Key',
    prop: 'password',
    hideInForm: computed(() => currentModel.value.provider !== 'aliyun'),
    fieldProps: {
      placeholder: '阿里云Secret Key',
    },
  },
  {
    label: 'ApiToken',
    prop: 'password',
    hideInForm: computed(() => currentModel.value.provider !== 'cf'),
    fieldProps: {
      placeholder: 'Cloudflare ApiToken',
    },
  },
  {
    label: 'Api Key',
    prop: 'account',
    hideInForm: computed(() => currentModel.value.provider !== 'cf'),
    fieldProps: {
      placeholder: 'Cloudflare Api Key',
    },
  },
  {
    label: 'Secret Id',
    prop: 'account',
    hideInForm: computed(() => currentModel.value.provider !== 'tencent'),
    fieldProps: {
      placeholder: '腾讯云Secret Id',
    },
  },
  {
    label: 'Secret Key',
    prop: 'password',
    hideInForm: computed(() => currentModel.value.provider !== 'tencent'),
    fieldProps: {
      placeholder: '腾讯云Secret Key',
    },
  },
  {
    label: '邮箱',
    prop: 'email',
  },
  {
    label: '备注',
    prop: 'remark',
    valueType: 'textarea',
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
const formRules = computed(() => {
  if (currentModel.value.provider === 'aliyun') {
    return aliyunRules
  }
  if (currentModel.value.provider === 'tencent') {
    return tencentRules
  }
  if (currentModel.value.provider === 'cf') {
    return cfRules
  }

  return {}
})
async function handleConfirm() {
  plusDialogFormRef.value?.formInstance?.validate((isValid) => {
    if (!isValid)
      return
    const { id } = currentModel.value
    if (id) {
      _update()
    }
    else {
      _save()
    }
  })
}

async function _save() {
  formLoading.value = true
  const { success } = await domainCDNAccountApi.save(currentModel.value).finally(() => formLoading.value = false)
  if (success) {
    dialogVisible.value = false
    emit('success')
  }
}

async function _update() {
  formLoading.value = true
  const { success } = await domainCDNAccountApi.update(currentModel.value.id, currentModel.value).finally(() => formLoading.value = false)
  if (success) {
    dialogVisible.value = false
    emit('success')
  }
}

onMounted(() => {
  loadDict(dictKeys)
})
</script>

<template>
  <PlusDialogForm
    ref="plusDialogFormRef"
    v-model:visible="dialogVisible"
    v-model="currentModel"
    :form="{
      columns,
      rules: formRules,
      labelWidth: '120px',
      rowProps: {
        gutter: 20,
      },
      colProps: {
        span: 12,
      },
      submitLoading: formLoading,
    }"
    :dialog="{
      title: formModel.id ? '编辑' : '新增',
    }"
    @confirm="handleConfirm"
  />
</template>
