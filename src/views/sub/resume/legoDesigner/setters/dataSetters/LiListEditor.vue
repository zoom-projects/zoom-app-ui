<script lang="ts" setup>
import { Plus, SemiSelect } from '@element-plus/icons-vue'
import useSelectWidgetItem from '../../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)

// 输入框中的值发生改变
function handleInput(value: string, index: number) {
  widgetItem.dataSource.liList[index] = value
}

// 删除一条
function deleteContent(index: number) {
  widgetItem.dataSource.liList.splice(index, 1)
}

// 添加一条
function addContent(index: number) {
  widgetItem.dataSource.liList.push(widgetItem.dataSource.liList[index])
  console.log('最新的widgetItem', widgetItem)
}
</script>

<template>
  <div class="li-text-editor-box">
    <ElFormItem label="列表内容:">
      <div v-for="(item, index) in widgetItem.dataSource.liList" :key="index" class="list-item">
        <ElInput
          :model-value="item"
          type="textarea"
          :rows="4"
          @input="handleInput($event, index)"
        />
        <div class="edit-btn">
          <ElButton
            :disabled="widgetItem.dataSource.liList.length === 1"
            type="danger"
            :icon="SemiSelect"
            circle
            @click="deleteContent(index)"
          />
          <ElButton type="primary" :icon="Plus" circle @click="addContent(index)" />
        </div>
      </div>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .li-text-editor-box {
  .list-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .edit-btn {
      display: flex;
      margin-left: 10px;
    }
  }
}
</style>
