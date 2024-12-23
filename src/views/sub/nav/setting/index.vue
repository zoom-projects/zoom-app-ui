<script setup lang="ts">
import Basic from './component/Basic.vue'
import Code from './component/Code.vue'
import Seo from './component/Seo.vue'
import { useWebsiteSettingHook } from './utils/hook'

const pans = [
  {
    key: 'basic',
    label: '基本设置',
    component: Basic,
  },
  {
    key: 'seo',
    label: 'SEO设置',
    component: Seo,
  },
  {
    key: 'code',
    label: '代码注入',
    component: Code,
  },
]
const modelValue = ref('basic')

const { formModel, handleSave } = useWebsiteSettingHook()
</script>

<template>
  <ElContainer class="h-full">
    <ElTabs v-model="modelValue" class="header-tab h-full w-full" type="border-card">
      <ElTabPane v-for="pane in pans" :key="pane.key" :label="pane.label" :name="pane.key">
        <div class="p-4">
          <component :is="pane.component" v-if="modelValue === pane.key" v-model="formModel" @save="handleSave" />
        </div>
      </ElTabPane>
    </ElTabs>
  </ElContainer>
</template>

<style lang="scss" scoped>
.header-tab {
  flex: auto;
  height: 100%;
  display: flex;
}
.header-tab:deep(.el-tabs__content) {
  flex-grow: 1;
  overflow-y: scroll;
  position: relative;
}
</style>
