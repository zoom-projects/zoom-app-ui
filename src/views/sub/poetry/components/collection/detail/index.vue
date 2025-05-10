<script setup lang="ts">
import { useCollectionDetailHook } from './utils/hook'

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
  dialogLoading,
  columns,
  formRules,
  handleConfirm,
} = useCollectionDetailHook(props, emits)
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
      width: '600px',
      confirmLoading: dialogLoading,
      destroyOnClose: true,
    }"
    @confirm="handleConfirm"
  />
</template>
