<script lang="ts" setup>
import type { IWidget } from '../../types'
import SvgIcon from '../../components/svgIcon/SvgIcon.vue'

interface IWidgetItem {
  widgetData: IWidget | null // 模块数据
}
withDefaults(defineProps<IWidgetItem>(), {
  widgetData: null,
})
</script>

<template>
  <div class="lego-design-icon-box">
    <SvgIcon :icon-name="widgetData?.props.icon" color="#74a274" size="25px" />
  </div>
</template>

<style lang="scss" scoped>
  .lego-design-icon-box {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
