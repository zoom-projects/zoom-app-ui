<script setup lang="ts">
import Form from './form.vue'
import { useAttachmentHook } from './utils/hook'

const {
  plusPageRef,
  columns,
  actionButtins,
  plusDialogRef,
  formVisible,
  formUploadRef,
  loadData,
  handleOpen,
  handleClose,
  handleUpload,
} = useAttachmentHook()
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
          @click="handleOpen"
        >
          <template #icon>
            <ReIcon icon="i-ep:upload" class="el-icon" />
          </template>
          上传附件
        </el-button>
      </template>
      <template #plus-field-preview="{ row }">
        <template v-if="row.mediaType.includes('image')">
          <el-image
            preview-teleported
            :src="row.permalink"
            fit="cover"
            class="h-[100px] w-[100px]"
          />
        </template>
        <template v-else>
          {{ row.displayName }}
        </template>
      </template>
    </PlusPage>

    <PlusDialog
      ref="plusDialogRef"
      v-model="formVisible"
      title="上传附件"
    >
      <Form ref="formUploadRef" />
      <template #footer>
        <el-button @click="handleClose">
          取消
        </el-button>
        <el-popconfirm
          title="确定上传附件吗？"
          @confirm="handleUpload"
        >
          <template #reference>
            <el-button
              type="primary"
            >
              上传
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </PlusDialog>
  </div>
</template>
