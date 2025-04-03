<script setup lang="ts">
import type { DialogProps } from './utils/types'
import DomainAcmeAccountEdit from '@/views/sub/domain/component/account/acme/edit/index.vue'
import CertIssueChallenge from './challenge.vue'
import CertDownload from './download.vue'
import { useCertIssueHook } from './utils/hook'

const props = defineProps<DialogProps>()
const emits = defineEmits(['update:visible'])
const {
  plusDialogRef,
  visible,
  currentModel,
  activeStep,
  plusFormRef,
  formRules,
  formLoading,
  formModel,
  formColumns,
  handleClose,
  handleFormConfirm,
  handleNextStep,

  dialogAcmeAccountVisible,
  domainAcmeAccountFormModel,
  handleOpenDomainAccountDialog,
  loadAcmeAccountCache,

} = useCertIssueHook(props, emits)
</script>

<template>
  <PlusDialog
    ref="plusDialogRef"
    v-model="visible"
    title="申请SSL证书"
    :has-footer="false"
    width="50%"
    :destroy-on-close="true"
  >
    <ElSteps :active="activeStep">
      <ElStep title="填写信息" />
      <ElStep title="验证域名" />
      <ElStep title="下载证书" />
    </ElSteps>
    <div class="dialog-content">
      <div v-show="activeStep === 0" class="step-content step1">
        <div class="form">
          <PlusForm
            ref="plusFormRef"
            v-model="formModel"
            :columns="formColumns"
            :label-width="120"
            :has-footer="false"
            :rules="formRules"
          >
            <template #plus-field-acmeAccount="{ prop, column }">
              <el-select v-model="formModel[prop]" :clearable="column.clearable">
                <el-option
                  v-for="item in column.options.value"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <template #footer>
                  <el-button
                    type="primary"
                    text
                    @click="handleOpenDomainAccountDialog()"
                  >
                    <template #icon>
                      <ReIcon icon="i-ep:plus" class="el-icon" />
                    </template>
                    新增
                  </el-button>
                </template>
              </el-select>
            </template>
          </PlusForm>
        </div>
        <div class="button-group">
          <ElButton @click="handleClose">
            取消
          </ElButton>
          <ElPopconfirm
            title="是否申请证书"
            @confirm="handleFormConfirm"
          >
            <template #reference>
              <ElButton
                :loading="formLoading"
                type="primary"
              >
                申请
              </ElButton>
            </template>
          </ElPopconfirm>
        </div>
      </div>
      <CertIssueChallenge
        v-if="activeStep === 2 || activeStep === 1"
        :form-model="currentModel"
        @close="handleClose"
        @next-step="handleNextStep"
      />
      <CertDownload
        v-if="activeStep === 3"
        :form-model="currentModel"
        @close="handleClose"
      />
    </div>

    <DomainAcmeAccountEdit
      v-model:visible="dialogAcmeAccountVisible"
      :form-model="domainAcmeAccountFormModel"
      @success="loadAcmeAccountCache"
    />
  </PlusDialog>
</template>

<style lang="scss" scoped>
.dialog-content {
  padding: 20px;
  .step-content {
    text-align: center;
    width: 80%;
    margin: 0 auto;
  }
}
</style>
