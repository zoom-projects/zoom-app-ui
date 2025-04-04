<script setup lang="ts">
import DomainCertMonitorEdit from '@/views/sub/domain/component/monitor/ssl/edit/index.vue'
import { useDoaminMonitorSSLHook } from './utils/hook'

const {
  plusPageRef,
  columns,
  actionButtions,

  formModel,
  dialogVisible,

  loadData,
  handleOpenDialog,
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

    <DomainCertMonitorEdit
      v-model:form-model="formModel"
      v-model:visible="dialogVisible"
      @success="handleGetList"
    />
  </div>
</template>
