<script lang="ts" setup>
import type { IWidget } from '../../../types'

interface IAvatar {
  widgetData: IWidget | null // 模块数据
}
const props = withDefaults(defineProps<IAvatar>(), {
  widgetData: null,
})
</script>

<template>
  <div class="hj-leftChevron-box">
    <div class="current-leftChevron-box" />
    <!-- 边框 -->
    <div class="border-box" />
  </div>
</template>

<style lang="scss" scoped>
  .hj-leftChevron-box {
  .current-leftChevron-box {
    width: v-bind('`${props.widgetData?.css.width}px`');
    height: v-bind('`${props.widgetData?.css.height}px`');
    position: relative;
    clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%);
    z-index: 1;
    background: v-bind('props.widgetData?.css.backgroundColor');
  }
  .border-box {
    width: v-bind('`${props.widgetData?.css.width + props.widgetData?.css.borderWidth}px`');
    height: v-bind('`${props.widgetData?.css.height + props.widgetData?.css.borderWidth}px`');
    background-color: v-bind('props.widgetData?.css.borderColor');
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%);

    z-index: 0;
  }
}
</style>
