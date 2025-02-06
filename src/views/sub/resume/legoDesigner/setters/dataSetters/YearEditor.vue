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
  <div class="year-editor-box">
    <ElFormItem label="年份选择:">
      <ElDatePicker
        v-model="widgetItem.dataSource.year"
        type="year"
        placeholder="请选择年份"
        value-format="YYYY"
      />
    </ElFormItem>
  </div>
</template>
