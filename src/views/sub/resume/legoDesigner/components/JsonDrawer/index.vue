<script setup lang="ts">
import { JsonViewer } from 'vue3-json-viewer'
import { useLegoJsonStoreHook } from '../../store/lego'
import 'vue3-json-viewer/dist/index.css'

withDefaults(defineProps<IJsonDrawer>(), {
  drawer: false,
})
const emit = defineEmits(['closeJsonDrawer'])
const { HJSchemaJsonStore } = useLegoJsonStoreHook()
interface IJsonDrawer {
  drawer: boolean
}
// 关闭弹窗
function handleClose() {
  emit('closeJsonDrawer')
}

const code = ref(HJSchemaJsonStore)

// 打开弹窗
function handleOpen() {
  code.value = HJSchemaJsonStore
}
</script>

<template>
  <div style=" ">
    <ElDrawer
      :model-value="drawer"
      :size="600"
      class="json-drawer"
      direction="ltr"
      title="页面JSON数据"
      destroy-on-close
      @close="handleClose"
      @open="handleOpen"
    >
      <JsonViewer
        :value="code"
        copyable
        sort
        show-double-quotes
        :expand-depth="3"
      />
    </ElDrawer>
  </div>
</template>

<style lang="scss" scoped>
.json-drawer {
  .el-drawer__body {
    padding: 0;
  }
  .cm-editor {
    height: 100%;
    font-size: 16px;
  }
  .my-awesome-json-theme {
    background: #fff;
    white-space: nowrap;
    color: #525252;
    font-size: 14px;
    font-family: Consolas, Menlo, Courier, monospace;

    .jv-ellipsis {
      color: #999;
      background-color: #eee;
      display: inline-block;
      line-height: 0.9;
      font-size: 0.9em;
      padding: 0px 4px 2px 4px;
      border-radius: 3px;
      vertical-align: 2px;
      cursor: pointer;
      user-select: none;
    }
    .jv-button {
      color: #49b3ff;
    }
    .jv-key {
      color: #111111;
    }
    .jv-item {
      &.jv-array {
        color: #111111;
      }
      &.jv-boolean {
        color: #fc1e70;
      }
      &.jv-function {
        color: #067bca;
      }
      &.jv-number {
        color: #fc1e70;
      }
      &.jv-number-float {
        color: #fc1e70;
      }
      &.jv-number-integer {
        color: #fc1e70;
      }
      &.jv-object {
        color: #111111;
      }
      &.jv-undefined {
        color: #e08331;
      }
      &.jv-string {
        color: #42b983;
        word-break: break-word;
        white-space: normal;
      }
    }
    .jv-code {
      .jv-toggle {
        &:before {
          padding: 0px 2px;
          border-radius: 2px;
        }
        &:hover {
          &:before {
            background: #eee;
          }
        }
      }
    }
  }
}
</style>
