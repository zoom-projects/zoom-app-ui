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
  <div class="left-editor-box">
    <ElFormItem label="X坐标:">
      <ElInputNumber v-model="widgetItem.css.left" />
    </ElFormItem>
  </div>
</template>
