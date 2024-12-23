<script setup lang="ts">
import type { PlusColumn, PlusFormInstance } from 'plus-pro-components'
import { AttachmentSelect } from '@/components/Attachment'

const emits = defineEmits(['save'])
const btnLoading = ref(false)
const formRef = ref<Nullable<PlusFormInstance>>(null)
const modelValue = defineModel({
  type: Object as PropType<Record<string, any>>,
  required: true,
})
const basicColumns: PlusColumn[] = [
  {
    label: '网站名称',
    prop: 'title',
    formItemProps: {
      rules: [
        { required: true, message: '请输入网站名称', trigger: 'blur' },
      ],
    },
  },
  {
    label: '网站地址',
    prop: 'url',
    formItemProps: {
      rules: [
        { required: true, message: '请输入网站地址', trigger: 'blur' },
      ],
    },
  },
  {
    label: '网站LOGO',
    prop: 'logo',
  },
  {
    label: '网站Favicon',
    prop: 'favicon',
  },
]
async function handleSave() {
  const drone = () => {
    btnLoading.value = false
  }
  formRef.value?.formInstance?.validate((isValid) => {
    if (isValid) {
      btnLoading.value = true
      emits('save', drone)
    }
  })
}
</script>

<template>
  <PlusForm ref="formRef" v-model="modelValue" :columns="basicColumns" label-position="top" class="sm:max-w-lg">
    <template #plus-field-logo="{ prop }">
      <AttachmentSelect v-model="modelValue[prop]" :clearable="true" />
    </template>
    <template #plus-field-favicon="{ prop }">
      <AttachmentSelect v-model="modelValue[prop]" :clearable="true" />
    </template>

    <template #footer>
      <el-button type="primary" :loading="btnLoading" @click="handleSave">
        保存
      </el-button>
    </template>
  </PlusForm>
</template>
