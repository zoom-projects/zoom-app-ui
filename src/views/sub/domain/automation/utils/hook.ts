import type { PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'

export function useDomainAutomationHook() {
  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const columns: PlusColumn[] = [
    {
      label: '域名',
      prop: 'domain',
    },
    {
      label: '证书厂商',
      prop: 'ca',
    },
    {
      label: 'ACME账号',
      prop: 'acmeAccount',
    },
    {
      label: '加密算法',
      prop: 'certAlgorithm',
    },
    {
      label: '部署方式',
      prop: 'deployId',
    },
    {
      label: '上一次执行时间',
      prop: 'lastExecTime',
      hideInForm: true,
    },
  ]
  const plusDialogFormRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const dialogVisible = ref(false)

  const formModel = ref<any>({})

  async function handleOpenDialog(row?: any) {
    if (row) {
      formModel.value = { ...row }
    }
    else {
      formModel.value = {}
    }
    dialogVisible.value = true
  }

  return {

    plusPageRef,
    plusDialogFormRef,
    columns,

    dialogVisible,
    formModel,
    handleOpenDialog,
  }
}
