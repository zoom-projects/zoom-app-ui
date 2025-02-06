<script setup lang="ts">
import { useLegoJsonStoreHook } from '../../store/lego'

const props = defineProps<{
  pageIndex: number
}>()
const { HJSchemaJsonStore } = useLegoJsonStoreHook()
// 删除当前页
function deletePage() {
  if (HJSchemaJsonStore.componentsTree.length < 2) {
    return
  }
  // 存储未删除之前的页面
  for (let i = 0; i < HJSchemaJsonStore.componentsTree.length; i++) {
    HJSchemaJsonStore.componentsTree[i].oldPageIndex = i
  }
  if (HJSchemaJsonStore.componentsTree[props.pageIndex].children.length) {
    ElMessageBox.confirm('该页面内的组件将一同删除，且无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        HJSchemaJsonStore.componentsTree.splice(props.pageIndex, 1)
      })
      .catch(() => {})
  }
  else {
    HJSchemaJsonStore.componentsTree.splice(props.pageIndex, 1)
  }
}
</script>

<template>
  <div class="split-block-box">
    <!-- 左侧 -->
    <div class="split-left">
      <h3>第{{ pageIndex + 1 }}页</h3>
    </div>
    <!-- 右侧 -->
    <div class="split-right">
      <div
        class="icon-box" :class="[{ disabled: HJSchemaJsonStore.componentsTree.length < 2 }]"
        title="删除"
        @click="deletePage"
      >
        <ReIcon icon="i-ep:delete" color="green" size="17px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .split-block-box {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .split-left {
    h3 {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 2px;
      color: #0d1216;
    }
  }
  .split-right {
    display: flex;
    .icon-box {
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba($color: #ccc, $alpha: 0);
      transition: all 0.3s;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: rgba($color: #ccc, $alpha: 0.3);
      }
    }
    .icon-shangyi {
      transform: rotate(180deg);
    }
    .disabled {
      cursor: not-allowed;
    }
  }
}
</style>
