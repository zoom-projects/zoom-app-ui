<script lang="ts" setup>
import useSelectWidgetItem from '../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)
</script>

<template>
  <div class="font-weight-editor-box">
    <ElFormItem label="字体粗细:">
      <ElInputNumber v-model="widgetItem.css.fontWeight" :min="0" :max="1000" :step="100" />
    </ElFormItem>
  </div>
</template>
