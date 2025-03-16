<script setup lang="ts">
import { useDomainAcmeAccountHook } from './utils/hook'

const {
  plusPageRef,
  columns,
  actionButtions,
  onLoadData,

  dialogFormRef,
  dialogVisible,
  dialogFormColumns,
  dialogFormModel,
  dialogFormRules,
  confirmLoading,
  handleOpenDialog,
  handleSave,
} = useDomainAcmeAccountHook()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="columns"
      :request="onLoadData"
      :table="{
        actionBar:{
          buttons: actionButtions,
        }
      }"
    >
      <template #table-title>
        <ElButton type="primary" @click="handleOpenDialog()">
          添加账号
        </ElButton>
      </template>
    </PlusPage>

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
  </div>
</template>
