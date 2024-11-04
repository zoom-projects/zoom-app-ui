<script setup lang="ts">
import { useOpenApi } from './utils/useOpenApi'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  roleInfo: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:visible'])

const {
  openApiTableRef,
  dataList,
  roleInfo,
  loading,
  dialogVisible,
  handleCancel,
  handleConfirm,
} = useOpenApi()

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
  },
  {
    immediate: true,
  },
)

watch(dialogVisible, (val) => {
  emit('update:visible', val)
})

watch(
  () => props.roleInfo,
  (val) => {
    roleInfo.value = val
  },
)
</script>

<template>
  <div class="main">
    <PlusDialog
      v-model="dialogVisible"
      title="开放接口"
      width="800px"
    >
      <OpenApiTable ref="openApiTableRef" :data-list="dataList" />
      <template #footer>
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
            <ElButton
              type="primary"
              :loading="loading"
            >
              确定
            </ElButton>
          </template>
        </ElPopconfirm>
      </template>
    </PlusDialog>
  </div>
</template>
