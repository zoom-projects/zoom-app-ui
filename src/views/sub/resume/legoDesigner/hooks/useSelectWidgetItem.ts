import { useLegoJsonStoreHook } from '../store/lego'

// 获取选中的组件数据
function useSelectWidgetItem(id: string, pageIndex: number) {
  const { HJSchemaJsonStore } = storeToRefs(useLegoJsonStoreHook())
  const widgetItem = reactive(
    HJSchemaJsonStore.value.componentsTree[pageIndex].children.find(
      (item: { id: string }) => item.id === id,
    ),
  ) // 通过id获取选中的模块

  return {
    widgetItem,
  }
}
export default useSelectWidgetItem

// 根据组件id查询出组件数据
export function useGetWidgetItemById(id: string) {
  const { HJSchemaJsonStore } = storeToRefs(useLegoJsonStoreHook())
  let widgetItem = reactive<any>({})
  HJSchemaJsonStore.value.componentsTree.forEach((page, pageIndex) => {
    const index = page.children.findIndex((item: { id: string }) => item.id === id)
    if (index > -1) {
      widgetItem = HJSchemaJsonStore.value.componentsTree[pageIndex].children[index]
    }
  })

  return {
    widgetItem,
  }
}
