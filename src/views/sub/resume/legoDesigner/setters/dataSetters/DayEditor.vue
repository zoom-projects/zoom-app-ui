<script lang="ts" setup>
import useSelectWidgetItem from '../../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)
</script>

<template>
  <div class="day-editor-box">
    <ElFormItem label="日期选择:">
      <ElDatePicker
        v-model="widgetItem.dataSource.day"
        type="date"
        placeholder="请选择日期"
        value-format="YYYY.MM.DD"
      />
    </ElFormItem>
  </div>
</template>
