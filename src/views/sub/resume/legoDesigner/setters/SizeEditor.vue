<script lang="ts" setup>
import useSelectWidgetItem from '../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)

// 下拉选择列表
const sizeList = [
  {
    label: '大',
    value: 'large',
  },
  {
    label: '默认',
    value: 'default',
  },
  {
    label: '小',
    value: 'small',
  },
]
</script>

<template>
  <div class="size-editor-box">
    <ElFormItem label="组件大小:">
      <ElSelect v-model="widgetItem.props.size" placeholder="请选择大小">
        <ElOption
          v-for="(item, index) in sizeList"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .size-editor-box {
  .unit {
    margin-left: 10px;
    color: #929292;
    letter-spacing: 2px;
  }
}
</style>
