<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { useDomainAutomationHook } from './utils/hook'

const {
  domainInfoList,
  plusPageRef,
  plusDialogFormRef,
  columns,
  actionBar,
  formColumns,
  formRules,
  dialogLoading,
  formDomains,
  dialogVisible,
  formModel,
  loadData,
  handleOpenDialog,
  handleAddDomainRecord,
  handleSelectDomain,
  handleDeleteDomainRecord,
  handleSave,
} = useDomainAutomationHook()
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
          @click="handleOpenDialog()"
        >
          <template #icon>
            <ReIcon icon="i-ep:plus" class="el-icon" />
          </template>
          新增
        </el-button>
      </template>
      <template #table-toolbar>
        <el-button type="primary" text>
          部署记录
        </el-button>

        <el-button type="primary" text>
          申请证书
        </el-button>
      </template>
    </PlusPage>

    <PlusDialogForm
      ref="plusDialogFormRef"
      v-model="formModel"
      v-model:visible="dialogVisible"
      :form="{
        columns: formColumns,
        labelWidth: '100px',
        rules: formRules,
      }"
      :dialog="{
        title: formModel.id ? '编辑' : '新增',
        width: '600px',
        confirmLoading: dialogLoading,
      }"
      @confirm="handleSave"
    >
      <template #plus-field-enabled="{ prop, column }">
        <el-segmented v-model="formModel[prop]" :options="column.options" />
      </template>
      <template #plus-field-domain>
        <el-row :gutter="20" w-full>
          <el-col v-for="(item, index) in formDomains" :key="index" m-b-1 :span="24">
            <div class="flex items-center">
              <div flex="1">
                <el-input v-model="item.record" class="input-with-select">
                  <template #append>
                    <el-select
                      v-model="item.domain"
                      placeholder="请选择域名"
                      style="width: 150px"
                      filterable
                      @change="(val) => handleSelectDomain(val, index)"
                    >
                      <el-option
                        v-for="(domain, index) in domainInfoList"
                        :key="index"
                        :label="`.${domain.label}`"
                        :value="domain.label"
                      />
                    </el-select>
                  </template>
                </el-input>
              </div>
              <el-button
                class="ml-2"
                :icon="Delete"
                @click="handleDeleteDomainRecord(index)"
              />
            </div>
          </el-col>
          <el-col :span="24">
            <el-button @click="handleAddDomainRecord">
              <ReIcon icon="i-ep:plus" class="el-icon" />
              添加域名
            </el-button>
            <el-popover
              title="添加多个域名"
            >
              <template #default>
                <div>支持多个域名打到一本证书</div>
                <div>根域名可以不同</div>
                <div>支持泛域名与根域名同一本</div>
                <div>例： a.com *.b.com 可以用一本证书</div>
              </template>
              <template #reference>
                <ReIcon icon="i-ep:question-filled" class="el-icon" />
              </template>
            </el-popover>
          </el-col>
        </el-row>
      </template>

      <template #dialog-footer="{ handleConfirm, handleCancel }">
        <el-button @click="handleCancel">
          取消
        </el-button>
        <el-popconfirm
          title="确定保存吗？"
          @confirm="handleConfirm"
        >
          <template #reference>
            <el-button
              type="primary"
              :loading="dialogLoading"
            >
              保存
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </PlusDialogForm>
  </div>
</template>

<style lang="scss" scoped>
.input-with-select ::v-deep(.el-input-group__append) {
  background-color: var(--el-fill-color-blank);
}
</style>
