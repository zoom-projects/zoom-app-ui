import type { FormRules } from 'element-plus'
import type { ActionBarButtonsRow, PageInfo, PlusColumn, PlusDrawerFormInstance, PlusPageInstance } from 'plus-pro-components'
import { list as navCategory } from '@/api/modules/nav/category'
import * as websitesApi from '@/api/modules/nav/websites'
import { useDictStore } from '@/store'
import { clone, deepTree } from '@/utils'
import { dictKeys, isDeprecatedDictKey, isHiddenDictKey } from './const'

export function useNavWebsitesHook() {
  const { toOptions, getDict, loadDict } = useDictStore()
  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const categoryList = ref<any>([])
  const columns: PlusColumn[] = [
    {
      label: '网站LOGO',
      prop: 'logo',
      hideInSearch: true,
      valueType: 'img',
    },
    {
      label: '网站名称',
      prop: 'title',
    },
    {
      label: '网站分类',
      prop: 'categoryId',
      valueType: 'cascader',
      fieldProps: {
        props: {
          value: 'id',
          label: 'name',
          emitPath: false,
          checkStrictly: true,
          leaf: '_leaf',
        },
      },
      options: computed(() => categoryList.value),
    },
    {
      label: '网站标签',
      prop: 'tags',
      valueType: 'plus-input-tag',
      editable: true,
    },
    {
      label: '网站描述',
      prop: 'desc',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      label: '网站链接',
      prop: 'url',
      valueType: 'link',
      hideInSearch: true,
    },
    {
      label: '是否隐藏',
      prop: 'isHidden',
      valueType: 'select',
      options: computed(() => toOptions(isHiddenDictKey)),
      colProps: {
        span: 12,
      },
      render: (value) => {
        const item = getDict(isHiddenDictKey, value)
        return h(ElTag, { type: item.color }, () => item.label)
      },
    },
    {
      label: '是否废弃',
      prop: 'isDeprecated',
      valueType: 'select',
      options: computed(() => toOptions(isDeprecatedDictKey)),
      render: (value) => {
        const item = getDict(isDeprecatedDictKey, value)
        return h(ElTag, { type: item.color }, () => item.label)
      },
      colProps: {
        span: 12,
      },
    },
    {
      label: '排序',
      prop: 'sort',
      hideInSearch: true,
      valueType: 'input-number',
      colProps: {
        span: 12,
      },
    },
  ]
  const defaultFormModel = {
    title: '',
    categoryId: [],
    tags: [],
    desc: '',
    url: '',
    isHidden: false,
    isDeprecated: false,
    sort: 0,
  }
  const submitLoading = ref(false)
  const formModel = ref<any>({})
  const plusDrawerFormRef = ref<Nullable<PlusDrawerFormInstance>>(null)
  const drawerFormVisible = ref(false)
  const formRules: FormRules = {
    title: [
      { required: true, message: '请输入网站名称', trigger: 'blur' },
    ],
    categoryId: [
      { required: true, message: '请选择网站分类', trigger: 'blur' },
    ],
    url: [
      { required: true, message: '请输入网站链接', trigger: 'blur' },
      { type: 'url', message: '请输入正确的网站链接', trigger: 'blur' },
    ],
  }

  const actionButtins: ActionBarButtonsRow[] = [
    {
      text: '编辑',
      props: {
        type: 'primary',
        underline: false,
      },
      onClick: ({ row }) => {
        formModel.value = clone(row, true)
        drawerFormVisible.value = true
      },
    },
    {
      text: '删除',
      props: {
        type: 'danger',
        underline: false,
      },
      confirm: {
        title: '提示',
        message: '确定删除吗',
      },
      onConfirm: async ({ row }) => {
        const { success } = await websitesApi.remove(row.id)
        if (success) {
          ElMessage.success('删除成功')
          plusPageRef.value?.getList()
        }
      },
    },
  ]

  async function loadData(query: PageInfo & any) {
    const params = clone(query, true)
    Reflect.set(params, 'current', Reflect.get(query, 'page'))
    Reflect.deleteProperty(params, 'page')
    Reflect.set(params, 'size', Reflect.get(query, 'pageSize'))
    Reflect.deleteProperty(params, 'pageSize')
    params.sorts = 'sort asc'

    const { success, data } = await websitesApi.page(params)

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
  async function loadCategory() {
    const { success, data } = await navCategory({})
    if (success) {
      categoryList.value = deepTree(data)
    }
  }

  async function getWebsiteLogo() {
    if (!formModel.value.url) {
      ElMessage.error('请输入网站链接')
      return
    }
    const { success, data } = await websitesApi.findWebsiteFavicon(formModel.value.url)
    if (success) {
      formModel.value.logo = data ?? ''
    }
  }

  async function handleAdd() {
    drawerFormVisible.value = true
    formModel.value = defaultFormModel
  }

  function handleCancel() {
    drawerFormVisible.value = false
    formModel.value = defaultFormModel
    nextTick(() => {
      plusDrawerFormRef.value?.formInstance.clearValidate()
    })
  }

  async function handleConfirm() {
    submitLoading.value = true
    const promise = formModel.value.id ? _update() : _save()
    promise.then(({ success }) => {
      if (success) {
        ElMessage.success('保存成功')
        plusPageRef.value?.getList()
        drawerFormVisible.value = false
      }
    }).finally(() => {
      submitLoading.value = false
    })
  }

  function _save() {
    return websitesApi.save(formModel.value)
  }

  function _update() {
    return websitesApi.update(formModel.value.id!, formModel.value)
  }

  onMounted(() => {
    loadCategory()
    loadDict(dictKeys)
  })
  return {
    plusPageRef,
    columns,
    submitLoading,
    formModel,
    formRules,
    plusDrawerFormRef,
    drawerFormVisible,
    actionButtins,

    loadData,
    handleAdd,
    getWebsiteLogo,
    handleCancel,
    handleConfirm,
  }
}
