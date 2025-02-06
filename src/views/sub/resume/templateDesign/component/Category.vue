<script lang="ts" setup>
defineProps<{
  categoryList: Array<{
    category_label: string
    category_value: string
  }>
}>()

const emit = defineEmits(['getTemplateListByCate'])

const currentSort = ref<string>('')

// 点击分类
const currentValue = ref<string>('全部')
function handleSelect(item: any) {
  currentValue.value = item.category_label
  const queryParams = {
    category: currentValue.value,
    sort: currentSort.value,
  }
  emit('getTemplateListByCate', queryParams)
}

function handleSort(value: string) {
  if (currentSort.value) {
    currentSort.value = ''
  }
  else {
    currentSort.value = value
  }

  const queryParams = {
    category: currentValue.value === '全部' ? '' : currentValue.value,
    sort: currentSort.value,
  }
  emit('getTemplateListByCate', queryParams)
}
</script>

<template>
  <div class="category-box">
    <div class="left">
      <ul>
        <li
          v-for="(item, index) in categoryList"
          :key="index"
          :class="[{ active: currentValue === item.category_label }]"
          @click="handleSelect(item)"
        >
          {{ item.category_label }}
        </li>
      </ul>
    </div>
    <!-- 右侧筛选 -->
    <div class="right">
      <div class="sort-box" :class="[{ active: currentSort === 'time' }]" @click="handleSort('time')">
        <ReIcon
          icon="iconify-ep:timer"
          size="20px"
          :color="currentSort === 'time' ? '#018060' : '#ccc'"
        />
        <span>时间</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .category-box {
  width: 100%;
  display: flex;
  min-height: 42px;
  justify-content: space-between;
  margin-top: 30px;
  .left {
    ul {
      display: flex;
      li {
        list-style: none;
        padding: 0 18px;
        height: 42px;
        border-radius: 20px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        letter-spacing: 4px;
        margin-right: 20px;
        transition: all 0.3s;
        border: 1px solid transparent;
        user-select: none;
        &:hover {
          color: #009a74;
        }
      }
      .active {
        color: #009a74;
        border: 1px solid #2ddd9d;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    padding: 0 5px 0 0;
    .sort-box {
      margin-left: 10px;
      display: flex;
      align-items: center;
      color: rgb(181, 181, 181);
      cursor: pointer;
      transition: all 0.3s;
      font-size: 14px;
      user-select: none;
      span {
        margin-left: 2px;
      }
    }
    .active {
      color: #018060;
    }
  }
}
</style>
