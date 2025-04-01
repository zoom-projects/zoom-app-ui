<script setup lang="ts">
import DomainCDNAccount from '@/views/sub/domain/component/account/cdn/edit/index.vue'
import DomainCdnAccountList from '@/views/sub/domain/component/account/cdn/list/index.vue'
import { useCertDeploySettingHook } from './utils/hook'

const {
  plusPageRef,
  columns,
  actionBar,
  plusDialogFormRef,
  formModel,
  dialogVisible,
  formRules,
  confirmLoading,

  cdnDialogVisible,
  cdnAccountFormModel,
  cdnAccountListVisible,

  loadData,
  handleAdd,
  handleAddCdnAccount,
  handleOpenCdnAccountList,
  handleLoadCdnAccount,
  handleConfirm,
} = useCertDeploySettingHook()
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
      <template #table-toolbar>
        <el-button
          type="primary"
          text
          @click="handleOpenCdnAccountList"
        >
          CDN列表
        </el-button>
      </template>
    </PlusPage>
    <PlusDialogForm
      ref="plusDialogFormRef"
      v-model="formModel"
      v-model:visible="dialogVisible"
      :form="{
        columns,
        rules: formRules,
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
        confirmLoading,

      }"
      @confirm="handleConfirm"
    >
      <template #plus-field-cdnAccountId="{ prop, column }">
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
              @click="handleAddCdnAccount"
            >
              <template #icon>
                <ReIcon icon="i-ep:plus" class="el-icon" />
              </template>
              新增
            </el-button>
          </template>
        </el-select>
      </template>

      <template #dialog-footer="{ handleConfirm, handleCancel }">
        <el-button @click="handleCancel">
          取消
        </el-button>
        <el-popconfirm
          title="确定要保存吗？"
          @confirm="handleConfirm"
        >
          <template #reference>
            <el-button
              type="primary"
              :loading="confirmLoading"
            >
              确定
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </PlusDialogForm>

    <DomainCDNAccount
      v-model:form-model="cdnAccountFormModel"
      v-model:visible="cdnDialogVisible"
      @success="handleLoadCdnAccount"
    />
    <DomainCdnAccountList
      v-model="cdnAccountListVisible"
      title="CDN列表"
      size="45%"
    />
  </div>
</template>
