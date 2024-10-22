<script setup lang="ts">
import { useGorokuInfo } from './utils/hook'

const {
  plusPageRef,
  plusDialogFormRef,
  formVisible,
  formAuditVisible,
  formModel,
  formAuditModel,
  submitLoading,
  auditLoading,
  formColumns,
  formAuditColumns,
  formRules,
  actionButtins,
  loadData,
  handleAdd,
  handleSave,
  handleAudit,
} = useGorokuInfo()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="formColumns"
      :request="loadData"
      :table="{
        actionBar: {
          buttons: actionButtins,
        },
      }"
    >
      <template #table-title>
        <el-button
          type="primary"
          @click="handleAdd"
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
      v-model:visible="formVisible"
      v-model="formModel"
      :form="{
        columns: formColumns,
        labelWidth: '100px',
        rules: formRules,
        submitLoading,
      }"
      :dialog="{
        title: formModel.id ? '编辑语录' : '新增语录',
        width: '45%',
      }"
      @confirm="handleSave"
    />

    <PlusDialogForm
      v-model:visible="formAuditVisible"
      v-model="formAuditModel"
      :dialog="{
        title: `审核语录`,
        width: '30%',
      }"
      :form="{
        columns: formAuditColumns,
        labelWidth: '100px',
        submitLoading: auditLoading,
      }"
      @confirm="handleAudit"
    />
  </div>
</template>
