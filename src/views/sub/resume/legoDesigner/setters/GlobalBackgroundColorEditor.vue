<script setup lang="ts">
import ColorPickerCustom from '../components/colorPicker/ColorPickerCustom.vue'
import { useLegoJsonStoreHook } from '../store/lego'

const { HJSchemaJsonStore } = useLegoJsonStoreHook()
</script>

<template>
  <div class="background-color-editor-box">
    <ElFormItem label="背景颜色:">
      <ColorPickerCustom
        v-model="HJSchemaJsonStore.css.background"
      />
    </ElFormItem>
  </div>
</template>
