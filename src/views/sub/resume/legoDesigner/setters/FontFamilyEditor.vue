<script lang="ts" setup>
import { useFontFamilyList } from '../hooks/useFontFamlyList'
import useSelectWidgetItem from '../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)

// 字体列表
const fontFamilyList = useFontFamilyList()

// 字体变化
function secondFontFamilyChange(value: string) {
  console.log(value)
}
</script>

<template>
  <div class="font-family-editor-box">
    <ElFormItem label="字体选择:">
      <ElSelect
        v-model="widgetItem.css.fontFamily"
        :teleported="false"
        placeholder="请选择字体"
        @change="secondFontFamilyChange"
      >
        <ElOption
          v-for="(item, index) in fontFamilyList"
          :key="index"
          :label="item"
          :value="item"
          :style="{ fontFamily: item }"
        />
      </ElSelect>
    </ElFormItem>
  </div>
</template>
