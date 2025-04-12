<script setup lang="ts">
import { useMessageNotifyHook } from './utils/hook'

const {
  plusPageRef,
  columns,
  actions,
  groupColumns,
  formLoading,
  formModel,
  dialogVisible,
  plusDialogFormRef,
  formRules,
  loadData,
  openDialog,
  handleSave,
  handleChange,
} = useMessageNotifyHook()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="columns"
      :table="{
        actionBar: actions,
        onFormChange: handleChange
      }"
      :request="loadData"
    >
      <template #table-title>
        <el-button
          type="primary"
          @click="openDialog()"
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
      v-model:visible="dialogVisible"
      v-model="formModel"
      :form="{
        group: groupColumns,
        rules: formRules,
        labelWidth: '120px',
      }"
      :dialog="{
        title: formModel.id ? '编辑' : '新增',
      }"
      @confirm="handleSave"
    >
      <template #plus-field-emailList="{ prop }">
        <JsonEditor v-model:value="formModel[prop]" />
      </template>
      <template #plus-field-dingTalkBody="{ prop }">
        <JsonEditor v-model:value="formModel[prop]" />
      </template>
      <template #plus-extra-dingTalkBody>
        <ElLink
          href="https://open.dingtalk.com/document/orgapp/robot-overview"
          :underline="false"
          type="primary"
          target="_blank"
        >
          《钉钉-自定义机器人》
        </ElLink>
      </template>
      <template #plus-field-workWechatBody="{ prop }">
        <JsonEditor v-model:value="formModel[prop]" />
      </template>
      <template #plus-extra-workWechatBody>
        <ElLink
          href="https://developer.work.weixin.qq.com/document/path/99110"
          :underline="false"
          type="primary"
          target="_blank"
        >
          《企业微信-自定义机器人》
        </ElLink>
      </template>
      <template #plus-field-feishuBody="{ prop }">
        <JsonEditor v-model:value="formModel[prop]" />
      </template>
      <template #plus-extra-feishuBody>
        <ElLink
          href="https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot"
          :underline="false"
          type="primary"
          target="_blank"
        >
          《飞书-自定义机器人》
        </ElLink>
      </template>
    </PlusDialogForm>
  </div>
</template>
