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
  <div class="aided-text-color-editor-box">
    <ElFormItem label="辅助文字颜色:">
      <ColorPickerCustom
        v-model="widgetItem.props.aidedTextColor"
        teleported
      />
    </ElFormItem>>
  </div>
</template>
