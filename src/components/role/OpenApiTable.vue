<script setup lang="ts">
defineProps({
  dataList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
})

const checkedKeys = ref<Array<string>>([])
function init(keys: string[]) {
  checkedKeys.value = keys
}

function getValue() {
  return checkedKeys.value
}

defineExpose({ init, getValue })
</script>

<template>
  <table class="grant-table" border="1">
    <thead>
      <tr class="header-row">
        <th>模块</th>
        <th>接口</th>
      </tr>
    </thead>
    <tbody>
      <ElCheckboxGroup v-model="checkedKeys" style="display: contents;">
        <tr v-for="item in dataList" :key="item.module">
          <td>
            <span class="text-size-3.5 font-500">{{ item.module }}</span>
          </td>
          <td>
            <ElRow v-if="item.children && item.children.length">
              <ElCol v-for="child in item.children" :key="child.id" :span="12">
                <ElCheckbox :value="child.id" :label="child.apiName " />
              </ElCol>
            </ElRow>
          </td>
        </tr>
      </ElCheckboxGroup>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.grant-table {
  width: 100%;
  border: 1px solid var(--el-border-color);
  text-indent: initial;
  border-spacing: 2px;
  border-collapse: collapse;
  user-select: none;
  tbody {
    td {
      padding: 6px 16px;
      border: 1px solid var(--el-border-color);
    }
  }
}
.header-row {
  th {
    font-size: 17px;
    padding: 4px;
    font-weight: 500;
    text-align: center;
    background-color: var(--el-fill-color);
    color: var(--el-text-color-regular);
    border-right: 1px solid var(--el-border-color);
  }

  .parent-view-header,
  .child-view-header {
    width: 200px;
  }
}
</style>
