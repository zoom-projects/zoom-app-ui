<script lang="ts" setup>
import { Download, Upload } from '@element-plus/icons-vue'
import useSelectWidgetItem from '../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)

// 上移
function up() {
  widgetItem.css.zIndex++
}

// 下移
function down() {
  widgetItem.css.zIndex--
}
</script>

<template>
  <div class="z-index-editor-box">
    <ElFormItem label="层级:">
      <ElButton type="primary" plain @click="up">
        向上一层<ElIcon class="el-icon--right">
          <Upload />
        </ElIcon>
      </ElButton>
      <ElButton type="primary" plain @click="down">
        向下一层<ElIcon class="el-icon--right">
          <Download />
        </ElIcon>
      </ElButton>
    </ElFormItem>
  </div>
</template>
