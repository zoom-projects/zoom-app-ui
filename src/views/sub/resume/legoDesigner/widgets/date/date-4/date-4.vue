<script lang="ts" setup>
import type { IWidget } from '../../../types'
import { legoFormatDate } from '../../../utils/common'

interface IAvatar {
  widgetData: IWidget | null // 模块数据
}
const props = withDefaults(defineProps<IAvatar>(), {
  widgetData: null,
})
</script>

<template>
  <div class="hj-date-1-box">
    <p>{{ legoFormatDate(widgetData?.dataSource.monthRange) }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .hj-date-1-box {
  width: v-bind('`${props.widgetData?.css.width}px`');
  height: v-bind('`${props.widgetData?.css.height}px`');
  border-style: v-bind('props.widgetData?.css.borderStyle');
  border-width: v-bind('`${props.widgetData?.css.borderWidth}px`');
  padding: v-bind('`${props.widgetData?.css.padding.top}px`') v-bind('`${props.widgetData?.css.padding.right}px`')
    v-bind('`${props.widgetData?.css.padding.bottom}px`') v-bind('`${props.widgetData?.css.padding.left}px`');
  border-color: v-bind('props.widgetData?.css.borderColor');
  border-radius: v-bind('`${props.widgetData?.css.borderRadius}px`');
  background: v-bind('props.widgetData?.css.backgroundColor');
  p {
    color: v-bind('props.widgetData?.css.fontColor');
    font-family: v-bind('props.widgetData?.css.fontFamily');
    font-weight: v-bind('props.widgetData?.css.fontWeight');
    font-size: v-bind('`${props.widgetData?.css.fontSize}px`');
    letter-spacing: v-bind('`${props.widgetData?.css.letterSpace}px`');
    line-height: v-bind('props.widgetData?.css.lineHeight');
    text-align: v-bind('props.widgetData?.css.textAlign');
  }
}
</style>
