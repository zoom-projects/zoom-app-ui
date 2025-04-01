<script setup lang="ts">
import { drawerEmits, drawerProps } from 'element-plus'

const props = defineProps({
  ...drawerProps,
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emits=defineEmits({
  ...drawerEmits
});
const modelValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  modelValue.value = val
})

watch(modelValue, (val) => {
  emits('update:modelValue', val)
})

onMounted(() => {
})
</script>

<template>
  <ElDrawer
  v-bind="props"
  v-on="emits"
  v-model:model-value="modelValue"
  />
</template>
