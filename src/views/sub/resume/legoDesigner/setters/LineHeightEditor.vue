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
  <div class="line-height-editor-box">
    <ElFormItem label="行间距:">
      <ElInputNumber v-model="widgetItem.css.lineHeight" :min="0" :max="10" :step="0.5" />
    </ElFormItem>
  </div>
</template>
