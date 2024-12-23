<script setup lang="ts">
import type { Editor } from 'codemirror'
import type { PlusFormInstance } from 'plus-pro-components/es/components/form'
import type { PlusColumn } from 'plus-pro-components/es/types/plus'
import Codemirror from 'codemirror-editor-vue3'
// placeholder
import 'codemirror/addon/display/placeholder.js'
// language
import 'codemirror/mode/javascript/javascript.js'
// theme
import 'codemirror/theme/dracula.css'

const emits = defineEmits(['save'])

const cmOptions = {
  mode: 'text/javascript', // Language mode
  theme: 'default', // Theme
}

const btnLoading = ref(false)
const formRef = ref<Nullable<PlusFormInstance>>(null)
const modelValue = defineModel({
  type: Object as PropType<Record<string, any>>,
  required: true,
})
const codeColumns: PlusColumn[] = [
  {
    label: '全局 head 标签',
    prop: 'headScript',
    valueType: 'textarea',
  },
  {
    label: '全局 body 标签',
    prop: 'bodyScript',
    valueType: 'textarea',
  },
  {
    label: '页脚',
    prop: 'footerScript',
    valueType: 'textarea',
  },
]
async function handleSave() {
  const drone = () => {
    btnLoading.value = false
  }
  formRef.value?.formInstance?.validate((isValid) => {
    if (isValid) {
      btnLoading.value = true
      emits('save', drone)
    }
  })
}

function onReady(cm: Editor) {
  cm.focus()
}
</script>

<template>
  <PlusForm ref="formRef" v-model="modelValue" :columns="codeColumns" label-position="top" class="sm:max-w-lg" :has-footer="false">
    <template #plus-field-headScript="{ prop }">
      <Codemirror v-model:value="modelValue[prop]" border :options="cmOptions" :height="150" />
    </template>
    <template #plus-field-bodyScript="{ prop }">
      <Codemirror v-model:value="modelValue[prop]" border :options="cmOptions" :height="150" @ready="onReady" />
    </template>
    <template #plus-field-footerScript="{ prop }">
      <Codemirror v-model:value="modelValue[prop]" border :options="cmOptions" :height="150" />
    </template>
    <template #footer />
  </PlusForm>
  <div class="sticky bottom-0 rounded-t-lg p-4 pt-5 -mx-4 -mb-4">
    <el-button type="primary" :loading="btnLoading" @click="handleSave">
      保存
    </el-button>
  </div>
</template>
