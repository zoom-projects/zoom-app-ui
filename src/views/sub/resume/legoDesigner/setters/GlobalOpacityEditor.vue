<script setup lang="ts">
import { useLegoJsonStoreHook } from '../store/lego'

const { HJSchemaJsonStore } = useLegoJsonStoreHook()
</script>

<template>
  <div class="global-opacity-editor-box">
    <ElFormItem label="背景透明度:">
      <ElInputNumber v-model="HJSchemaJsonStore.css.opacity" :min="0" :max="1" :step="0.1" />
      <span class="unit">0~1</span>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .global-opacity-editor-box {
  .unit {
    margin-left: 10px;
    color: #929292;
    letter-spacing: 2px;
  }
}
</style>
