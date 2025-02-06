<script lang="ts" setup>
import useSelectWidgetItem from '../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)

// 边框样式映射表
const borderStyleList = ['dashed', 'dotted', 'double', 'groove', 'inset', 'outset', 'solid']

// 切换borderStyle
function changeBorderStyle(item: string) {
  widgetItem.css.borderStyle = item
  console.log('widgetItem', widgetItem)
}
</script>

<template>
  <div class="border-style-editor-box">
    <ElFormItem label="边框样式:">
      <ElPopover placement="top" :width="300" trigger="click">
        <!-- 边框样式选项 -->
        <div class="border-editor-style-list">
          <div
            v-for="(item, index) in borderStyleList"
            :key="index"
            class="border"
            :style="{ borderStyle: item, borderColor: widgetItem.css.borderColor }"
            @click="changeBorderStyle(item)"
          />
        </div>
        <template #reference>
          <div class="border-style" />
        </template>
      </ElPopover>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .border-style-editor-box {
  :deep(.border-style-list) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .border {
      width: 30%;
      border-width: 5px;
      border-left: none;
      border-right: none;
      cursor: pointer;
    }
  }
  .border-style {
    width: 120px;
    height: 30px;
    border-width: 5px;
    border-color: v-bind('widgetItem.css.borderColor');
    border-style: v-bind('widgetItem.css.borderStyle');
    cursor: pointer;
    transition: all 0.3s;
  }
}
</style>

<style lang="scss">
  .border-editor-style-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 140px;
  align-content: space-evenly;
  .border {
    cursor: pointer;
    width: 30%;
    height: 30px;
    border-width: 3px;
    border-left: none;
    border-right: none;
    border-bottom: none;
  }
}
</style>
