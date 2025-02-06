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
  <div class="rotate-editor-box">
    <ElFormItem label="旋转角度:">
      <ElInputNumber v-model="widgetItem.css.rotate" :min="-360" :max="360" />
      <span class="unit">deg</span>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .rotate-editor-box {
  .unit {
    margin-left: 10px;
    color: #929292;
    letter-spacing: 2px;
  }
}
</style>
