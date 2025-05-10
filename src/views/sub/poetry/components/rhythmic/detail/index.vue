<script setup lang="ts">
import { useRhythmicDetailHook } from './utils/hook'

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
const emits = defineEmits(['update:visible', 'update:model', 'success', 'close'])

const {
  dialogVisible,
  formModel,
  columns,
  formRules,
  dialogLoading,
  handleConfirm,
} = useRhythmicDetailHook(
  props,
  emits,
)
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
      title: formModel.id ? '编辑' : '新增',
      width: '800px',
      dstroyOnClose: true,
      confirmLoading: dialogLoading,
    }"
    @confirm="handleConfirm"
  />
</template>
