<script setup lang="ts">
import { useDomainCertMonitorEditHook } from './utils/hook'

const props = defineProps({
  formModel: {
    type: Object,
    default: () => ({}),
  },
  visible: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:visible', 'update:formModel', 'close', 'success'])

const {
  plusDialogFormRef,
  formModel,
  dialogVisible,
  dialogFormColumns,
  dialogFormRules,
  dialogLoading,
  handleSave,
} = useDomainCertMonitorEditHook(props, emit)
</script>

<template>
  <PlusDialogForm
    ref="plusDialogFormRef"
    v-model="formModel"
    v-model:visible="dialogVisible"
    :form="{
      columns: dialogFormColumns,
      rules: dialogFormRules,
    }"
    :dialog="{
      title: formModel.id ? '编辑' : '添加域名',
      confirmLoading: dialogLoading,
      width: '35%',
    }"
    @confirm="handleSave"
  >
    <template #dialog-footer="{ handleCancel, handleConfirm }">
      <el-button @click="handleCancel">
        取消
      </el-button>
      <el-popconfirm
        title="确定要保存吗？"
        @confirm="handleConfirm"
      >
        <template #reference>
          <el-button
            type="primary"
            :loading="dialogLoading"
          >
            确定
          </el-button>
        </template>
      </el-popconfirm>
    </template>
  </PlusDialogForm>
</template>
