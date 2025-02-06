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
  <div class="show-text-editor-box">
    <ElFormItem label="提示文字:">
      <ElSwitch v-model="widgetItem.props.showText" />
    </ElFormItem>
  </div>
</template>
