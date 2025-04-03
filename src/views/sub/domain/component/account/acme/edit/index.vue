<script setup lang="ts">
import { useDomainAccountAcmeEditHook } from './utils/hook'

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
const emits = defineEmits(['update:visible', 'update:modelValue', 'success'])

const {
  dialogFormRef,
  dialogVisible,
  dialogFormColumns,
  dialogFormModel,
  dialogFormRules,
  confirmLoading,
  handleSave,
} = useDomainAccountAcmeEditHook(props, emits)
</script>

<template>
  <PlusDialogForm
    ref="dialogFormRef"
    v-model="dialogFormModel"
    v-model:visible="dialogVisible"
    :form="{
      columns: dialogFormColumns,
      rules: dialogFormRules,
      labelWidth: '100px',
    }"
    :dialog="{
      title: dialogFormModel.id ? '编辑账号' : '添加账号',
      width: '45%',

    }"
    @confirm="handleSave"
  >
    <template #dialog-footer="{ handleCancel, handleConfirm }">
      <el-button @click="handleCancel">
        取消
      </el-button>
      <ElPopconfirm
        title="确定要保存吗？保存后将自动创建ACME账号"
        @confirm="handleConfirm"
      >
        <template #reference>
          <el-button
            type="primary"
            :loading="confirmLoading"
          >
            保存
          </el-button>
        </template>
      </ElPopconfirm>
    </template>
  </PlusDialogForm>
</template>
