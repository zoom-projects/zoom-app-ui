<script setup lang="ts">
import * as resumeTemplateApi from '@/api/modules/resume/template'
import router from '@/router'
import dayjs from 'dayjs'
import PreviewImage from '../render/PreviewImage/index.vue'
import RenderPage from '../render/RenderPage.vue'
import { useLegoJsonStoreHook, useLegoSelectWidgetStoreHook, useRefreshStoreHook } from '../store/lego'
import { getImgBase64URL } from '../utils/html2img'
import { exportLegoPdf, exportLegoPNG } from '../utils/pdf'
import DownloadDialog from './DownloadDialog/index.vue'
import LogoCom from './LogoCom.vue'

const props = defineProps<{
  pagesRefs: any
  postWorkInfo: any
  templateInfo: any
}>()

const { HJSchemaJsonStore, draftTips } = storeToRefs(useLegoJsonStoreHook())
const { resetHJSchemaJsonData } = useLegoJsonStoreHook()
const { setUuid } = useRefreshStoreHook()
const { resetSelectWidget } = useLegoSelectWidgetStoreHook()
const { templateId, category } = useRoute().query

// 当前ID
const _id = ref<string>('')

// 打开导出弹窗
const dialogDownloadVisible = ref<boolean>(false)
function downloadResume() {
  dialogDownloadVisible.value = true
}

// 关闭弹窗
function closeDownloadDialog() {
  dialogDownloadVisible.value = false
}
// 点击下载
async function downloadResumeFile(type: string) {
  // 先保存草稿
  await saveDraft()
  generateReport(type) // 导出
}

// 生成pdf方法
const dialogVisible = ref<boolean>(false)
const percentage = ref<number>(10)
let timer: any = null
async function generateReport(type: string) {
  dialogVisible.value = true
  timer = setInterval(() => {
    percentage.value += 5
    if (percentage.value > 95) {
      percentage.value = 98
      clearInterval(timer)
    }
  }, 500)
  // if (type === 'pdf') {
  //   await exportLegoPdf(_id.value)
  // }
  // else {
  //   await exportLegoPNG(_id.value)
  // }
  router.push({
    path: '/resume/printPdfPreview',
    query: {
      id: _id.value,
      pType: type,
    },
  })

  clearInterval(timer)
  percentage.value = 100
}

// 关闭进度弹窗
function cancleProgress() {}

// 预览
const dialogPreviewVisible = ref<boolean>(false)
function previewResume() {
  dialogPreviewVisible.value = true
}

// 关闭预览弹窗
function closePreview() {
  dialogPreviewVisible.value = false
}

// 发布作品
const dialogPostWorkVisible = ref<boolean>(false)
function publishTemplate() {
  dialogPostWorkVisible.value = true
}

// 取消发布弹窗
function canclePostWork() {
  dialogPostWorkVisible.value = false
}

// 发布或更新作品成功
async function handlePostWorkSuccess() {
}

// 保存草稿
const imgUrl = ref<string>('')
const isCanSave = ref<boolean>(true)
const saveLoading = ref<boolean>(false)
async function saveDraft() {
  if (isCanSave.value) {
    saveLoading.value = true
    isCanSave.value = false
    draftTips.value = '保存中......'
    imgUrl.value = await getImgBase64URL(props.pagesRefs[0])
    const params = {
      cover: imgUrl.value,
      category: category as string,
      legoJson: HJSchemaJsonStore.value,
    }
    const { success, data } = await resumeTemplateApi.saveDraft(params)
    if (success) {
      const time = dayjs().format('YYYY.MM.DD HH:mm:ss')
      draftTips.value = `已保存草稿  ${time}`
      _id.value = data.id
      ElMessage.success('保存成功')
    }
    isCanSave.value = true
    saveLoading.value = false
  }
}

// 重置
function reset() {
  ElMessageBox.confirm('此操作会重置画布至初始状态，是否继续?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 重置JSON
      const id = HJSchemaJsonStore.value.id
      resetHJSchemaJsonData(id)
      // 重置选中状态
      resetSelectWidget()
      setUuid()
    })
    .catch(() => {})
}

// 返回上一页
function goBack() {
  router.back()
}

// 离开页面之前
onBeforeUnmount(async () => {
  draftTips.value = ''
  // 重置JSON
  resetHJSchemaJsonData()
  // 重置选中状态
  resetSelectWidget()
  setUuid()
})

// 监听路由离开
onBeforeRouteLeave((to, from, next) => {
  if (to.path === '/postWorkSuccess' || to.path === '/resume/printPdfPreview') {
    next()
    return true
  }
  // 编辑状态离开时
  ElMessageBox.confirm('离开前请确保您编辑的内容已保存草稿！', '警告', {
    confirmButtonText: '保存草稿并离开',
    cancelButtonText: '直接离开',
    showCancelButton: true,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    distinguishCancelAndClose: true,
    type: 'warning',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        // 保存草稿并离开
        await saveDraft()
        instance.confirmButtonLoading = false
        done()
      }
      else if (action === 'close') {
        done()
      }
      else {
        done()
        next()
      }
    },
  })
    .then(async () => {
      next()
    })
    .catch(() => {})
})
</script>

<template>
  <div class="lego-nav-box">
    <div class="nav-left">
      <LogoCom icon-color="#74a274" font-color="#74a274" />
    </div>
    <div class="nav-right">
      <ElTooltip effect="dark" content="下载到本地" placement="bottom">
        <div class="icon-box icon-download" @click="downloadResume">
          <ReIcon icon="iconify-ep:download" color="#fff" size="17px" />
          <span class="icon-tips">导出</span>
        </div>
      </ElTooltip>
      <ElTooltip effect="dark" content="预览简历" placement="bottom">
        <div class="icon-box" @click="previewResume">
          <ReIcon icon="iconify-ep:view" color="#555" size="17px" />
          <span class="icon-tips">预览</span>
        </div>
      </ElTooltip>
      <ElTooltip effect="dark" content="保存草稿" placement="bottom">
        <div v-loading="saveLoading" class="icon-box" @click="saveDraft">
          <ReIcon icon="iconify-ri:save-3-line" color="#555" size="17px" />
          <span class="icon-tips">保存</span>
        </div>
      </ElTooltip>
      <ElTooltip effect="dark" content="重置所有设置" placement="bottom">
        <div class="icon-box" @click="reset">
          <ReIcon icon="iconify-ep:refresh" color="#555" size="17px" />
          <span class="icon-tips">重置</span>
        </div>
      </ElTooltip>
      <ElTooltip effect="dark" content="返回上一页" placement="bottom">
        <div class="icon-box" @click="goBack">
          <ReIcon icon="iconify-ri:fullscreen-exit-fill" color="#555" size="17px" />
          <span class="icon-tips">退出</span>
        </div>
      </ElTooltip>
      <ElTooltip effect="dark" content="发布为模板供他人使用" placement="bottom">
        <div class="icon-box icon-download">
          <ReIcon icon="iconify-ri:send-plane-line" color="#555" size="17px" />
          <span class="icon-tips">发布</span>
        </div>
      </ElTooltip>
    </div>

    <!-- 下载弹窗 -->
    <DownloadDialog
      :dialog-download-visible="dialogDownloadVisible"
      @close-download-dialog="closeDownloadDialog"
      @download-file="downloadResumeFile"
    />
    <!-- 预览 -->
    <PreviewImage v-show="dialogPreviewVisible" @close="closePreview">
      <RenderPage />
    </PreviewImage>
  </div>
</template>

<style lang="scss" scoped>
.lego-nav-box {
  background-color: #fff;
  height: 60px;
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  .nav-left {
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
    user-select: none;
    padding: 0 0 0 40px;
  }
  .nav-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30px;
    .icon-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #555;
      cursor: pointer;
      padding: 0 15px;
      height: 100%;
      transition: all 0.3s;
      &:hover {
        background-color: rgba($color: #74a274, $alpha: 0.1);
        color: #74a274;
      }
      .icon-tips {
        font-size: 12px;
        margin-top: 8px;
      }
    }
    .icon-download {
      background-color: rgba($color: #74a274, $alpha: 1);
      color: #fff;
      &:hover {
        background-color: rgba($color: #74a274, $alpha: 0.9);
        color: #fff;
      }
    }
  }
}
</style>
