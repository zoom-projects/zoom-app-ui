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
  <div class="border-radius-editor-box">
    <ElFormItem label="圆角:">
      <ElInputNumber v-model="widgetItem.css.borderRadius" :min="0" />
      <span class="unit">像素</span>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .border-radius-editor-box {
  .unit {
    margin-left: 10px;
    color: #929292;
    letter-spacing: 2px;
  }
}
</style>
