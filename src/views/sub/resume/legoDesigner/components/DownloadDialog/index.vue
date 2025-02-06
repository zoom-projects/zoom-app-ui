<script setup lang="ts">
import SvgIcon from '../svgIcon/SvgIcon.vue'

interface TDialog {
  dialogDownloadVisible: boolean
}
withDefaults(defineProps<TDialog>(), {
  dialogDownloadVisible: false,
})
const emit = defineEmits(['closeDownloadDialog', 'downloadFile'])
// 打开警告弹窗
const downloadType = ref<string>('')

async function downloadDialog(type: string) {
  downloadType.value = type
  emit('downloadFile', downloadType.value)
}
// 取消
function handleClose() {
  emit('closeDownloadDialog')
}
</script>

<template>
  <el-dialog
    class="download-resume-select"
    :model-value="dialogDownloadVisible"
    title="下载简历"
    width="500px"
    append-to-body
    @close="handleClose"
  >
    <div class="content-box">
      <div class="content-down-btn">
        <!-- 下载为图片 -->
        <div class="download-img-box">
          <div
            class="img-box download-com-box"
            @click="downloadDialog('img')"
          >
            <SvgIcon icon-name="icon-tupian" color="#fff" size="26px" />
            <span>下载图片</span>
          </div>
          <p>适合微信、QQ发送</p>
        </div>
        <!-- 下载PDF -->
        <div class="download-pdf-box">
          <div
            class="download-com-box pdf-box"
            @click="downloadDialog('pdf')"
          >
            <SvgIcon icon-name="icon-pdf" color="#fff" size="26px" />
            <span>下载PDF</span>
          </div>
          <p> 适合打印、在线投递等(<span>推荐</span>)</p>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
 .dialog-footer button:first-child {
  margin-right: 10px;
}
.download-resume-select {
  .content-box {
    .content-down-btn {
      display: flex;
      justify-content: center;
      .download-img-box,
      .download-pdf-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        margin: 0 20px;
        .download-com-box {
          width: 100px;
          height: 110px;
          border-radius: 5px;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          span {
            margin-top: 10px;
          }
        }
        p {
          color: #888;
          font-size: 12px;
          margin-top: 10px;
        }
        .img-box {
          background: linear-gradient(90deg, #a986ff 0, #9861ff 100%);
          &:hover {
            background: linear-gradient(90deg, #a986ff 0, #9861ff 50%);
          }
        }
        .pdf-box {
          background: linear-gradient(149deg, #ffa98f 0, #ff6464 100%);
          &:hover {
            background: linear-gradient(149deg, #ffa98f 0, #ff6464 50%);
          }
        }
      }
    }
  }
}
</style>
