<script lang="ts" setup>
import type { IWidget } from '../../../types'
import defaultAvatar from '@/assets/resume/images/people.jpg'

interface IAvatar {
  widgetData: IWidget | null // 模块数据
}
const props = withDefaults(defineProps<IAvatar>(), {
  widgetData: null,
})

const defaultImg = defaultAvatar
</script>

<template>
  <div class="avatar-2-box">
    <el-image
      v-if="widgetData?.dataSource.avatarSrc"
      style="width: 115px; height: 115px"
      :src="widgetData.dataSource.avatarSrc"
    />
    <img v-else :src="defaultImg" style="width: 100%; height: 100%" alt="touxiang" srcset="">
  </div>
</template>

<style lang="scss" scoped>
  .avatar-2-box {
  width: v-bind('`${props.widgetData?.css.width}px`');
  height: v-bind('`${props.widgetData?.css.height}px`');
  border-style: v-bind('props.widgetData?.css.borderStyle');
  border-width: v-bind('`${props.widgetData?.css.borderWidth}px`');
  padding: v-bind('`${props.widgetData?.css.padding.top}px`') v-bind('`${props.widgetData?.css.padding.right}px`')
    v-bind('`${props.widgetData?.css.padding.bottom}px`') v-bind('`${props.widgetData?.css.padding.left}px`');
  border-color: v-bind('props.widgetData?.css.borderColor');
  overflow: hidden;
  background-color: v-bind('props.widgetData?.css.backgroundColor');
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  .el-image {
    border-radius: v-bind('`${props.widgetData?.css.borderRadius}px`');
  }
}
</style>
