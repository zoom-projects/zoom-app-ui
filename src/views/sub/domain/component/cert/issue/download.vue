<script setup lang="ts">
import type { DownloadProps } from './utils/types'
import * as domainCertApi from '@/api/modules/domain/cert'

const props = defineProps<DownloadProps>()
const emits = defineEmits(['close'])
const currentModel = toRef(props.formModel)
const canDownload = computed(() => {
  return currentModel?.value?.fileUrl && currentModel?.value?.fileUrl.length > 0
})

const code = computed(() => {
  const serverName = currentModel.value?.domainList?.map(item => item).join(' ')
  const firstDomain = currentModel.value?.domainList?.[0]
  return `server {
    listen 443 ssl;
    server_name ${serverName};

    ssl_certificate_key /var/www/ssl/${firstDomain}.key;
    ssl_certificate /var/www/ssl/${firstDomain}.pem;
  }`
})

async function handleDownload() {
  if (!currentModel.value) {
    ElMessage.error('当前证书不存在')
    return
  }
  const { fileUrl } = currentModel.value
  if (!fileUrl) {
    ElMessage.error('当前证书不存在')
  }
  window.open(fileUrl, '_blank')
}

async function _loadData() {
  if (!currentModel.value) {
    ElMessage.error('当前证书不存在')
    return
  }
  const { data, success } = await domainCertApi.getInfo(currentModel.value.id)
  if (!success) {
    ElMessage.error('获取证书信息失败')
    return
  }
  if (!data) {
    ElMessage.error('获取证书信息失败')
    return
  }
  currentModel.value = data
}

onMounted(() => {
  _loadData()
})
</script>

<template>
  <div class="download">
    <div v-if="canDownload" class="download-box">
      <el-form label-width="120px">
        <el-form-item label="证书下载">
          <el-button
            link
            type="primary"
            @click="handleDownload"
          >
            下载
          </el-button>
        </el-form-item>
        <el-form-item label="Nginx配置">
          <highlightjs :code="code" language="nginxconf" />
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="download-box">
      <el-empty description="暂无证书下载链接" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
