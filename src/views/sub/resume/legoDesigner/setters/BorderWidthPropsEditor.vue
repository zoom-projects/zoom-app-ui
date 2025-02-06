<script lang="ts" setup>
import useSelectWidgetItem from '../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)
</script>

<template>
  <div class="padding-editor-box">
    <ElFormItem label="边框宽度:">
      <div class="padding-setting-box">
        <div class="left">
          <ElInputNumber
            v-model="widgetItem.css.borderWidthProps.left"
            :min="0"
            controls-position="right"
          />
        </div>
        <div class="center">
          <ElInputNumber
            v-model="widgetItem.css.borderWidthProps.top"
            :min="0"
            controls-position="right"
          />
          <ElInputNumber
            v-model="widgetItem.css.borderWidthProps.bottom"
            :min="0"
            controls-position="right"
          />
        </div>
        <div class="right">
          <ElInputNumber
            v-model="widgetItem.css.borderWidthProps.right"
            :min="0"
            controls-position="right"
          />
        </div>
      </div>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .padding-editor-box {
  .el-form-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .padding-setting-box {
      display: flex;
      justify-content: space-between;
      width: 70%;
      align-items: center;
      :deep(.el-input__wrapper) {
        padding-left: 0;
        padding-right: 25px;
      }
      .left,
      .right,
      .center {
        width: 30px;
        .el-input-number {
          width: 65px;
        }
      }
      .center {
        .el-input-number {
          margin: 12px 0;
        }
      }
    }
  }
}
</style>
