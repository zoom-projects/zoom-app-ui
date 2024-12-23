<script setup lang="ts">
import type { PlusFormInstance } from 'plus-pro-components/es/components/form'
import type { PlusColumn } from 'plus-pro-components/es/types/plus'

const emits = defineEmits(['save'])
const btnLoading = ref(false)
const formRef = ref<Nullable<PlusFormInstance>>(null)
const modelValue = defineModel({
  type: Object as PropType<Record<string, any>>,
  required: true,
})

const seoColumns: PlusColumn[] = [
  {
    label: '站点关键词',
    prop: 'keywords',
    valueType: 'textarea',
  },
  {
    label: '站点描述',
    prop: 'description',
    valueType: 'textarea',
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
  <PlusForm ref="formRef" v-model="modelValue" :columns="seoColumns" label-position="top" class="sm:max-w-lg">
    <template #footer>
      <el-button type="primary" :loading="btnLoading" @click="handleSave">
        保存
      </el-button>
    </template>
  </PlusForm>
</template>
