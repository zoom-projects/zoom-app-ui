<script lang="ts" setup>
import type { UploadProps } from 'element-plus'
import type { IWidget } from '../../types'
// import CONFIG from '@/config'
// import appStore from '@/store'
import { useGetWidgetItemById } from '../../hooks/useSelectWidgetItem'
import { getImgListStyleImageFile } from './imageList'

interface IAvatar {
  widgetData: IWidget | null // 模块数据
}
const props = withDefaults(defineProps<IAvatar>(), {
  widgetData: null,
})

// 文件上传成功
const imageRef = ref<any>(null)
</script>

<template>
  <div class="image-list-box">
    <template v-if="!widgetData?.dataSource.imgUrl">
      <!-- 上传控件 -->
      <div class="upload-widget">
        <UploadImg v-model="widgetData!.dataSource.imgUrl" />
      </div>
    </template>
    <template v-else>
      <img
        ref="imageRef"
        class="img-box"
        :src="getImgListStyleImageFile(widgetData?.dataSource.imgUrl)"
        alt="图片"
      >
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .image-list-box {
  width: v-bind('`${props.widgetData?.css.width}px`');
  height: v-bind('`${props.widgetData?.css.height}px`');
  border-style: v-bind('props.widgetData?.css.borderStyle');
  border-width: v-bind('`${props.widgetData?.css.borderWidth}px`');
  padding: v-bind('`${props.widgetData?.css.padding.top}px`') v-bind('`${props.widgetData?.css.padding.right}px`')
    v-bind('`${props.widgetData?.css.padding.bottom}px`') v-bind('`${props.widgetData?.css.padding.left}px`');
  border-color: v-bind('props.widgetData?.css.borderColor');
  border-radius: v-bind('`${props.widgetData?.css.borderRadius}px`');
  background: v-bind('props.widgetData?.css.backgroundColor');
  .upload-widget {
    :deep(.avatar-uploader) {
      .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
        width: v-bind('`${props.widgetData?.css.width}px`');
        height: v-bind('`${props.widgetData?.css.height}px`');
      }

      .el-upload:hover {
        border-color: var(--el-color-primary);
      }

      .el-icon.avatar-uploader-icon {
        font-size: 48px;
        color: #8c939d;
        width: v-bind('`${props.widgetData?.css.width}px`');
        height: v-bind('`${props.widgetData?.css.height}px`');
        text-align: center;
      }
    }
  }
  .img-box {
    width: 100%;
    height: 100%;
  }
}
</style>
