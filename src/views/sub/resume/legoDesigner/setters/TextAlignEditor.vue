<script lang="ts" setup>
import SvgIcon from '../components/svgIcon/SvgIcon.vue'
import useSelectWidgetItem from '../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)

// 对齐方式列表
const textAlignList = [
  {
    iconfont: 'icon-zuoduiqi',
    layout: 'left',
    label: '左对齐',
  },
  {
    iconfont: 'icon-juzhongduiqi',
    layout: 'center',
    label: '居中对齐',
  },
  {
    iconfont: 'icon-zuoyouduiqi',
    layout: 'justify',
    label: '两端对齐',
  },
  {
    iconfont: 'icon-youduiqi',
    layout: 'right',
    label: '右对齐',
  },
]

// 选择对齐方式
function handleSelect(item: { layout: string }) {
  widgetItem.css.textAlign = item.layout
}
</script>

<template>
  <div class="text-align-editor-box">
    <ElFormItem label="水平对齐:">
      <div class="layout-box">
        <div
          v-for="(item, index) in textAlignList"
          :key="index"
          class="icon-box" :class="[{ 'icon-active': item.layout === widgetItem.css.textAlign }]"
          @click="handleSelect(item)"
        >
          <SvgIcon :icon-name="item.iconfont" color="#67c23a" size="18px" />
        </div>
      </div>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .text-align-editor-box {
  .layout-box {
    display: flex;

    .icon-box {
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba($color: #ccc, $alpha: 0);
      transition: all 0.3s;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: rgba($color: #ccc, $alpha: 0.2);
      }
      margin-right: 10px;
      cursor: pointer;
    }
    .icon-active {
      background-color: rgba($color: #ccc, $alpha: 0.2);
    }
  }
}
</style>
