<script setup lang="ts">
import Crontab from '@/components/Crontab'
import { useJob } from './utils/hook'

const {
  plusPageRef,
  plusDialogFormRef,
  formVisible,
  formModel,
  formRules,
  submitLoading,
  tableColumns,
  actionButtions,
  addNew,
  handleSave,
  loadData,
  handleShowCronTab,

  plusDialogRef,
  crontabRef,
  cronTabDialogVisible,
  handleHideCronTab,
  handleCronTabConfirm,
} = useJob()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="tableColumns"
      :request="loadData"
      :table="{
        actionBar: {
          buttons: actionButtions,
        },
      }"
    >
      <template #table-title>
        <el-button
          type="primary"
          @click="addNew"
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
        columns: tableColumns,
        labelWidth: '100px',
        rules: formRules,
      }"
      :dialog="{
        title: formModel.id ? '编辑任务' : '新增任务',
        width: '45%',
      }"
      @confirm="handleSave"
    >
      <template #plus-field-cronExpression="{ prop, column }">
        <ElInput
          v-model="formModel[prop]"
          :placeholder="column.fieldProps?.placeholder"
          :clearable="column.clearable"
        >
          <template #append>
            <ElButton @click="handleShowCronTab">
              生成表达式<ReIcon icon="i-ep:clock" class="el-icon" />
            </ElButton>
          </template>
        </ElInput>
      </template>
      <template #dialog-footer="{ handleConfirm, handleCancel }">
        <ElButton
          @click="handleCancel"
        >
          取消
        </ElButton>
        <ElPopconfirm
          title="确认提交吗？"
          @confirm="handleConfirm"
        >
          <template #reference>
            <ElButton type="primary" :loading="submitLoading">
              确定
            </ElButton>
          </template>
        </ElPopconfirm>
      </template>
    </PlusDialogForm>

    <PlusDialog
      ref="plusDialogRef"
      v-model="cronTabDialogVisible"
      width="50%"
      title="生成表达式"
      :has-footer="false"
      :destroy-on-close="true"
    >
      <Crontab
        ref="crontabRef"
        :expression="formModel.cronExpression"
        @hide="handleHideCronTab"
        @fill="handleCronTabConfirm"
      />
    </PlusDialog>
  </div>
</template>
