<script setup lang="ts">
import { useOpenApi } from './utils/hook'

const {
  plusPageRef,
  plusDialogFormRef,
  formVisible,
  formModel,
  formRules,
  formLoading,
  tableColumns,
  actionButtions,
  loadData,
  addNew,
  saveData,
} = useOpenApi()
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
          v-auth="['sys:open:api:save']"
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
        title: formModel.id ? '编辑接口' : '新增接口',
        width: '45%',
        confirmLoading: formLoading,
      }"
      @confirm="saveData"
    >
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
            <ElButton type="primary" :loading="formLoading">
              确定
            </ElButton>
          </template>
        </ElPopconfirm>
      </template>
    </PlusDialogForm>
  </div>
</template>
