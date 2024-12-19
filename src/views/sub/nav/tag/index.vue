<script setup lang="ts">
import { useNavTagHook } from './utils/hook'

const {
  plusPageRef,
  plusDialogFormRef,
  formColumns,
  formRules,
  formModel,
  dialogFormVisible,
  dialogSubmitLoading,
  actionButtins,
  loadData,
  handleAdd,
  handleSave,
} = useNavTagHook()
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
          v-auth="'nav:tag:save'"
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
      v-model:visible="dialogFormVisible"
      v-model="formModel"
      :form="{
        columns: formColumns,
        labelWidth: '100px',
        rules: formRules,
      }"
      :dialog="{
        title: formModel.id ? '编辑' : '新增',
        width: '35%',
        submitLoading: dialogSubmitLoading,
      }"
      @confirm="handleSave"
    />
  </div>
</template>
