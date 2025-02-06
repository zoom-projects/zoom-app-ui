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
  <div class="font-weight-editor-box">
    <ElFormItem label="文本内容:">
      <ElInput v-model="widgetItem.dataSource.text" type="textarea" :rows="4" />
    </ElFormItem>
  </div>
</template>
