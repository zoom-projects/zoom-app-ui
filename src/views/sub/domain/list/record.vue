<script setup lang="ts">
import type { DomainInfo } from '/src/api/modules/domain/info/types'
import { ArrowDown, ArrowUp, Close, Delete, Download, Refresh, Upload } from '@element-plus/icons-vue'
import { useRecordHook } from './utils/recordHook'
import { useRenderIcon } from '/src/components/ReIcon/hook'

const props = defineProps({
  visible: Boolean,
  domainObj: {
    type: Object as PropType<DomainInfo.ResDomain | null>,
  },
})
const emits = defineEmits(['update:visible'])

const visible = ref(props.visible)

watch(() => props.visible, (val) => {
  visible.value = val
})

watch(() => visible.value, (val) => {
  emits('update:visible', val)
})

const {
  currentCloud,
  currentDomain,
  domainOptions,
  handleDomainChange,

  recordTotal,
  groupCount,
  syncState,
  tableSelectedState,
  deleteState,

  plusPageRef,
  formColumns,
  loadData,
  searchChange,
  syncRecord,

  // table
  actionButtions,
  handleSelectionChange,
  handleFormChange,

  // dialog
  plusDialogFormRef,
  dialogFormVisible,
  dialogFormModel,
  dialogFormColumns,
  dialogFormLoading,
  handleOpenDialogForm,
  handleDialogFormSubmit,
  handleDelete,
} = useRecordHook(props)
</script>

<template>
  <ElDrawer v-model="visible" size="100%" :close-on-click-modal="false" :with-header="false" class="box_record">
    <div class="c_header flex items-center justify-between gap-16">
      <ElSpace :size="12">
        <div style="width: 100px; text-align: center">
          <ElImage style="height: 18px;" :src="currentCloud?.icon" />
        </div>
        <ElSelect v-model="currentDomain.id" style="width: 240px" filterable @change="handleDomainChange">
          <ElOption
            v-for="item in domainOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
        <ElSpace :size="8" style="min-width: 200px; margin: 0 auto">
          <ElTooltip>
            <template #content>
              <div v-for="(item, index) in groupCount" :key="index">
                {{ item.type }} : {{ item.count }} 条
              </div>
            </template>
            <ElSpace :size="4">
              <ElText type="info">
                解析记录
              </ElText>
              <ElText type="primary" style="font-weight: 500; font-family: fantasy sans-serif">
                {{ recordTotal }}
              </ElText>
              <ElText type="info">
                条
              </ElText>
            </ElSpace>
          </ElTooltip>
          <ElDivider direction="vertical" />
          <ElSpace :size="4">
            <ElText type="info">
              证书监控
            </ElText>
            <ElText type="primary" style="font-weight: 500; font-family: fantasy sans-serif">
              0
            </ElText>
            <ElText type="info">
              条
            </ElText>
          </ElSpace>
        </ElSpace>
      </ElSpace>
      <ElSpace :size="12">
        <ElButton :icon="Refresh" @click="searchChange()" />
        <ElButton :icon="Close" type="primary" @click="() => visible = false" />
      </ElSpace>
    </div>
    <PlusPage
      ref="plusPageRef"
      :columns="formColumns"
      :request="loadData"
      :search="{
        onChange: searchChange,
      }"
      :table="{
        isSelection: true,
        onSelectionChange: handleSelectionChange,
        onFormChange: handleFormChange,
        actionBar: {
          buttons: actionButtions,
          type: 'icon',
          confirmType: 'popconfirm',
        },
      }"
    >
      <template #search-footer="{ isShowUnfold, handleUnfold }">
        <ElButton type="primary" @click.stop="handleOpenDialogForm()">
          添加记录
        </ElButton>
        <ElTooltip content="同步云解析记录">
          <div>
            <ElPopconfirm title="确定要同步吗？" @confirm="syncRecord()">
              <template #reference>
                <ElButton
                  class="plus-search__unfold"
                  type="primary"
                  :icon="useRenderIcon({ icon: 'iconify-ri:download-cloud-2-line', size: '18px' })"
                  circle
                  :loading="syncState"
                />
              </template>
            </ElPopconfirm>
          </div>
        </ElTooltip>

        <ElTooltip content="导入解析记录">
          <div>
            <ElPopconfirm title="确定要导入吗？">
              <template #reference>
                <ElButton disabled class="plus-search__unfold" type="primary" :icon="Upload" circle />
              </template>
            </ElPopconfirm>
          </div>
        </ElTooltip>

        <ElTooltip content="导出解析记录">
          <div>
            <ElPopconfirm title="确定要导出吗？">
              <template #reference>
                <ElButton disabled class="plus-search__unfold" type="primary" :icon="Download" circle />
              </template>
            </ElPopconfirm>
          </div>
        </ElTooltip>

        <ElTooltip content="删除所选择解析记录">
          <div>
            <ElPopconfirm title="确定要删除吗？" @confirm="handleDelete()">
              <template #reference>
                <ElButton
                  :disabled="!tableSelectedState"
                  class="plus-search__unfold"
                  type="danger"
                  :icon="Delete"
                  circle
                  :loading="deleteState"
                />
              </template>
            </ElPopconfirm>
          </div>
        </ElTooltip>

        <ElTooltip content="批量监控SSL">
          <div>
            <ElPopconfirm title="确定要监控吗？">
              <template #reference>
                <ElButton
                  :disabled="!tableSelectedState"
                  class="plus-search__unfold"
                  type="primary"
                  :icon="useRenderIcon({ icon: 'iconify-ri:shield-check-line', size: '18px' })"
                  circle
                />
              </template>
            </ElPopconfirm>
          </div>
        </ElTooltip>

        <ElLink
          type="primary"
          :underline="false"
          href="javaScript:;"
          class="plus-search__unfold"
          @click="handleUnfold"
        >
          {{ isShowUnfold ? '收起' : '展开' }} <ElIcon>
            <ArrowUp v-if="isShowUnfold" />
            <ArrowDown v-else />
          </ElIcon>
        </ElLink>
      </template>
    </PlusPage>

    <PlusDialogForm
      ref="plusDialogFormRef"
      v-model:visible="dialogFormVisible"
      v-model="dialogFormModel"
      :form="{
        columns: dialogFormColumns,
      }"
      :dialog="{
        width: '35%',
        title: dialogFormModel.id ? '编辑解析记录' : '添加解析记录',
        confirmLoading: dialogFormLoading,
      }"
      @confirm="handleDialogFormSubmit"
    />
  </ElDrawer>
</template>

<style lang="scss" scoped>
.box_record {
  .c_header {
    border-bottom: 1px dashed var(--el-border-color);
    padding: 12px 16px;
  }
}
</style>
