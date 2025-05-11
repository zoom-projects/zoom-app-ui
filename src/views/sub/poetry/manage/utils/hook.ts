import type { PoetryAuthor } from '/src/api/modules/poetry/author/types'
import type { PoetryCollection } from '/src/api/modules/poetry/collection/types'
import type { PoetryRhythmic } from '/src/api/modules/poetry/rhythmic/types'
import type { PoetryInfo } from '@/api/modules/poetry/manage/types'
import type { FormRules } from 'element-plus'
import type { PageInfo, PlusColumn, PlusDrawerFormInstance } from 'plus-pro-components'
import { list as authorListApi } from '@/api/modules/poetry/author'
import { list as collectionListApi } from '@/api/modules/poetry/collection'
import * as poetryApi from '@/api/modules/poetry/manage'
import { list as rhythmicListApi } from '@/api/modules/poetry/rhythmic'
import {list as dynastyListApi} from '@/api/modules/poetry/dynasty'
import { clone } from '@/utils'
import { PoetryDynasty } from '/src/api/modules/poetry/dynasty/types'

export function usePoetryMangeHook() {
  const authorList = ref<any>([])
  const collectionList = ref<any>([])
  const rhythmicList = ref<any>([])
  const dynastyList = ref<any>([])

  const searchForm = ref({})
  const searchColumns: PlusColumn[] = [
    {
      label: '标题',
      prop: 'title',
    },
    {
      label: '诗人',
      prop: 'authorId',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
      },
      options: computed(() => {
        return authorList.value.map((item: PoetryAuthor.ResAuthor) => {
          return {
            label: `[${item?.dynasty?.shortName ?? '未知'}] ${item.name}`,
            value: item.id,
          }
        })
      }),
    },
    {
      label: '朝代',
      prop: 'dynastyId',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
      },
      options: computed(() => {
        return dynastyList.value.map((item: PoetryDynasty.ResDynasty) => {
          return {
            label: item.name,
            value: item.id,
          }
        })
      }),
    },
    {
      label: '词牌名',
      prop: 'rhythmicId',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
      },
      options: computed(() => {
        return rhythmicList.value.map((item: PoetryRhythmic.ResRhythmic) => {
          return {
            label: item.name,
            value: item.id,
          }
        })
      }),
    },
    {
      label: '收录',
      prop: 'collectionId',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
      },
      options: computed(() => {
        return collectionList.value.map((item: PoetryCollection.ResCollection) => {
          return {
            label: item.name,
            value: item.id,
          }
        })
      }),
    },
  ]
  const pageLoading = ref(false)
  const tableData = ref<PoetryInfo.ResPoetryInfo[]>([])

  const pageTotal = ref<number>(0)
  const pageInfo = ref<PageInfo>({
    page: 1,
    pageSize: 8,
  })

  function handlePageChange(page: PageInfo) {
    pageInfo.value.page = page.page
    pageInfo.value.pageSize = page.pageSize
    getPoetryList()
  }

  async function handleReset() {
    searchForm.value = {}
    pageInfo.value.page = 1
    pageInfo.value.pageSize = 8
    await getPoetryList()
  }

  async function getPoetryList() {
    const params = {
      ...searchForm.value,
      current: pageInfo.value.page,
      size: pageInfo.value.pageSize,
      sort: 'created desc',
    }
    pageLoading.value = true
    const { success, data } = await poetryApi.page(params)
    if (success) {
      pageTotal.value = data.total
      tableData.value = data.records
    }
  }

  const plusDrawerFormRef = ref<Nullable<PlusDrawerFormInstance>>(null)
  const drawerVisible = ref(false)
  const drawerLoading = ref(false)
  const drawerModel = ref<any>({})
  const formColumns: PlusColumn[] = [
    {
      label: '标题',
      prop: 'title',
    },
    {
      label: '诗人',
      prop: 'authorId',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
        onChange: (val: string) => {
          drawerModel.value.authorId = val
          // 选择诗人时，设置朝代
          const res = authorList.value.filter((item: PoetryAuthor.ResAuthor) => item.id === val)
          if (res.length > 0) {
            drawerModel.value.dynastyId = res[0].dynastyId
          }
        },
      },
      options: computed(() => {
        return authorList.value.map((item: PoetryAuthor.ResAuthor) => {
          return {
            label: `[${item?.dynasty?.shortName ?? '未知'}] ${item.name}`,
            value: item.id,
          }
        })
      }),
    },
    {
      label: '词牌名',
      prop: 'rhythmicId',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
      },
      options: computed(() => {
        return rhythmicList.value.map((item: PoetryRhythmic.ResRhythmic) => {
          return {
            label: item.name,
            value: item.id,
          }
        })
      }),
    },
    {
      label: '收录',
      prop: 'collectionId',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
      },
      options: computed(() => {
        return collectionList.value.map((item: PoetryCollection.ResCollection) => {
          return {
            label: item.name,
            value: item.id,
          }
        })
      }),
    },
    {
      label: '内容',
      prop: 'paragraph',
      valueType: 'textarea',
      colProps: {
        span: 24,
      },
      fieldProps: {
        autosize: {
          minRows: 4,
        },
      },
    },
    {
      label: '笔记',
      prop: 'note',
      valueType: 'textarea',
      colProps: {
        span: 24,
      },
      fieldProps: {
        autosize: {
          minRows: 4,
        },
      },
    },
    {
      label: '译文',
      prop: 'summary',
      valueType: 'textarea',
      colProps: {
        span: 24,
      },
      fieldProps: {
        autosize: {
          minRows: 4,
        },
      },
    },
    {
      label: '鉴赏',
      prop: 'appreciation',
      valueType: 'textarea',
      colProps: {
        span: 24,
      },
      fieldProps: {
        autosize: {
          minRows: 4,
        },
      },
    },
  ]
  const formRules: FormRules = {
    title: [
      {
        required: true,
        message: '请输入标题',
      },
    ],
    authorId: [
      {
        required: true,
        message: '请选择诗人',
      },
    ],
    paragraph: [
      {
        required: true,
        message: '请输入内容',
      },
    ],
  }

  async function handleOpenDrawer(model?: Record<string, any>) {
    drawerVisible.value = true
    drawerModel.value = clone(model, true) || {}
    plusDrawerFormRef.value?.formInstance?.resetFields()
  }

  async function handleConfirm() {
    if (drawerModel.value.id) {
      await _update()
    }
    else {
      await _save()
    }
  }

  async function _save() {
    drawerLoading.value = true
    const { success } = await poetryApi.save(drawerModel.value).finally(() => {
      drawerLoading.value = false
    })
    if (success) {
      ElMessage.success('操作成功')
      drawerVisible.value = false
      getPoetryList()
    }
  }

  async function _update() {
    drawerLoading.value = true
    const { success } = await poetryApi.update(drawerModel.value.id, drawerModel.value).finally(() => {
      drawerLoading.value = false
    })
    if (success) {
      ElMessage.success('操作成功')
      drawerVisible.value = false
      getPoetryList()
    }
  }

  async function handleDelete(item: Record<string, any>) {
    drawerLoading.value = true
    const { success } = await poetryApi.remove(item.id).finally(() => {
      drawerLoading.value = false
    })
    if (success) {
      ElMessage.success('操作成功')
      getPoetryList()
      drawerVisible.value = false
    }
  }

  const authorVisible = ref(false)
  const authorModel = ref({})
  function handleOpenAuthor() {
    authorVisible.value = true
    authorModel.value = {}
  }
  function handleAuthorSuccess(model: Record<string, any>) {
    authorModel.value = model
    drawerModel.value.authorId = model.id
    getAuthorList()
  }

  async function getAuthorList() {
    const { success, data } = await authorListApi()
    if (success) {
      authorList.value = data
    }
  }

  const collectionVisible = ref(false)
  const collectionModel = ref({})
  function handleOpenCollection() {
    collectionVisible.value = true
    collectionModel.value = {}
  }
  function handleCollectionSuccess(model: Record<string, any>) {
    collectionModel.value = model
    drawerModel.value.collectionId = model.id
    getCollectionList()
  }
  async function getCollectionList() {
    const { success, data } = await collectionListApi()
    if (success) {
      collectionList.value = data
    }
  }

  const rhythmicVisible = ref(false)
  const rhythmicModel = ref({})
  function handleOpenRhythmic() {
    rhythmicVisible.value = true
    rhythmicModel.value = {}
  }
  function handleRhythmicSuccess(model: Record<string, any>) {
    rhythmicModel.value = model
    drawerModel.value.rhythmicId = model.id
    getRhythmicList()
  }
  async function getRhythmicList() {
    const { success, data } = await rhythmicListApi()
    if (success) {
      rhythmicList.value = data
    }
  }

  async function getDynastyList() {
    const { success, data } = await dynastyListApi();
    if (success) {
      dynastyList.value = data
    }
  }

  watch(
    () => drawerVisible.value,
    (val) => {
      if (!val) {
        plusDrawerFormRef.value?.formInstance?.resetFields()
      }
    },
  )

  onMounted(() => {
    getPoetryList()
    getAuthorList()
    getCollectionList()
    getRhythmicList()
  getDynastyList()
  })

  return {
    searchForm,
    searchColumns,
    pageLoading,
    getPoetryList,
    handleReset,
    tableData,

    pageTotal,
    pageInfo,
    handlePageChange,

    plusDrawerFormRef,
    drawerVisible,
    drawerLoading,
    drawerModel,
    formColumns,
    formRules,
    handleOpenDrawer,
    handleConfirm,
    handleDelete,

    authorVisible,
    authorModel,
    handleOpenAuthor,
    handleAuthorSuccess,

    collectionVisible,
    collectionModel,
    handleOpenCollection,
    handleCollectionSuccess,

    rhythmicVisible,
    rhythmicModel,
    handleOpenRhythmic,
    handleRhythmicSuccess,

  }
}
