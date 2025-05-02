<script setup lang="ts">
import DomainAcmeAccountEdit from '@/views/sub/domain/component/account/acme/edit/index.vue'
import { useDomainAcmeAccountHook } from './utils/hook'

const {
  plusPageRef,
  columns,
  actionButtions,
  onLoadData,
  handleSeach,

  dialogVisible,
  dialogFormModel,
  handleOpenDialog,
} = useDomainAcmeAccountHook()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="columns"
      :request="onLoadData"
      :table="{
        actionBar: {
          buttons: actionButtions,
        },
      }"
      :search="{
        onChange:handleSeach
      }"
    >
      <template #table-title>
        <ElButton type="primary" @click="handleOpenDialog()">
          添加账号
        </ElButton>
      </template>
    </PlusPage>

    <DomainAcmeAccountEdit
      v-model:visible="dialogVisible"
      v-model:form-model="dialogFormModel"
      @success="onLoadData"
    />
  </div>
</template>
