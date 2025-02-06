<script lang="ts" setup>
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
  <div class="font-color-editor-box">
    <ElFormItem label="字体颜色:">
      <ColorPickerCustom v-model="widgetItem.css.fontColor" />
    </ElFormItem>
  </div>
</template>
