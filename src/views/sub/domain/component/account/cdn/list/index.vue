<script setup lang="ts">
import DomainCDNAccountEdit from '@/views/sub/domain/component/account/cdn/edit/index.vue'
import { drawerEmits, drawerProps } from 'element-plus'
import { useCDNAccountListHook } from './utils/hook'

const props = defineProps({
  ...drawerProps,
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits({
  ...drawerEmits,
})
const modelValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  modelValue.value = val
})

watch(modelValue, (val) => {
  emits('update:modelValue', val)
})

const {
  plusPageRef,
  columns,
  actionBar,
  currentModel,
  dialogVisible,
  loadData,
  handleAdd,
  handleLoadData,
} = useCDNAccountListHook()
</script>

<template>
  <ElDrawer
    v-bind="props"
    v-model:model-value="modelValue"
    v-on="{ ...emits }"
  >
    <PlusPage
      ref="plusPageRef"
      :columns="columns"
      :request="loadData"
      :table="{
        actionBar,
      }"
    >
      <template #table-toolbar>
        <ElButton type="primary" @click="handleAdd">
          <template #icon>
            <ReIcon icon="i-ep:plus" class="el-icon" />
          </template>
          新增
        </ElButton>
      </template>
    </PlusPage>

    <DomainCDNAccountEdit
      v-model:visible="dialogVisible"
      v-model:form-model="currentModel"
      @success="handleLoadData"
    />
  </ElDrawer>
</template>
