<script lang="ts" setup>
import { useFontSizeList } from '../hooks/useFontSizeList'
import useSelectWidgetItem from '../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)

// 字号列表
const fontSizeList = useFontSizeList()
</script>

<template>
  <div class="font-size-editor-box">
    <ElFormItem label="字号选择:">
      <ElSelect v-model="widgetItem.css.fontSize" :teleported="false" placeholder="请选择字号">
        <ElOption
          v-for="(item, index) in fontSizeList"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </ElFormItem>
  </div>
</template>
