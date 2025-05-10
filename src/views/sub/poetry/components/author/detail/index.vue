<script setup lang="ts">
import DynastyDetail from '../../dynasty/detail/index.vue'
import { useAuthorDetailHook } from './utils/hook'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  model: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['update:visible', 'update:model', 'close', 'success'])

const {
  dialogVisible,
  formModel,
  columns,
  formRules,
  dialogLoading,
  handleSubmit,

  dynastyVisible,
  dynastyModel,
  openDynastyDialog,
  handleDynastySuccess,
} = useAuthorDetailHook(props, emits)
</script>

<template>
  <div>
    <PlusDialogForm
      v-model:visible="dialogVisible"
      v-model="formModel"
      :form="{
        columns,
        rules: formRules,
      }"
      :dialog="{
        title: formModel.id ? '编辑诗人' : '添加诗人',
        width: '600px',
        destroyOnClose: true,
        confirmLoading: dialogLoading,
      }"
      @confirm="handleSubmit"
    >
      <template #plus-field-dynastyId="{ prop, options, fieldProps }:any">
        <ElSelect
          v-model="formModel[prop]"
          :placeholder="fieldProps.placeholder"
          :clearable="fieldProps.clearable ?? true"
          :multiple="fieldProps.multiple ?? false"
          :filterable="fieldProps.filterable ?? true"
        >
          <ElOption
            v-for="(option, index) in options"
            :key="index"
            :label="option.label"
            :value="option.value"
          />
          <template #footer>
            <ElButton
              type="primary"
              text
              @click="openDynastyDialog"
            >
              <template #icon>
                <ReIcon icon="i-ep:plus" class="el-icon" />
              </template>
              新增朝代
            </ElButton>
          </template>
        </ElSelect>
      </template>
    </PlusDialogForm>
    <DynastyDetail
      v-model:visible="dynastyVisible"
      v-model:model="dynastyModel"
      @success="handleDynastySuccess"
    />
  </div>
</template>
