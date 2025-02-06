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
  <div class="marker-size-editor-box">
    <ElFormItem label="标记大小:">
      <ElInputNumber v-model="widgetItem.css.markerSize" :min="0" />
      <span class="unit">像素</span>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .marker-size-editor-box {
  .unit {
    margin-left: 10px;
    color: #929292;
    letter-spacing: 2px;
  }
}
</style>
