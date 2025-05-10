import type { FormRules } from 'element-plus'
import type { PlusColumn } from 'plus-pro-components'
import * as dynastyApi from '@/api/modules/poetry/dynasty'

export function useDynastyDetailHook(props: {
  readonly visible: boolean
  readonly model: Record<string, any>
}, emits: (event: 'update:visible' | 'update:model' | 'close' | 'success', ...args: any[]) => void) {
  const dialogVisible = ref(props.visible)
  const formModel = ref<any>(props.model)

  const columns: PlusColumn[] = [
    {
      label: '朝代',
      prop: 'name',
    },
    {
      label: '简称',
      prop: 'shortName',
    },
  ]
  const formRules: FormRules = {
    name: [
      { required: true, message: '请输入朝代名称', trigger: 'blur' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' },
    ],
    shortName: [
      { required: true, message: '请输入简称', trigger: 'blur' },
      { min: 1, max: 5, message: '长度在 1 到 5 个字符之间', trigger: 'blur' },
    ],
  }
  const dialogLoading = ref(false)

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
    { immediate: true },
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
    { immediate: true },
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
    { immediate: true },
  )

  function handleSubmit() {
    if (formModel.value.id) {
      _update()
    }
    else {
      _save()
    }
  }

  async function _save() {
    dialogLoading.value = true
    const { success, data } = await dynastyApi.save(formModel.value).finally(() => dialogLoading.value = false)
    if (success) {
      ElMessage.success('保存成功')
      dialogVisible.value = false
      emits('success', data)
    }
  }

  async function _update() {
    dialogLoading.value = true
    const { success, data } = await dynastyApi.update(formModel.value.id, formModel.value)
      .finally(() => dialogLoading.value = false)
    if (success) {
      ElMessage.success('更新成功')
      dialogVisible.value = false
      emits('success', data)
    }
  }

  return {
    dialogVisible,
    formModel,
    columns,
    formRules,
    dialogLoading,
    handleSubmit,
  }
}
