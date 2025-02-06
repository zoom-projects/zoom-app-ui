<script setup lang="ts">
import { useFontFamilyList } from '../hooks/useFontFamlyList'
import { useLegoJsonStoreHook } from '../store/lego'

const { HJSchemaJsonStore } = useLegoJsonStoreHook()

// 字体列表
const fontFamilyList = useFontFamilyList()

// 字体变化
function selectFontFamilyChange(val: string) {
  HJSchemaJsonStore.componentsTree.forEach((pageItem, pageIndex) => {
    for (let i = 0; i < pageItem.children.length; i++) {
      if (pageItem.children[i].css.fontFamily) {
        HJSchemaJsonStore.componentsTree[pageIndex].children[i].css.fontFamily = val
      }
    }
  })
}
</script>

<template>
  <div class="global-font-family-editor-box">
    <ElFormItem label="字体选择:">
      <ElSelect
        v-model="HJSchemaJsonStore.css.fontFamily"
        :teleported="false"
        placeholder="请选择字体"
        @change="selectFontFamilyChange"
      >
        <ElOption
          v-for="(item, index) in fontFamilyList"
          :key="index"
          :label="item"
          :value="item"
          :style="{ fontFamily: item }"
        />
      </ElSelect>
    </ElFormItem>
  </div>
</template>
