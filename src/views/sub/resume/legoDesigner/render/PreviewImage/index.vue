<script setup lang="ts">
import { CloseBold } from '@element-plus/icons-vue'

const emit = defineEmits(['close'])
function close() {
  emit('close')
}
function notHidden(e: Event) {
  e.stopPropagation()
}
</script>

<template>
  <div class="preview-box" @click="close">
    <div @click="notHidden">
      <slot />
    </div>
    <!-- 关闭按钮 -->
    <div class="close">
      <ElIcon color="#fff">
        <CloseBold />
      </ElIcon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .preview-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding: 40px 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  transition: all 0.3s;
  .close {
    position: fixed;
    width: 40px;
    height: 40px;
    background-color: #000;
    right: 50px;
    top: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
