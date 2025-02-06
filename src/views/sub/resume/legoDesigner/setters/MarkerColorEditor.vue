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
  <div class="marker-color-editor-box">
    <ElFormItem label="标记颜色:">
      <ColorPickerCustom v-model="widgetItem.css.markerColor" />
    </ElFormItem>
  </div>
</template>
