<script setup lang="ts">
import { AttachmentSelect } from '@/components/Attachment'
import { useNavWebsitesHook } from './utils/hook'

const {
  plusPageRef,
  columns,
  submitLoading,
  formModel,
  formRules,
  plusDrawerFormRef,
  drawerFormVisible,
  actionButtins,
  loadData,
  handleAdd,
  getWebsiteLogo,
  handleCancel,
  handleConfirm,
} = useNavWebsitesHook()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="columns"
      :request="loadData"
      :table="{
        actionBar: {
          buttons: actionButtins,
        },
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

      <template #plus-field-logo="{ row }">
        <el-image
          preview-teleported
          :src="row.logo"
          fit="cover"
          class="h-[100px] w-[100px]"
        />
      </template>
      <template #plus-field-tags="{ row }">
        <el-tag
          v-for="tag in row.tags"
          :key="tag"
          size="small"
          class="mb-1"
          type="primary"
        >
          {{ tag }}
        </el-tag>
      </template>
    </PlusPage>

    <PlusDrawerForm
      ref="plusDrawerFormRef"
      v-model="formModel"
      v-model:visible="drawerFormVisible"
      :title="formModel.id ? '编辑网站' : '新增网站'"
      size="45%"
      :form="{
        columns,
        rules: formRules,
        submitLoading,
      }"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    >
      <template #plus-field-logo="{ column }">
        <AttachmentSelect
          v-model="formModel[column.prop]"
          placeholder="请选择logo"
          :clearable="true"
        />
        <img
          v-if="formModel[column.prop]"
          :src="formModel[column.prop]"
          class="h-[100px] w-[100px]"
        >
      </template>
      <template #plus-field-url="{ column }">
        <el-input
          v-model="formModel[column.prop]"
          placeholder="请输入网站地址"
          clearable
        >
          <template #append>
            <el-button
              type="primary"
              @click="getWebsiteLogo"
            >
              获取LOGO
            </el-button>
          </template>
        </el-input>
      </template>
      <template #plus-field-isHidden="{ prop, column }">
        <ElSegmented v-model="formModel[prop]" :options="column.options.value" />
      </template>
      <template #plus-field-isDeprecated="{ prop, column }">
        <ElSegmented v-model="formModel[prop]" :options="column.options.value" />
      </template>
    </PlusDrawerForm>
  </div>
</template>
