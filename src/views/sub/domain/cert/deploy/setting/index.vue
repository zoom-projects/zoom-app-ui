<script setup lang="ts">
import DomainCDNAccount from '@/views/sub/domain/component/account/cdn/index.vue'
import { useCertDeploySettingHook } from './utils/hook'

const {
  columns,
  formModel,
  dialogVisible,

  cdnDialogVisible,
  cdnAccountFormModel,

  handleAdd,
  handleAddCdnAccount,
  handleLoadCdnAccount,
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
    >
      <template #plus-field-cdnAccountId="{ prop, label, fieldProps, valueType, column }">
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
    </PlusDialogForm>

    <DomainCDNAccount
      v-model:form-model="cdnAccountFormModel"
      v-model:visible="cdnDialogVisible"
      @success="handleLoadCdnAccount"
    />
  </div>
</template>
