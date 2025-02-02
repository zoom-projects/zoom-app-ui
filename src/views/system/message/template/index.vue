<script setup lang="ts">
import Tinymce from '@/components/Tinymce'
import { useMessageTemplate } from './utils/hook'

const {
  plusPageRef,
  plusDialogFormRef,
  formVisible,
  formModel,
  formRules,
  submitLoading,
  tableColumns,
  actionButtons,
  addNew,
  contentChange,
  handleSave,
  loadData,
} = useMessageTemplate()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="tableColumns"
      :request="loadData"
      :table="{
        actionBar: {
          buttons: actionButtons,
        },
      }"
    >
      <template #table-title>
        <div class="table-title">
          <el-button
            v-auth="['sys:message:template:add']"
            type="primary"
            @click="addNew"
          >
            <template #icon>
              <ReIcon icon="i-ep:plus" class="el-icon" />
            </template>
            新增
          </el-button>
        </div>
      </template>
    </PlusPage>

    <PlusDialogForm
      ref="plusDialogFormRef"
      v-model:visible="formVisible"
      v-model="formModel"
      :form="{
        columns: tableColumns,
        rules: formRules,
        labelWidth: '100px',
      }"
      :dialog="{
        title: formModel.id ? '编辑消息模板' : '新增消息模板',
        width: '45%',
        destroyOnClose: true,
      }"
      @confirm="handleSave"
    >
      <template #plus-field-templateType="{ prop, options }:any">
        <ElSegmented v-model="formModel[prop]" :options="options" />
      </template>
      <template #plus-field-templateContentHtml="{ prop }">
        <Tinymce :value="formModel[prop]" @change="contentChange" output-format="html" />
      </template>
      <template #plus-field-status="{ prop, options }:any">
        <ElSegmented v-model="formModel[prop]" :options="options" />
      </template>
      <template #dialog-footer="{ handleConfirm, handleCancel }">
        <ElButton
          @click="handleCancel"
        >
          取消
        </ElButton>
        <ElPopconfirm
          title="确认提交吗？"
          @confirm="handleConfirm"
        >
          <template #reference>
            <ElButton type="primary" :loading="submitLoading">
              确定
            </ElButton>
          </template>
        </ElPopconfirm>
      </template>
    </PlusDialogForm>
  </div>
</template>
