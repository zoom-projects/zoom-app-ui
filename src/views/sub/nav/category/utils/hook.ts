import type { FormRules, TreeNode } from 'element-plus'
import type { ActionBarButtonsRow, PlusColumn, PlusDialogFormInstance, PlusPageInstance } from 'plus-pro-components'
import * as navCategoryApi from '@/api/modules/nav/category'
import { clone, deepTree } from '@/utils'
import { resolveDirective } from 'vue'

export function useNavCategoryHook() {
  // ---------------------------form-----------------------------------------------------
  const plusDialogFormRef = ref<Nullable<PlusDialogFormInstance>>(null)
  const dialogFormVisible = ref(false)
  const tableData = ref<any[]>([])
  const submitLoading = ref(false)
  const formColumns: PlusColumn[] = [
    {
      label: '上级分类',
      prop: 'parentId',
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
      options: computed(() => {
        // 获取table data
        const menuList = clone(tableData.value, true)
        const nodes = menuList?.filter((item: any) => item.menuType !== 3)
        // build tree
        const tree = deepTree(nodes)
        return tree
      }),

    },
    {
      label: '分类名称',
      prop: 'name',
      colProps: {
        span: 12,
      },
    },
    {
      label: '分类图标',
      prop: 'icon',
      colProps: {
        span: 12,
      },
    },
    {
      label: '是否隐藏',
      prop: 'isHidden',
      valueType: 'switch',
      options: computed(() => [
        { label: '是', value: true },
        { label: '否', value: false },
      ]),
      colProps: {
        span: 12,
      },
    },
    {
      label: '排序',
      prop: 'sort',
      valueType: 'input-number',
      colProps: {
        span: 12,
      },
    },
  ]
  const formRules: FormRules = {
    name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  }
  const defaultModel = {
    parentId: '',
    name: '',
    icon: '',
    isHidden: false,
    sort: 0,
  }
  const formModel = ref<any>({})

  // ---------------------------table-----------------------------------------------------
  const auth = resolveDirective('auth')
  const plusPageRef = ref<Nullable<PlusPageInstance>>(null)
  const currentRow = ref<any>({})
  const tableColumns: PlusColumn[] = [
    {
      label: '分类名称',
      prop: 'name',
    },
    {
      label: '分类图标',
      prop: 'icon',
      hideInSearch: true,
      editable: true,
    },
    {
      label: '是否展示',
      prop: 'isHidden',
      valueType: 'select',
      options: computed(() => [
        { label: '是', value: false },
        { label: '否', value: true },
      ]),
      render: (value) => {
        return h(ElTag, { type: value ? 'danger' : 'success' }, { default: () => value ? '否' : '是' })
      },
    },
    {
      label: '排序',
      prop: 'sort',
      hideInSearch: true,
    },
  ]
  const tableActionButtions: ActionBarButtonsRow[] = [
    {
      text: '新增',
      directives: [
        [auth, 'nav:category:save'],
      ],
      props: {
        type: 'primary',
        underline: 'never',
      },
      onClick: ({ row }) => {
        currentRow.value = row
        handleAddNew(row.id)
      },
    },
    {
      text: '编辑',
      directives: [
        [auth, 'nav:category:update'],
      ],
      props: {
        type: 'primary',
        underline: 'never',
      },
      onClick: ({ row }) => {
        formModel.value = clone(row, true)
        currentRow.value = row
        dialogFormVisible.value = true
      },
    },
    {
      text: '删除',
      code: 'delete',
      directives: [
        [auth, 'nav:category:delete'],
      ],
      props: {
        type: 'primary',
        underline: 'never',
      },
      confirm: {
        title: '删除提示',
        message: '确定删除该数据吗？',
      },
      onConfirm: async ({ row }) => {
        const { success } = await navCategoryApi.remove(row.id)
        if (success) {
          ElMessage.success('删除成功')
          plusPageRef.value?.getList()
        }
      },
    },
  ]
  // 解决子集过多导致展开卡顿
  function onData(list: any) {
    const data = deepTree(list)
    // 递归处理
    function deep(data: any) {
      data.forEach((item: any) => {
        const nodes = plusPageRef.value?.plusTableInstance?.tableInstance?.store?.states?.lazyTreeNodeMap.value || {}
        if (nodes[item.id!]) {
          nodes[item.id!] = item.children!
        }

        if (item.children && item.children.length > 0) {
          item.hasChildren = true
          item._children = item.children
          delete item.children
          deep(item._children!)
        }
      })
    }
    deep(data)
    return data
  }

  /**
   *  加载数据
   * @param query .
   */
  async function loadData(query: Record<string, any>) {
    const { data, success } = await navCategoryApi.list(query)
    tableData.value = clone(data, true)
    const _data = onData(clone(data, true))
    return { data: _data, success, total: 0 }
  }

  /**
   * 加载子节点
   * @param row .
   */
  async function loadChild(row: any, _: TreeNode, resolve: (data: any[]) => void) {
    resolve(row._children || [])
  }

  /**
   * 新增
   */
  async function handleAddNew(id?: string) {
    formModel.value = {
      ...defaultModel,
      parentId: id,
    }
    dialogFormVisible.value = true
  }

  async function handleConfirm() {
    submitLoading.value = true
    const promise = formModel.value.id ? _update() : _save()
    promise.then(({ success }) => {
      if (success) {
        ElMessage.success('保存成功')
        plusPageRef.value?.getList()
        dialogFormVisible.value = false
      }
    }).finally(() => {
      submitLoading.value = false
    })
  }

  function _save() {
    return navCategoryApi.save(formModel.value)
  }

  function _update() {
    return navCategoryApi.update(formModel.value.id!, formModel.value)
  }

  return {

    plusDialogFormRef,
    dialogFormVisible,
    formColumns,
    formRules,
    formModel,
    submitLoading,

    plusPageRef,
    tableColumns,
    currentRow,
    tableActionButtions,
    loadData,
    loadChild,
    handleAddNew,
    handleConfirm,
  }
}
