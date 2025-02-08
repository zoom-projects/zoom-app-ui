<script setup lang="ts">
import * as resumeTemplateApi from '@/api/modules/resume/template'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/components/Loading/fullScreen'
import { useLegoJsonStoreHook, useRefreshStoreHook } from '../../store/lego'
import { exportLego } from '../../utils/pdf'
import PreviewHtml from './components/PreviewHtml.vue'

const { setUuid } = useRefreshStoreHook()
const { changeHJSchemaJsonData } = useLegoJsonStoreHook()
const { refreshUuid } = storeToRefs(useRefreshStoreHook())
// url参数
// 获取url参数
const route = useRoute()
const { id, pType } = route.query // 模板id和模板名称

// 初始化模板数据
async function getLegoTemplateData() {
  if (id) {
    // const params = {
    //   id,
    // }
    const { success, data, msg } = await resumeTemplateApi.queryById(id as string)
    if (success) {
      changeHJSchemaJsonData(JSON.parse(data.legoJson))
      setTimeout(() => {
        generateReport()
      }, 1000)
    }
    else {
      ElMessage.error(msg)
    }
    setUuid()
  }
}
getLegoTemplateData()

onMounted(() => {

})

// 生成pdf方法
function generateReport() {
  const el = document.getElementById('lego-preview-designer')
  // 全局Loading
  if (pType === 'pdf' || pType === 'img') {
    // showFullScreenLoading()

    exportLego(el as HTMLElement, pType).then(() => {
      ElMessage.success('导出成功')
    }).catch(() => {
      ElMessage.error('导出失败')
    }).finally(() => {
      // tryHideFullScreenLoading()
    })
  }
}
</script>

<template>
  <div :key="refreshUuid" class="lego-preview-pdf-box">
    <PreviewHtml />
  </div>
</template>
