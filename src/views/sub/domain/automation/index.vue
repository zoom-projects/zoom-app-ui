<script setup lang="ts">
import { useDomainAutomationHook } from './utils/hook'

const {
  plusPageRef,
  plusDialogFormRef,
  columns,
  dialogVisible,
  formModel,
  handleOpenDialog,
} = useDomainAutomationHook()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="columns"
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
        columns,
        labelWidth: '100px',
      }"
    />
  </div>
</template>
