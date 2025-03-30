<script setup lang="ts">
import CertIssueDialog from '@/views/sub/domain/component/cert/issue/index.vue'
import { useDomainSSLHook } from './utils/hook'

const {
  dialogVisible,
  formModel,
  plusPageRef,
  columns,
  actionBar,
  loadData,
  handleOpenDialog,
} = useDomainSSLHook()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="columns"
      :request="loadData"
      :table="{
        actionBar,
      }"
    >
      <template #table-title>
        <ElButton
          type="primary"
          @click="handleOpenDialog()"
        >
          申请SSL证书
        </ElButton>
      </template>
    </PlusPage>
    <CertIssueDialog
      v-model:visible="dialogVisible"
      :form-model="formModel"
    />
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding: 20px;
  .dialog-content {
    padding: 20px;
    .step-content {
      text-align: center;
      width: 80%;
      margin: 0 auto;
    }
  }
}
</style>
