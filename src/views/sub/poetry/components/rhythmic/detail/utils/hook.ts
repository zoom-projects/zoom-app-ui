import type { FormRules } from 'element-plus'
import type { PlusColumn } from 'plus-pro-components'
import * as rhythmicApi from '@/api/modules/poetry/rhythmic'

export function useRhythmicDetailHook(props: {
  readonly visible: boolean
  readonly model: Record<string, any>
}, emits: (event: 'update:visible' | 'update:model' | 'close' | 'success', ...args: any[]) => void) {
  const dialogVisible = ref(props.visible)
  const formModel = ref<any>(props.model)
  const dialogLoading = ref(false)
  const columns: PlusColumn[] = [
    {
      label: '韵部名称',
      prop: 'name',
    },
    {
      label: '韵部介绍',
      prop: 'note',
      valueType: 'textarea',
    },
  ]

  const formRules: FormRules = {
    name: [
      { required: true, message: '请输入韵部名称', trigger: 'blur' },
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
    const { success, data } = await rhythmicApi.save(formModel.value).finally(() => dialogLoading.value = false)
    if (success) {
      dialogVisible.value = false
      emits('success', data)
    }
  }
  async function _update() {
    dialogLoading.value = true
    const { success, data } = await rhythmicApi.update(formModel.value.id, formModel.value).finally(() => dialogLoading.value = false)
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
    () => props.model,
    (val) => {
      formModel.value = val
    },
  )

  return {
    dialogVisible,
    formModel,
    columns,
    formRules,
    dialogLoading,
    handleConfirm,
  }
}
