<script setup lang="ts">
import { useDomainSSLHook } from './utils/hook'

const {
  dialogVisible,
  stepForm,
  activeStep,
  formColumns,
  formModel,

  plusPageRef,
  columns,

  handleOpenDialog,
} = useDomainSSLHook()
</script>

<template>
  <div class="main">
    <PlusPage ref="plusPageRef" :columns="columns">
      <template #table-title>
        <ElButton
          type="primary"
          @click="handleOpenDialog()"
        >
          申请SSL证书
        </ElButton>
      </template>
    </PlusPage>
    <PlusDialog
      v-model="dialogVisible"
      title="申请SSL证书"
      :has-footer="false"
      width="50%"
    >
      <ElSteps :active="activeStep">
        <ElStep title="填写信息" />
        <ElStep title="验证域名" />
        <ElStep title="下载证书" />
      </ElSteps>
      <!-- 居中 -->
      <div class="dialog-content">
        <div v-show="activeStep === 0" class="step-content step1">
          <div class="form">
            <PlusForm
              v-model="formModel"
              :columns="formColumns"
              :label-width="120"
              :has-footer="false"
            />
          </div>
          <div class="button-group">
            <ElButton>
              取消
            </ElButton>
            <ElButton
              type="primary"
            >
              申请
            </ElButton>
          </div>
        </div>
      </div>
    </PlusDialog>
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
