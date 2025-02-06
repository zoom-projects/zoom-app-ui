<script setup lang="ts">
import ColorPickerCustom from '../components/colorPicker/ColorPickerCustom.vue'
import { useLegoJsonStoreHook } from '../store/lego'

const { HJSchemaJsonStore } = useLegoJsonStoreHook()

// 主题色改变
function handleChange(item: any) {
  console.log(item)
  for (let i = 0; i < HJSchemaJsonStore.componentsTree.length; i++) {
    for (let j = 0; j < HJSchemaJsonStore.componentsTree[i].children.length; j++) {
      if (HJSchemaJsonStore.componentsTree[i].children[j].css.backgroundColor) {
        HJSchemaJsonStore.componentsTree[i].children[j].css.backgroundColor = item
      }
    }
  }
}
</script>

<template>
  <div class="background-color-editor-box">
    <ElFormItem label="主题设置:">
      <ColorPickerCustom
        v-model="HJSchemaJsonStore.css.themeColor"
        @change="handleChange"
      />
    </ElFormItem>
  </div>
</template>
