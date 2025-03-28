<script setup lang="ts">
import type { IWidget, IWidgetTab } from '../../types'
import { clone } from '@/utils'
import { WIDGET_CONFIG_LIST } from '../../schema/widgetConfig'
import { getAssetsFile } from '../../utils/common'
import { iconfontList } from '../../widgets/icon/iconfont'
import LegoDesignIcon from '../../widgets/icon/LegoDesignIconList.vue'
import { useIconfontItem } from '../../widgets/icon/useIconfontItem'
import { imageList } from '../../widgets/image/imageList'
import LegoImage from '../../widgets/image/ImageList.vue'
import { useImageListItem } from '../../widgets/image/useImageListItem'
import LegoLi from '../../widgets/li/LegoLiList.vue'
import { ListStyleTypeList } from '../../widgets/li/liList'
import { useLiListItem } from '../../widgets/li/useLiListItem'

const emit = defineEmits(['addWidget'])

// 拖拽开始的事件
function dragStart(event: any, item: IWidgetTab, itemCom: IWidget) {
  console.log('拖拽开始', itemCom)
  const widgetItem = clone(itemCom, true)
  widgetItem.dataSource = Object.assign(item.dataSource, itemCom.dataSource)
  event.dataTransfer.setData('widgetItem', JSON.stringify(widgetItem))
}

// 点击组件
function addWidgetToCenter(item: IWidgetTab, itemCom: IWidget) {
  const widgetItem = clone(itemCom, true)
  widgetItem.dataSource = Object.assign(item.dataSource, itemCom.dataSource)
  emit('addWidget', widgetItem)
}

// 拖拽结束事件
function dragEnd(event: any) {
  event.dataTransfer.clearData()
}

// 初始化图标列表
function initIconfontList() {
  WIDGET_CONFIG_LIST.forEach((cptList) => {
    if (cptList.category === 'icon') {
      iconfontList.glyphs.forEach(iconItem => cptList.list.push(useIconfontItem(iconItem)))
    }
  })
}
initIconfontList()

// 初始化列表组件
function initLiList() {
  WIDGET_CONFIG_LIST.forEach((cptList) => {
    if (cptList.category === 'li') {
      ListStyleTypeList.forEach(listStyleTypeItem =>
        cptList.list.push(useLiListItem(listStyleTypeItem)),
      )
    }
  })
}
initLiList()

// 初始化图片列表
function initImgList() {
  WIDGET_CONFIG_LIST.forEach((cptList) => {
    if (cptList.category === 'image') {
      imageList.forEach(imgItem => cptList.list.push(useImageListItem(imgItem)))
    }
  })
}
initImgList()
</script>

<template>
  <div class="widget-list-box">
    <!-- 组件列表 -->
    <div v-for="(item, index) in WIDGET_CONFIG_LIST" :key="index" class="com-list-box">
      <ElCollapse>
        <ElCollapseItem :title="item.title">
          <template #title>
            <div class="icon-box">
              <ReIcon
                :icon="item.icon"
                color="#4c4948"
                size="18px"
                class-name="title-icon"
              />
            </div>
            {{ item.title }}
          </template>
          <div
            v-for="(itemCom, itemIndex) in item.list"
            :key="itemIndex"
            draggable="true"
            class="widget-item"
            :style="{
              width: itemCom.screenShot.width,
              height: itemCom.screenShot.height,
              borderRadius: itemCom.screenShot.borderRadius,
            }"
            @dragstart="dragStart($event, item, itemCom)"
            @dragend="dragEnd($event)"
            @click="addWidgetToCenter(item, itemCom)"
          >
            <!-- 图标 -->
            <LegoDesignIcon v-if="item.category === 'icon'" :widget-data="itemCom" />
            <!-- 列表 -->
            <LegoLi v-else-if="item.category === 'li'" :widget-data="itemCom" />
            <!-- 图片 -->
            <LegoImage v-else-if="item.category === 'image'" :widget-data="itemCom" />
            <!-- 普通组件 -->
            <img v-else :src="getAssetsFile(itemCom.screenShot.src)">
          </div>
        </ElCollapseItem>
      </ElCollapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .widget-list-box {
  width: 100%;
  position: relative;
  .icon-box {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .com-list-box {
    :deep(.el-collapse) {
      border-top: none;
      .el-collapse-item__header {
        padding: 0 15px;
        user-select: none;
      }
      .el-collapse-item__content {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .widget-item {
        border-radius: 2px;
        // box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 1px;
        overflow: hidden;
        cursor: move;
        transition: all 0.3s;
        margin-bottom: 20px;
        &:hover {
          box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 3px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
