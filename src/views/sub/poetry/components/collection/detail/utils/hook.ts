import type { FormRules } from 'element-plus'
import type { PlusColumn } from 'plus-pro-components'
import * as collectionApi from '@/api/modules/poetry/collection'

export function useCollectionDetailHook(props: {
  readonly visible: boolean
  readonly model: Record<string, any>
}, emits: (event: 'update:visible' | 'update:model' | 'close' | 'success', ...args: any[]) => void) {
  const dialogVisible = ref(props.visible)
  const formModel = ref<any>(props.model)
  const dialogLoading = ref(false)
  const columns: PlusColumn[] = [
    {
      label: '诗集名称',
      prop: 'name',
    },
    {
      label: '诗集介绍',
      prop: 'note',
      valueType: 'textarea',
    },
  ]

  const formRules: FormRules = {
    name: [
      { required: true, message: '请输入诗集名称', trigger: 'blur' },
    ],
  }

  async function handleConfirm() {
    if (formModel.value.id) {
      await _update()
    }
    else {
      await _save()
    }
  }

  async function _save() {
    dialogLoading.value = true
    const { success, data } = await collectionApi.save(formModel.value).finally(() => dialogLoading.value = false)
    if (success) {
      dialogVisible.value = false
      emits('success', data)
    }
  }
  async function _update() {
    dialogLoading.value = true
    const { success, data } = await collectionApi.update(formModel.value.id, formModel.value).finally(() => dialogLoading.value = false)
    if (success) {
      dialogVisible.value = false
      emits('success', data)
    }
  }

  watch(
    () => props.visible,
    (val) => {
      dialogVisible.value = val
    },
    { immediate: true },
  )
  watch(
    () => dialogVisible.value,
    (val) => {
      emits('update:visible', val)
    },
  )

  watch(
    () => props.model,
    (val) => {
      formModel.value = val
    },
    { immediate: true },
  )
  watch(
    () => formModel.value,
    (val) => {
      emits('update:model', val)
    },
  )

  return {
    dialogVisible,
    formModel,
    dialogLoading,
    columns,
    formRules,
    handleConfirm,
  }
}
