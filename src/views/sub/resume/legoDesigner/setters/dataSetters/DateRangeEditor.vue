<script lang="ts" setup>
import useSelectWidgetItem from '../../hooks/useSelectWidgetItem'

const props = defineProps<{
  id: string
  pageIndex: number
}>()

// 选中的widgetItem
const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex)

const radioValue = ref<string>(widgetItem.dataSource.dateRange[1])
function handleRadioChange(value: any) {
  console.log('handleRadioChange', value)
  widgetItem.dataSource.dateRange[1] = value
}

// 结束日期改变
function handleEndDateChange(value: string) {
  console.log('结束日期改变', value)
  widgetItem.dataSource.dateRange[1] = value
  if (value) {
    radioValue.value = ''
  }
}
// 开始日期改变
function handleStartDateChange(value: string) {
  widgetItem.dataSource.dateRange[0] = value
}
</script>

<template>
  <div class="date-range-editor-box">
    <ElFormItem label="日期选择:">
      <ElDatePicker
        v-model="widgetItem.dataSource.dateRange[0]"
        type="date"
        placeholder="开始日期"
        :clearable="false"
        value-format="YYYY.MM.DD"
        @change="handleStartDateChange"
      />
      -
      <ElDatePicker
        v-model="widgetItem.dataSource.dateRange[1]"
        type="date"
        placeholder="结束日期"
        :clearable="false"
        value-format="YYYY.MM.DD"
        @change="handleEndDateChange"
      />
    </ElFormItem>

    <ElFormItem label="">
      <ElRadio v-model="radioValue" label="至今" @change="handleRadioChange">
        至今
      </ElRadio>
    </ElFormItem>
  </div>
</template>

<style lang="scss" scoped>
  .date-range-editor-box {
  :deep(.el-date-editor) {
    width: 110px;
  }
}
</style>
