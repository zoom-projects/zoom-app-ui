<script setup lang="ts">
import { useDynastyDetailHook } from './utils/hook'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  model: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['update:visible', 'update:model', 'close', 'success'])

const {
  dialogVisible,
  formModel,
  columns,
  formRules,
  dialogLoading,
  handleSubmit,
} = useDynastyDetailHook(props, emits)
</script>

<template>
  <PlusDialogForm
    v-model:visible="dialogVisible"
    v-model="formModel"
    :form="{
      columns,
      rules: formRules,
    }"
    :dialog="{
      title: formModel.id ? '编辑朝代' : '添加朝代',
      width: '600px',
      confirmLoading: dialogLoading,
      destroyOnClose: true,
    }"
    @confirm="handleSubmit"
  />
</template>
