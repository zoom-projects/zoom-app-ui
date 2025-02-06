<script lang="ts" setup>
import SvgIcon from '../components/svgIcon/SvgIcon.vue'
import useSelectWidgetItem from '../hooks/useSelectWidgetItem'
import { iconfontList } from '../widgets/icon/iconfont'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)

// 选中图标
function handleIcon(item: { font_class: string }) {
  widgetItem.props.icon = `icon-${item.font_class}`
}
</script>

<template>
  <div class="icon-editor-box">
    <ElFormItem label="图标选择:">
      <ElPopover popper-class="icon-editor-pop-box" :width="400" trigger="click">
        <template #reference>
          <div class="icon-editor-icon-box">
            <SvgIcon :icon-name="widgetItem?.props.icon" color="#74a274" size="22px" />
          </div>
        </template>
        <div class="icon-select-box">
          <div
            v-for="(item, index) in iconfontList.glyphs"
            :key="index"
            class="icon-list-item"
            @click="handleIcon(item)"
          >
            <SvgIcon :icon-name="`icon-${item.font_class}`" color="#74a274" size="20px" />
          </div>
        </div>
      </ElPopover>
    </ElFormItem>
  </div>
</template>

<style lang="scss">
  .icon-editor-icon-box {
  display: flex;
  align-items: center;
  height: 30px;
  border-radius: 5px;
  padding: 0 10px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: rgba($color: #ccc, $alpha: 0.2);
  }
}

.icon-editor-pop-box {
  .icon-select-box {
    width: 100%;
    height: 500px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon-list-item {
      display: flex;
      align-items: center;
      height: 30px;
      border-radius: 5px;
      padding: 0 10px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        background-color: rgba($color: #ccc, $alpha: 0.2);
      }
    }
  }
}
</style>
