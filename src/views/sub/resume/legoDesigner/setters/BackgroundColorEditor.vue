<script setup lang="ts">
import ColorPickerCustom from '../components/colorPicker/ColorPickerCustom.vue'
import useSelectWidgetItem from '../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)
</script>

<template>
  <div class="background-color-editor-box">
    <ElFormItem label="背景颜色:">
      <ColorPickerCustom v-model="widgetItem.css.backgroundColor" />
    </ElFormItem>
  </div>
</template>
