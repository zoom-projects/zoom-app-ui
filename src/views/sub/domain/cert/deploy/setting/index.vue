<script setup lang="ts">
import { useCertDeploySettingHook } from './utils/hook'

const {
  columns,
  formModel,
  dialogVisible,

  handleAdd,
} = useCertDeploySettingHook()
</script>

<template>
  <div class="main">
    <PlusPage :columns="columns">
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
      v-model="formModel"
      v-model:visible="dialogVisible"
      :form="{
        columns,
        labelWidth: '120px',
        rowProps: {
          gutter: 20,
        },
        colProps: {
          span: 12,
        },
      }"
      :dialog="{
        title: formModel.id ? '编辑' : '新增',
      }"
    />
  </div>
</template>
