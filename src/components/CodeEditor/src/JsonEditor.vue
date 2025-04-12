<script setup lang="ts">
import type { Editor, EditorConfiguration } from 'codemirror'
import Codemirror from 'codemirror-editor-vue3'
import jsonlint from 'jsonlint-mod'
import 'codemirror/theme/dracula.css'
// language json or js
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint.js'
import 'codemirror/addon/lint/json-lint'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '300px',
  },
  width: {
    type: String,
    default: '100%',
  },
})

const emit = defineEmits(['update:value'])

//
window.jsonlint = jsonlint

const modelValue = ref(props.value)
const cmOptions: EditorConfiguration = {
  mode: 'application/json',
  theme: 'dracula',
  lineNumbers: true,
  lineWiseCopyCut: true,
  gutters: ['CodeMirror-lint-markers'],
  lint: true,
}

const cminstance = ref<Editor | null>(null)
function onReady(cm: Editor) {
  cminstance.value = cm
}

watch(modelValue, (newValue) => {
  emit('update:value', newValue)
})
watch(
  () => props.value,
  (newValue) => {
    modelValue.value = newValue
  },
  { immediate: true },
)
</script>

<template>
  <Codemirror
    v-model:value="modelValue"
    :placeholder="placeholder"
    :height="height"
    :width="width"
    :options="cmOptions"
    class="cm-component"
    @ready="onReady"
  />
</template>
