<script setup lang="ts">
import { useLegoJsonStoreHook } from '../store/lego'

const { HJSchemaJsonStore } = useLegoJsonStoreHook()
</script>

<template>
  <div class="global-width-editor-box">
    <ElFormItem label="宽度:">
      <ElInputNumber v-model="HJSchemaJsonStore.css.width" :min="0" />
      <span class="unit">像素</span>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .global-width-editor-box {
  .unit {
    margin-left: 10px;
    color: #929292;
    letter-spacing: 2px;
  }
}
</style>
