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
  <div class="hj-circle-box" />
</template>

<style lang="scss" scoped>
  .hj-circle-box {
  width: v-bind('`${props.widgetData?.css.width}px`');
  height: v-bind('`${props.widgetData?.css.height}px`');
  border-style: v-bind('props.widgetData?.css.borderStyle');
  border-width: v-bind('`${props.widgetData?.css.borderWidth}px`');
  padding: v-bind('`${props.widgetData?.css.padding.top}px`') v-bind('`${props.widgetData?.css.padding.right}px`')
    v-bind('`${props.widgetData?.css.padding.bottom}px`') v-bind('`${props.widgetData?.css.padding.left}px`');
  border-color: v-bind('props.widgetData?.css.borderColor');
  border-radius: 50%;
  background: v-bind('props.widgetData?.css.backgroundColor');
}
</style>
