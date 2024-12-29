<script setup lang="ts">
import type { UploadInstance, UploadProps, UploadRawFile, UploadRequestOptions } from 'element-plus'
import type { ImportFileProps } from './types'
import * as taskApi from '@/api/modules/common/task'
import { UploadFilled } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<ImportFileProps>(), {
  visible: false,
  title: '导入文件',
  num: 1,
  fileSize: 5,
  accept: () => ['.xls', '.xlsx'],
  width: '580px',
})
const emits = defineEmits(['update:visible', 'success', 'downloadTemplate'])
const visible = ref(props.visible)
const uploadRef = ref<Nullable<UploadInstance>>(null)
const fileList = ref<UploadRawFile[]>([])
const uploadLoading = ref(false)

watch(() => props.visible, (val) => {
  visible.value = val
})
watch(() => visible.value, (val) => {
  emits('update:visible', val)
})

// 文件上传
async function uploadExcel(param: UploadRequestOptions) {
  const excelFormData = new FormData()
  excelFormData.append('file', param.file)
  excelFormData.append('taskType', props.taskType)
  excelFormData.append('bizApp', props.bizApp)
  const { success, data } = await taskApi.imp(excelFormData)
  if (success) {
    ElNotification({
      title: '温馨提示',
      message: `请求导入成功！，请稍后查看导入结果，您的任务编号为：${data}`,
      type: 'success',
    })
    visible.value = false
    emits('success')
  }
  else {
    ElNotification({
      title: '温馨提示',
      message: `请求导入失败！`,
      type: 'error',
    })
  }
}
/**
 * @description 文件上传之前判断
 * @param file 上传的文件
 */
function beforeExcelUpload(file: UploadRawFile) {
  // 判断文件类型
  const fileType = file.name.split('.').pop()
  const isExcel = props.accept!.includes(`.${fileType}`)
  const fileSize = file.size / 1024 / 1024 < props.fileSize!
  if (!isExcel) {
    ElNotification({
      title: '温馨提示',
      message: `请上传${props.accept!.join(',')}格式文件！`,
      type: 'warning',
    })
  }
  if (!fileSize) {
    setTimeout(() => {
      ElNotification({
        title: '温馨提示',
        message: `上传文件大小不能超过 ${props.fileSize}MB！`,
        type: 'warning',
      })
    }, 0)
  }
  return isExcel && fileSize
}

// 文件数超出提示
function handleExceed() {
  ElNotification({
    title: '温馨提示',
    message: `最多上传${props.num}个文件`,
    type: 'warning',
  })
}

// 上传错误提示
function excelUploadError() {
  uploadLoading.value = false
  ElMessage.error('任务请求失败，请稍后重试')
}

// 上传成功提示
const uploadSuccess: UploadProps['onSuccess'] = (res: any) => {
  ElMessage.success(`任务请求成功，请稍后查看导入结果！`)
  uploadLoading.value = false
  emits('success', res)
}
function downloadTemplate() {
  // taskApi.downloadTemplate(,props.taskType)
  emits('downloadTemplate')
}

function handleUpload() {
  if (fileList.value.length === 0) {
    ElMessage.warning('请先选择文件！')
    return
  }
  uploadLoading.value = true
  uploadRef.value?.submit()
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="`批量添加${props.title}`"
    :destroy-on-close="true"
    :width="props.width"
    draggable
  >
    <el-form class="drawer-multiColumn-form" label-width="100px">
      <el-form-item label="模板下载 :">
        <el-button type="primary" @click="downloadTemplate">
          点击下载
        </el-button>
      </el-form-item>
      <el-form-item label="文件上传 :">
        <el-upload
          ref="uploadRef"
          v-model:file-list="fileList"
          v-loading="uploadLoading"
          action="#"
          class="upload"
          :drag="true"
          :limit="props.num"
          :multiple="true"
          :show-file-list="true"
          :http-request="uploadExcel"
          :before-upload="beforeExcelUpload"
          :on-exceed="handleExceed"
          :on-success="uploadSuccess"
          :on-error="excelUploadError"
          :accept="props.accept!.join(',')"
          :auto-upload="props.autoUpload"
        >
          <slot name="empty">
            <el-icon>
              <UploadFilled />
            </el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </slot>
          <template #tip>
            <slot name="tip">
              <div class="el-upload__tip">
                请上传 {{ props.accept!.join(',') }} 标准格式文件，文件最大为 {{ props.fileSize }}M
              </div>
            </slot>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">
        取 消
      </el-button>
      <el-popconfirm
        title="确定导入数据吗？"
        @confirm="handleUpload"
      >
        <template #reference>
          <el-button v-if="!props.autoUpload" v-loading="uploadLoading" type="primary">
            确 定
          </el-button>
        </template>
      </el-popconfirm>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>
