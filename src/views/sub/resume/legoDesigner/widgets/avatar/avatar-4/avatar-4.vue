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
  <div class="avatar-4-box">
    <div class="img-box">
      <el-image
        v-if="widgetData?.dataSource.avatarSrc"
        style="width: 115px; height: 115px"
        :src="widgetData.dataSource.avatarSrc"
      />
      <img v-else :src="defaultImg" style="width: 88%; height: 88%" alt="touxiang" srcset="">
    </div>
    <!-- 边框 -->
    <div class="border-box" />
  </div>
</template>

<style lang="scss" scoped>
  .avatar-4-box {
  .img-box {
    width: v-bind('`${props.widgetData?.css.width}px`');
    height: v-bind('`${props.widgetData?.css.height}px`');
    position: relative;
    background-size: cover;
    clip-path: inset(5% 10% 15% 20% round 20% 5% 50% 0);
    padding: v-bind('`${props.widgetData?.css.padding.top}px`') v-bind('`${props.widgetData?.css.padding.right}px`')
      v-bind('`${props.widgetData?.css.padding.bottom}px`') v-bind('`${props.widgetData?.css.padding.left}px`');
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .border-box {
    width: v-bind('`${props.widgetData?.css.width + props.widgetData?.css.borderWidth + 2}px`');
    height: v-bind('`${props.widgetData?.css.height + props.widgetData?.css.borderWidth + 2}px`');
    background-color: v-bind('props.widgetData?.css.borderColor');
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    clip-path: inset(5% 10% 15% 20% round 20% 5% 50% 0);
    z-index: 0;
  }
}
</style>
