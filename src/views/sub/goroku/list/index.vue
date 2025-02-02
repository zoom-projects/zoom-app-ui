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
  fileImportVisible,
  loadData,
  handleAdd,
  handleSave,
  handleAudit,
  handleExport,
  handleDownloadTemplate,
  handleImport,
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
          v-auth="'goroku:info:save'"
          type="primary"
          @click="handleAdd"
        >
          <template #icon>
            <ReIcon icon="i-ep:plus" class="el-icon" />
          </template>
          新增
        </el-button>
        <el-button v-auth="'goroku:info:import'" type="primary" @click="handleImport">
          <template #icon>
            <ReIcon icon="i-ep:upload" class="el-icon" />
          </template>
          导入
        </el-button>

        <el-popconfirm
          title="确定导出数据吗？"
          @confirm="handleExport"
        >
          <template #reference>
            <el-button
              v-auth="'goroku:info:export'"
              type="primary"
            >
              <template #icon>
                <ReIcon icon="i-ep:download" class="el-icon" />
              </template>
              导出
            </el-button>
          </template>
        </el-popconfirm>
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

    <ImportFile
      v-model:visible="fileImportVisible"
      title="语录"
      :num="1"
      :accept="['.xls', '.xlsx']"
      biz-app="zoom-goroku-job"
      task-type="I01"
      @download-template="handleDownloadTemplate"
    />
  </div>
</template>
