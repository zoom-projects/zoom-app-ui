<script setup lang="ts">
import type { PlusColumn, PlusDialogInstance } from 'plus-pro-components'
import type { NoticeReadingProps } from './types'

const props = withDefaults(defineProps<NoticeReadingProps>(), {
  visible: false,
  title: '消息内容',
  hideClose: true,
  width: '45%',
})
const emits = defineEmits(['update:visible'])
const localVisible = ref<boolean>(props.visible)

watch(() => props.visible, (val) => {
  localVisible.value = val
})
watch(() => localVisible.value, (val) => {
  emits('update:visible', val)
})

const plusDialogRef = ref<Nullable<PlusDialogInstance>>(null)

const columns: PlusColumn[] = [
  {
    label: '类型',
    prop: 'type',
    width: 80,
    renderDescriptionsItem(_) {
      return h('span', {}, '站内信')
    },
  },
  {
    label: '发送时间',
    prop: 'created',
    width: 120,
  },
  {
    label: '标题',
    prop: 'title',
    descriptionsItemProps: {
      span: 2,
    },
  },
  {
    label: '内容',
    prop: 'content',
    descriptionsItemProps: {
      span: 2,
    },
  },
]
</script>

<template>
  <PlusDialog
    ref="plusDialogRef"
    v-model:model-value="localVisible"
    :title="title"
    :has-footer="false"
    :width="width"
  >
    <PlusDescriptions
      :column="2"
      :columns="columns"
      :data="props.data"
    />
  </PlusDialog>
</template>
