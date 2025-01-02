<script setup lang="ts">
import { useNavCategoryHook } from './utils/hook'

const {
  plusPageRef,
  tableColumns,
  currentRow,
  tableActionButtions,
  loadData,
  loadChild,
  handleAddNew,

  plusDialogFormRef,
  dialogFormVisible,
  formColumns,
  formRules,
  formModel,
  submitLoading,
  handleConfirm,

} = useNavCategoryHook()
</script>

<template>
  <div class="main">
    <PlusPage
      ref="plusPageRef"
      :columns="tableColumns"
      :request="loadData"
      :pagination="false"
      :table="{
        lazy: true,
        treeProps: { children: 'children', hasChildren: 'hasChildren' },
        actionBar: { buttons: tableActionButtions, fixed: 'right' },
        load: loadChild,
      }"
    >
      <template #table-title>
        <div class="table-title">
          <el-button v-auth="['nav:category:save']" type="primary" @click="handleAddNew()">
            <template #icon>
              <ReIcon icon="i-ep:plus" class="el-icon" />
            </template>
            新增
          </el-button>
        </div>
      </template>
      <template #plus-field-icon="{ row }">
        <template v-if="row.icon">
          <ReIcon :icon="row.icon" :size="20" />
        </template>
        <template v-else>
          <span>暂无图标</span>
        </template>
      </template>
    </PlusPage>

    <PlusDialogForm
      ref="plusDialogFormRef"
      v-model="formModel"
      v-model:visible="dialogFormVisible"
      :form="{
        columns: formColumns,
        rules: formRules,
        labelWidth: '100px',
        rowProps: {
          gutter: 30,
        },
        submitLoading,
      }"
      :dialog="{
        title: currentRow ? '编辑' : '新增',
        width: '45%',
      }"
      @confirm="handleConfirm"
    >
      <template #plus-field-isHidden="{ prop, options }:any">
        <ElSegmented v-model="formModel[prop]" :options="options" />
      </template>
      <template #plus-field-icon="{ prop }">
        <IconPicker v-model="formModel[prop]" />
        <!-- <AttachmentSelect v-model="formModel[prop]" /> -->
      </template>
    </PlusDialogForm>
  </div>
</template>
