import { group } from '@/api/modules/system/openApi'
import * as roleApi from '@/api/modules/system/role'

export function useOpenApi() {
  const openApiTableRef = ref<any>(null)
  const dataList = ref<any>([])
  const loading = ref(false)
  const roleInfo = ref<any>({})
  const dialogVisible = ref(false)

  async function getRoleOpenApi() {
    const { success, data } = await roleApi.getRoleOpenApi(roleInfo.value.id)
    if (success) {
      openApiTableRef.value?.init(data)
    }
  }

  async function loadOpenApi() {
    loading.value = true
    try {
      const { success, data } = await group()
      if (success) {
        dataList.value = data
      }
    }
    finally {
      loading.value = false
    }
  }

  watch(
    () => roleInfo.value.id,
    (id) => {
      if (id) {
        getRoleOpenApi()
      }
    },
    { immediate: true },
  )

  async function handleCancel() {
    dialogVisible.value = false
  }

  async function handleConfirm() {
    loading.value = true
    try {
      const ids = openApiTableRef.value.getValue()
      const { success } = await roleApi.saveRoleOpenApis(roleInfo.value.id, ids)
      if (success) {
        ElMessage.success('保存成功')
        dialogVisible.value = false
      }
    }
    finally {
      loading.value = false
    }
  }

  onBeforeMount(() => {
    loadOpenApi()
  })

  return {
    openApiTableRef,
    roleInfo,
    dataList,
    loading,
    dialogVisible,
    getRoleOpenApi,
    handleCancel,
    handleConfirm,
  }
}
