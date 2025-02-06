<script setup lang="ts">
import { useLegoJsonStoreHook, useRefreshStoreHook } from '../../store/lego'
import PreviewHtml from './components/PreviewHtml.vue'

const { setUuid } = useRefreshStoreHook()
const { changeHJSchemaJsonData } = useLegoJsonStoreHook()
const { refreshUuid } = storeToRefs(useRefreshStoreHook())
</script>

<template>
  <div :key="refreshUuid" class="lego-preview-pdf-box">
    <PreviewHtml />
  </div>
</template>
