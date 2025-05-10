import type { FormRules } from 'element-plus'
import type { PlusColumn } from 'plus-pro-components'
import * as authorApi from '@/api/modules/poetry/author'
import { list as dynastyListApi } from '@/api/modules/poetry/dynasty'

export function useAuthorDetailHook(props: {
  readonly visible: boolean
  readonly model: Record<string, any>
}, emits: (event: 'update:visible' | 'update:model' | 'close' | 'success', ...args: any[]) => void) {
  const dialogVisible = ref(props.visible)
  const formModel = ref<any>(props.model)

  const dynastyList = ref<any>([])
  const dialogLoading = ref(false)
  const columns: PlusColumn[] = [
    {
      label: '诗人',
      prop: 'name',
    },
    {
      label: '朝代',
      prop: 'dynastyId',
      valueType: 'select',
      options: computed(() => {
        return dynastyList.value.map((item: any) => {
          return {
            label: item.name,
            value: item.id,
          }
        })
      }),
    },
    {
      label: '诗人介绍',
      prop: 'introduction',
      valueType: 'textarea',
    },
    {
      label: '简介',
      prop: 'shortIntroduction',
      valueType: 'textarea',
    },
  ]
  const formRules: FormRules = {
    name: [
      { required: true, message: '请输入诗人', trigger: 'blur' },
    ],
    dynastyId: [
      { required: true, message: '请选择朝代', trigger: 'blur' },
    ],
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
    const { id } = formModel.value
    if (id) {
      _update()
    }
    else {
      _save()
    }
  }

  async function _save() {
    dialogLoading.value = true
    const { success, data } = await authorApi.save(formModel.value).finally(() => dialogLoading.value = false)
    if (success) {
      dialogVisible.value = false
      emits('success', data)
    }
  }

  async function _update() {
    dialogLoading.value = true
    const { success, data } = await authorApi.update(formModel.value.id, formModel.value).finally(() => dialogLoading.value = false)
    if (success) {
      dialogVisible.value = false
      emits('success', data)
    }
  }

  const dynastyVisible = ref(false)
  const dynastyModel = ref({})

  function openDynastyDialog() {
    dynastyVisible.value = true
    dynastyModel.value = {}
  }

  function handleDynastySuccess(model: Record<string, any>) {
    dynastyVisible.value = false
    formModel.value.dynastyId = model.id
    getDynastyList()
  }

  async function getDynastyList() {
    const { success, data } = await dynastyListApi()
    if (success) {
      dynastyList.value = data
    }
  }

  onMounted(() => {
    getDynastyList()
  })

  return {
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

  }
}
