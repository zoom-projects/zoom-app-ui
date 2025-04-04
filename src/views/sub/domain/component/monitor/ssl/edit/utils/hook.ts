import type { FormRules } from 'element-plus'
import type { PlusColumn, PlusDialogFormInstance } from 'plus-pro-components'
import * as domainMonitorSSLApi from '@/api/modules/domain/monitor/ssl'
import { useDictStore } from '@/store'
import { certSSLTypeDictKey, dictKeys } from './const'

export function useDomainCertMonitorEditHook(props: any, emits: any) {
  const { toOptions, loadDict } = useDictStore()
  const plusDialogFormRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const formModel = ref<any>(props.formModel)
  const dialogVisible = ref(false)
  const dialogFormColumns: PlusColumn[] = [
    {
      label: '域名',
      prop: 'domain',
      colProps: {
        span: 16,
      },
    },
    {
      label: '端口',
      prop: 'port',
      colProps: {
        span: 8,
      },
    },
    {
      label: '证书时间',
      prop: 'certTime',
      valueType: 'plus-date-picker',
      fieldProps: {
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        // @ts-expect-error: formModel is not typed
        disabled: computed(() => formModel.value.isMonitor),
      },
    },
    {
      label: '自动更新',
      prop: 'isMonitor',
      valueType: 'switch',
      colProps: {
        span: 12,
      },
    },
    {
      label: '到期提醒',
      prop: 'isRemind',
      valueType: 'switch',
      colProps: {
        span: 12,
      },
    },
    {
      label: '加密方式',
      prop: 'sslType',
      valueType: 'select',
      options: computed(() => toOptions(certSSLTypeDictKey)),
    },
    {
      label: '备注',
      prop: 'remark',
      valueType: 'textarea',
    },
  ]
  const dialogFormRules: FormRules = {
    domain: [
      { required: true, message: '请输入域名', trigger: 'blur' },
      {
        pattern: /^([a-z0-9-]+\.)+[a-z0-9-]+$/i,
        message: '域名格式不正确',
        trigger: 'blur',
      },
      {
        validator: (_, value, callback) => {
          domainMonitorSSLApi.isMonitor(value, formModel.value.id).then(({ data }) => {
            if (data) {
              callback(new Error('域名已存在'))
            }
            else {
              callback()
            }
          })
        },
        trigger: 'blur',
      },
      { max: 255, message: '长度在255个字符以内', trigger: 'blur' },
    ],
    port: [
      { required: true, message: '请输入端口', trigger: 'blur' },
      { type: 'number', message: '端口必须为数字', trigger: 'blur' },
    ],
  }
  const dialogLoading = ref(false)

  async function handleSave() {
    if (formModel.value.id) {
      _update()
    }
    else {
      _save()
    }
  }

  async function _update() {
    dialogLoading.value = true
    const body = {
      ...formModel.value,
    }
    const certTime = body.certTime
    if (certTime && certTime.length > 0) {
      body.startTime = certTime[0]
      body.expireTime = certTime[1]
    }
    delete body.certTime
    const { success } = await domainMonitorSSLApi.update(formModel.value.id, body).finally(() => {
      dialogLoading.value = false
    })
    if (success) {
      dialogVisible.value = false
      ElMessage.success('更新成功')
      emits('success')
    }
  }

  async function _save() {
    dialogLoading.value = true
    const body = {
      ...formModel.value,
    }
    const certTime = body.certTime
    if (certTime && certTime.length > 0) {
      body.startTime = certTime[0]
      body.expireTime = certTime[1]
    }
    delete body.certTime
    const { success } = await domainMonitorSSLApi.save(body).finally(() => {
      dialogLoading.value = false
    })
    if (success) {
      dialogVisible.value = false
      ElMessage.success('保存成功')
      emits('success')
    }
  }

  watch(
    () => props.formModel,
    (val) => {
      formModel.value = val
    },
  )

  watch(
    () => props.visible,
    (val) => {
      dialogVisible.value = val
    },
  )

  watch(
    () => dialogVisible.value,
    (val) => {
      emits('update:visible', val)
      if (!val) {
        formModel.value = {}
        plusDialogFormRef.value?.formInstance.resetFields()
      }
    },
  )
  watch(
    () => formModel.value,
    (val) => {
      emits('update:formModel', val)
    },
  )

  onMounted(() => {
    loadDict(dictKeys)
  })

  return {

    plusDialogFormRef,
    formModel,
    dialogVisible,
    dialogFormColumns,
    dialogFormRules,
    dialogLoading,
    handleSave,
  }
}
