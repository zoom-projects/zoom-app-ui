import * as navWebsiteSettingApi from '@/api/modules/nav/setting'

export function useWebsiteSettingHook() {
  const formModel = ref<any>({})

  async function onLoad() {
    const { success, data } = await navWebsiteSettingApi.getInfo()
    if (success) {
      formModel.value = data
    }
  }

  async function handleSave(drone: () => void) {
    const { success } = await navWebsiteSettingApi.update(formModel.value.id!, formModel.value)
      .finally(() => {
        drone()
      })
    if (success) {
      ElMessage.success('保存成功')
    }
  }
  onMounted(() => {
    onLoad()
  })
  return {
    formModel,
    handleSave,
  }
}
