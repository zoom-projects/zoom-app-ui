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
  <div class="top-editor-box">
    <ElFormItem label="Y坐标:">
      <ElInputNumber v-model="widgetItem.css.top" />
    </ElFormItem>
  </div>
</template>
