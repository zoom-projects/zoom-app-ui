<script setup lang="ts">
import type { IWidget } from '../../types'
import { storeToRefs } from 'pinia'
import { useLegoJsonStoreHook, useLegoSelectWidgetStoreHook } from '../../store/lego'
import NoData from '../NoData/index.vue'

const emit = defineEmits(['selectWidget'])

// 初始页面JSON
const { HJSchemaJsonStore } = storeToRefs(useLegoJsonStoreHook())
const { selectedWidgetId, widgetActiveObj, pageActiveIndex } = storeToRefs(
  useLegoSelectWidgetStoreHook(),
)

// 是否有组件
const isHaveLayer = computed(() => {
  for (let i = 0; i < HJSchemaJsonStore.value.componentsTree.length; i++) {
    if (HJSchemaJsonStore.value.componentsTree[i].children.length > 0) {
      return true
    }
  }
  return false
})

// 点击选中组件
function selectWidget(pageIndex: number, widgetItem: IWidget) {
  selectedWidgetId.value = widgetItem.id
  // 取消选中所有组件
  for (const key in widgetActiveObj.value) {
    if (widgetActiveObj.value[key]) {
      widgetActiveObj.value[key] = false
    }
  }
  widgetActiveObj.value[selectedWidgetId.value] = true
  pageActiveIndex.value = pageIndex
  // 滚动到可是区域
  emit('selectWidget')
}

// 删除组件
function deleteWidget(pageIndex: number, widgetItem: IWidget) {
  // 组件在children中的索引
  const widgetIndex = HJSchemaJsonStore.value.componentsTree[pageIndex].children.findIndex(
    (item: { id: string }) => item.id === widgetItem.id,
  )
  // 删除组件的选中状态
  delete widgetActiveObj.value[selectedWidgetId.value]
  // 取消选中
  selectedWidgetId.value = ''
  pageActiveIndex.value = -1
  // 删除组件
  HJSchemaJsonStore.value.componentsTree[pageIndex].children.splice(widgetIndex, 1)
}
</script>

<template>
  <div class="layer-manage-box">
    <template v-if="isHaveLayer">
      <!-- 组件列表 -->
      <div
        v-for="(item, index) in HJSchemaJsonStore.componentsTree"
        :key="index"
        class="com-list-box"
      >
        <ElCollapse>
          <ElCollapseItem :title="`第${index + 1}页`" :name="item.id">
            <div
              v-for="(itemCom, itemIndex) in item.children"
              :key="itemIndex"
              class="widget-item"
              :class="[{ 'widget-active': selectedWidgetId === itemCom.id }]"
              @click="selectWidget(index, itemCom)"
            >
              <span>{{ itemCom.keywords }}</span>
              <div class="icon-box" title="删除组件" @click.stop="deleteWidget(index, itemCom)">
                <ReIcon icon="iconify-ep:delete" color="green" size="17px" />
              </div>
            </div>
          </ElCollapseItem>
        </ElCollapse>
      </div>
    </template>
    <!-- 没有选中组件时展示 -->
    <div v-else class="no-data">
      <NoData width="200px" height="200px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .layer-manage-box {
  width: 100%;
  .com-list-box {
    :deep(.el-collapse) {
      border-top: none;
      .el-collapse-item__header {
        padding: 0 15px;
      }
      .el-collapse-item__content {
        padding: 0;
      }
      .widget-item {
        transition: all 0.3s;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        cursor: pointer;
        &:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
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
            background-color: rgba($color: #ccc, $alpha: 0.3);
          }
        }
      }
      .widget-active {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
  .no-data {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
