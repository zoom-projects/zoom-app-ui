<script lang="ts" setup>
import useSelectWidgetItem from '../../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)
</script>

<template>
  <div class="avatar-editor">
    <ElFormItem label="文件上传：">
      <UploadImg v-model="widgetItem!.dataSource.imgUrl" />
    </ElFormItem>
  </div>
</template>

<style lang="scss">
  .hj-img-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  min-width: 150px;
  max-width: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}

.hj-img-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 150px;
  max-width: 300px;
  text-align: center;
}

.avatar-editor {
  .tips {
    color: #8c939d;
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>
