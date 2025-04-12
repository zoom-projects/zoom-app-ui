import type { FormRules } from 'element-plus'
import type { ActionBarProps, FormChangeCallBackParams, PageInfo, PlusColumn, PlusDialogFormInstance, PlusFormGroupRow, PlusPageInstance } from 'plus-pro-components'
import type { NotifyType } from './const'
import * as domainNotifyApi from '@/api/modules/domain/message/notify'
import { getCurrentUserInfoDesensitizedApi } from '@/api/modules/login'
import { useDictStore } from '@/store'
import { clone } from '@/utils'
import { Delete, Edit } from '@element-plus/icons-vue'
import { dictKeys, domainNotifyEventTypeDictKey, domainNotifyTypeDictKey, systemStatusDictKey } from './const'

export function useMessageNotifyHook() {
  const {
    loadDict,
    toOptions,
  } = useDictStore()
  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const currentUserEmail = ref('')
  const columns: PlusColumn[] = [
    {
      label: '事件类型',
      prop: 'event',
      valueType: 'select',
      options: computed(() => toOptions(domainNotifyEventTypeDictKey)),
    },
    {
      label: '通知类型',
      prop: 'notifyType',
      valueType: 'select',
      options: computed(() => toOptions(domainNotifyTypeDictKey)),

    },
    {
      label: '过期天数',
      prop: 'expireDays',
      valueType: 'input-number',
      hideInSearch: true,
    },
    {
      label: '状态',
      prop: 'isEnabled',
      valueType: 'switch',
      options: computed(() => toOptions(systemStatusDictKey)),
      editable: true,
    },
    {
      label: '备注',
      prop: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
    },
  ]
  const actions: ActionBarProps = {
    type: 'icon',
    buttons: [
      {
        text: '编辑',
        icon: Edit,
        tooltipProps: {
          content: '编辑',
        },
        onClick: ({ row }: any) => {
          openDialog(row)
        },
      },
      {
        text: '删除',
        icon: Delete,
        tooltipProps: {
          content: '删除',
        },
        confirm: {
          message: '确定删除吗？',
        },
        onConfirm: async ({ row }: any) => {
          _remove(row.id)
        },
      },
    ],
    confirmType: 'popconfirm',
  }
  const formLoading = ref(false)
  const formModel = ref<any>({})
  const dialogVisible = ref(false)
  const plusDialogFormRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const defaultRules: FormRules = {
    event: [
      { required: true, message: '请选择事件类型' },
    ],
    notifyType: [
      { required: true, message: '请选择通知类型' },
    ],
    expireDays: [
      { required: true, message: '请输入过期天数' },
      { type: 'number', message: '请输入数字' },
    ],
  }
  const emailRules = {
    ...defaultRules,
    emailList: [
      { required: true, message: '请输入邮箱列表' },
    ],
  }
  const dingTalkRules = {
    ...defaultRules,
    dingTalkWebhook: [
      { required: true, message: '请输入钉钉Webhook' },
    ],
    dingTalkBody: [
      { required: true, message: '请输入请求体' },
    ],
  }
  const workWechatRules = {
    ...defaultRules,
    workWechatWebhook: [
      { required: true, message: '请输入企业微信Webhook' },
    ],
    workWechatBody: [
      { required: true, message: '请输入请求体' },
    ],
  }
  const feishuRules = {
    ...defaultRules,
    feishuWebhook: [
      { required: true, message: '请输入飞书Webhook' },
    ],
    feishuBody: [
      { required: true, message: '请输入请求体' },
    ],
  }
  const formRules = computed(() => {
    const rules = {
      email: emailRules,
      dingTalk: dingTalkRules,
      workWechat: workWechatRules,
      feishu: feishuRules,
    }
    return rules[formModel.value.notifyType as NotifyType] || defaultRules
  })
  const groupColumns: PlusFormGroupRow[] = [
    {
      title: '',
      columns: [
        {
          label: '事件类型',
          prop: 'event',
          valueType: 'select',
          options: computed(() => toOptions(domainNotifyEventTypeDictKey)),
        },
        {
          label: '通知类型',
          prop: 'notifyType',
          valueType: 'select',
          options: computed(() => toOptions(domainNotifyTypeDictKey)),

        },
        {
          label: '过期天数',
          prop: 'expireDays',
          valueType: 'input-number',
        },
        {
          label: '备注',
          prop: 'remark',
          valueType: 'textarea',
          hideInSearch: true,
        },
      ],
    },
    {
      hideInGroup: computed(() => formModel.value.notifyType !== 'email'),
      title: '邮箱配置',
      columns: [
        {
          label: '邮箱列表',
          prop: 'emailList',
        },
      ],
    },
    {
      title: '钉钉配置',
      hideInGroup: computed(() => formModel.value.notifyType !== 'dingTalk'),
      columns: [
        {
          label: 'Webhook',
          prop: 'dingTalkWebhook',
        },
        {
          label: '密钥',
          prop: 'dingTalkSecret',
        },
        {
          label: '请求体',
          prop: 'dingTalkBody',
        },
      ],
    },
    {
      title: '企业微信配置',
      hideInGroup: computed(() => formModel.value.notifyType !== 'workWechat'),
      columns: [
        {
          label: 'Webhook',
          prop: 'workWechatWebhook',
        },
        {
          label: '请求体',
          prop: 'workWechatBody',
        },
      ],
    },
    {
      title: '飞书配置',
      hideInGroup: computed(() => formModel.value.notifyType !== 'feishu'),
      columns: [
        {
          label: 'Webhook',
          prop: 'feishuWebhook',
        },
        {
          label: '密钥',
          prop: 'feishuSecret',
        },
        {
          label: '请求体',
          prop: 'feishuBody',
        },
      ],
    },
  ]
  async function openDialog(row?: any) {
    if (row) {
      formModel.value = {
        ...row,
        emailList: row.meta.emailList,
        dingTalkWebhook: row.meta.dingTalkWebhook,
        dingTalkSecret: row.meta.dingTalkSecret,
        dingTalkBody: row.meta.dingTalkBody,
        workWechatWebhook: row.meta.workWechatWebhook,
        workWechatBody: row.meta.workWechatBody,
        feishuWebhook: row.meta.feishuWebhook,
        feishuSecret: row.meta.feishuSecret,
        feishuBody: row.meta.feishuBody,
      }
    }
    else {
      formModel.value = {
        event: 'certificateExpired',
        notifyType: 'email',
        expireDays: 15,
        emailList: JSON.stringify([currentUserEmail.value], null, 4),
        dingTalkBody: JSON.stringify({
          at: {
            isAtAll: 'true',
          },
          msg: {
            msgtype: 'text',
            text: {
              content: '域名或证书过期提醒',
            },
          },
        }, null, 4),
        feishuBody: JSON.stringify({
          msg_type: 'text',
          content: {
            text: '<at user_id="all">所有人</at> 域名或证书过期提醒',
          },
        }, null, 4),
        workWechatBody: JSON.stringify(
          {
            msgtype: 'text',
            text: {
              content: `你的域名证书即将到期\n点击查看<a href="${window.location.href}">Domain Admin</a>`,
              mentioned_list: ['@all'],
            },
          },
          null,
          4,
        ),
      }
    }
    dialogVisible.value = true
  }

  async function handleSave() {
    const meta: any = {
      emailList: formModel.value.emailList,
      dingTalkWebhook: formModel.value.dingTalkWebhook,
      dingTalkSecret: formModel.value.dingTalkSecret,
      dingTalkBody: formModel.value.dingTalkBody,
      workWechatWebhook: formModel.value.workWechatWebhook,
      workWechatBody: formModel.value.workWechatBody,
      feishuWebhook: formModel.value.feishuWebhook,
      feishuSecret: formModel.value.feishuSecret,
      feishuBody: formModel.value.feishuBody,
    }
    const body: any = clone(formModel.value, true)
    body.meta = meta;

    // 自调用，删除掉多余的属性
    (function (target: any, keys: string[]) {
      keys.forEach((key) => {
        delete target[key]
      })
    })(body, [
      'emailList',
      'dingTalkWebhook',
      'dingTalkSecret',
      'dingTalkBody',
      'workWechatWebhook',
      'workWechatBody',
      'feishuWebhook',
      'feishuSecret',
      'feishuBody',
    ])

    if (formModel.value.id) {
      _update(formModel.value.id, body)
    }
    else {
      _save(body)
    }
  }

  async function _save(data: any) {
    formLoading.value = true
    const { success } = await domainNotifyApi.save(data).finally(() => formLoading.value = false)
    if (success) {
      plusPageRef.value?.getList()
      dialogVisible.value = false
    }
  }

  async function _update(id: string, data: any) {
    formLoading.value = true
    const { success } = await domainNotifyApi.update(id, data).finally(() => formLoading.value = false)
    if (success) {
      plusPageRef.value?.getList()
      dialogVisible.value = false
    }
  }

  async function _remove(id: string) {
    formLoading.value = true
    const { success } = await domainNotifyApi.remove(id).finally(() => formLoading.value = false)
    if (success) {
      plusPageRef.value?.getList()
    }
  }

  async function handleChange({ row }: FormChangeCallBackParams) {
    _update(row.id, row)
  }

  async function loadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    const { success, data } = await domainNotifyApi.page(params)
    if (success) {
      return {
        data: data.records,
        total: data.total,
      }
    }
    return {
      data: [],
      total: 0,
    }
  }

  async function _loadUserEmail() {
    const { success, data } = await getCurrentUserInfoDesensitizedApi('email')
    if (success) {
      currentUserEmail.value = data
    }
  }

  onMounted(() => {
    // 加载字典
    loadDict(dictKeys)
    // 获取当前用户邮箱
    _loadUserEmail()
  })

  return {

    plusPageRef,
    columns,
    actions,
    groupColumns,
    formLoading,
    formModel,
    dialogVisible,
    plusDialogFormRef,
    formRules,
    loadData,
    openDialog,

    handleSave,
    handleChange,

  }
}
