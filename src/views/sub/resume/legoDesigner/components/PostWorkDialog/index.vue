<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import CategoryListData from '../../../templateDesign/data/category.json'
import { useLegoJsonStoreHook } from '../../store/lego'

const props = withDefaults(defineProps<TDialog>(), {
  dialogPostWorkVisible: false,
  postWorkInfo: null,
})

const emit = defineEmits(['cancle', 'updateSuccess'])

const { HJSchemaJsonStore } = storeToRefs(useLegoJsonStoreHook())

interface TDialog {
  dialogPostWorkVisible: boolean
  postWorkInfo: any
}
interface ITemplate {
  title: string
  category: string
  cover: string
  how_much: number
}
// 表单填写数据
const ruleForm = reactive<ITemplate>({
  title: '',
  category: '',
  cover: '',
  how_much: 5,
})
const rules = reactive<FormRules>({})

watch(
  () => props.postWorkInfo,
  (newVal) => {
    if (newVal) {
      ruleForm.title = newVal.title
      ruleForm.category = newVal.category
      ruleForm.cover = newVal.cover
      ruleForm.how_much = newVal.how_much
    }
  },
)
// 取消
function cancle() {
  emit('cancle')
}

// 查询分类列表
const categoryList = ref<any>([])
async function getCategoryList() {
  categoryList.value = CategoryListData.map((item: { _id: any, name: any }) => {
    return {
      label: item.name,
      value: item._id,
    }
  })
}
getCategoryList()

// 提交
const sureLoading = ref<boolean>(false)
const ruleFormRef = ref<any>(null)
async function submit(formEl: FormInstance | undefined) {}
</script>

<template>
  <ElDialog
    :model-value="dialogPostWorkVisible"
    title="发布为模板"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="default"
      label-position="left"
    >
      <el-form-item label="模板名称:">
        <el-input v-model="ruleForm.title" placeholder="请输入模板标题" />
      </el-form-item>
      <el-form-item label="模板分类：" prop="category">
        <el-select v-model="ruleForm.category" placeholder="请选择模板分类">
          <el-option
            v-for="(item, index) in categoryList"
            :key="index"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模板预览图:">
        <UploadImg v-model="ruleForm.cover" />
      </el-form-item>
    </ElForm>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="cancle">取消</ElButton>
        <ElButton type="primary" :loading="sureLoading" @click="submit(ruleFormRef)">{{
          postWorkInfo ? '确认修改' : '提交审核'
        }}</ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
  .dialog-footer button:first-child {
  margin-right: 10px;
}
:deep(.avatar-uploader) {
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    width: 260px;
    height: 365px;
  }

  .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 48px;
    color: #8c939d;
    width: 260px;
    height: 365px;
    text-align: center;
  }
  .avatar {
    max-width: 100%;
  }
}
.how-much {
  margin: 0 5px 0 10px;
}
</style>
