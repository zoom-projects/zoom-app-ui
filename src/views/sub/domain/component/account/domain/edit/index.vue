<script setup lang="ts">
import { useDomainAccountHook } from './utils/hook'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  formModel: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['update:visible', 'update:formModel','success','close','refresh'])
const {
  plusDialogFormRef,
  dialogVisible,
  dialogLoading,
  formColumns,
  dialogFormRules,
  currentModel,
  handleConfirm,
} = useDomainAccountHook(props, emits)
</script>

<template>
  <PlusDialogForm
    ref="plusDialogFormRef"
    v-model="currentModel"
    v-model:visible="dialogVisible"
    :form="{
      columns: formColumns,
      rules: dialogFormRules,
      labelWidth: '100px',
    }"
    :dialog="{
      title: currentModel.id ? '编辑账号' : '添加账号',
      width: '45%',
    }"
  >
    <template #dialog-footer>
      <ElButton @click="dialogVisible = false">
        取消
      </ElButton>
      <ElPopconfirm title="确定要提交吗？" @confirm="handleConfirm" @cancel="dialogVisible = false">
        <template #reference>
          <ElButton type="primary" :loading="dialogLoading">
            提交
          </ElButton>
        </template>
      </ElPopconfirm>
    </template>
  </PlusDialogForm>
</template>
