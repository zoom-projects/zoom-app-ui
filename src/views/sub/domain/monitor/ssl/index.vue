<script setup lang="ts">
import { useDoaminMonitorSSLHook } from './utils/hook'

const {
  plusPageRef,
  columns,
  actionButtions,

  plusDialogFormRef,
  formModel,
  dialogVisible,
  dialogFormColumns,
  dialogFormRules,
  dialogLoading,

  loadData,
  handleOpenDialog,
  handleSave,
  handleFormChange,
  handleGetList,
} = useDoaminMonitorSSLHook()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="columns"
      :request="loadData"
      :search="{
        onChange: handleGetList,
      }"
      :table="{
        actionBar: {
          buttons: actionButtions,
          type: 'icon',
        },
        onFormChange: handleFormChange,
      }"
    >
      <template #table-title>
        <el-button
          type="primary"
          @click="handleOpenDialog()"
        >
          <template #icon>
            <ReIcon icon="i-ep:plus" class="el-icon" />
          </template>
          新增
        </el-button>
      </template>
    </PlusPage>

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
    />
  </div>
</template>
