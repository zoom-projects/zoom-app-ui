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
  <div class="hj-rabbet-box">
    <div class="current-rabbet-box" />
    <!-- 边框 -->
    <div class="border-box" />
  </div>
</template>

<style lang="scss" scoped>
  .hj-rabbet-box {
  .current-rabbet-box {
    width: v-bind('`${props.widgetData?.css.width}px`');
    height: v-bind('`${props.widgetData?.css.height}px`');
    position: relative;
    clip-path: polygon(
      0% 15%,
      15% 15%,
      15% 0%,
      85% 0%,
      85% 15%,
      100% 15%,
      100% 85%,
      85% 85%,
      85% 100%,
      15% 100%,
      15% 85%,
      0% 85%
    );
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
    clip-path: polygon(
      0% 15%,
      15% 15%,
      15% 0%,
      85% 0%,
      85% 15%,
      100% 15%,
      100% 85%,
      85% 85%,
      85% 100%,
      15% 100%,
      15% 85%,
      0% 85%
    );

    z-index: 0;
  }
}
</style>
