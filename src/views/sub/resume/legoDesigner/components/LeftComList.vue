<script setup lang="ts">
import type { IWidget } from '../types'
import BackgroundImg from './BackgroundImg/index.vue'
import JsonDrawer from './JsonDrawer/index.vue'
import LayerManage from './LayerManage/index.vue'
import WidgetList from './WidgetList/index.vue'

const emit = defineEmits(['addWidget', 'selectWidget'])
// 默认选中tab
const activeTab = ref<number>(1)
const tabList = reactive<Array<any>>([
  {
    id: 1,
    icon: 'iconify-ri:puzzle-2-line',
    title: '组件',
  },
  {
    id: 2,
    icon: 'iconify-ri:stack-line',
    title: '图层',
  },
  {
    id: 3,
    icon: 'iconify-ri:braces-line',
    title: 'JSON',
  },
  {
    id: 4,
    icon: 'iconify-tabler:texture',
    title: '背景图',
  },
])
// 点击tab
const drawer = ref<boolean>(false)
function selectTab(id: number) {
  // json抽屉
  if (id === 3) {
    drawer.value = true
  }
  else {
    activeTab.value = id
  }
}
// 关闭抽屉
function closeJsonDrawer() {
  drawer.value = false
}

// 点击添加组件
function addWidget(widgetItem: IWidget) {
  emit('addWidget', widgetItem)
}

// 选中组件
function selectWidget() {
  emit('selectWidget')
}
</script>

<template>
  <div class="left-com-list-box">
    <div class="left-tab-box">
      <div
        v-for="item in tabList"
        :key="item.id"
        class="icon-box"
        :class="[{ 'icon-active': activeTab === item.id }]"
        @click="selectTab(item.id)"
      >
        <ElTooltip
          class="left-icon-box-item"
          effect="light"
          :content="item.title"
          placement="right"
        >
          <ReIcon :icon="item.icon" color="#67c23a" size="20px" />
        </ElTooltip>
      </div>
    </div>
    <div class="right-content-box">
      <!-- 组件列表 -->
      <WidgetList v-show="activeTab === 1" @add-widget="addWidget" />
      <!-- 图层管理 -->
      <LayerManage v-show="activeTab === 2" @select-widget="selectWidget" />
      <!-- JSON -->
      <JsonDrawer :drawer="drawer" @close-json-drawer="closeJsonDrawer" />
      <!-- 背景图 -->
      <BackgroundImg v-show="activeTab === 4" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.left-com-list-box {
  background-color: #fff;
  height: calc(100vh - 60px);
  width: 350px;
  display: flex;
  .left-tab-box {
    width: 50px;
    height: 100%;
    border-right: 1px solid #eee;
    .icon-box {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: all 0.3s;
      user-select: none;
      &:hover {
        background-color: rgba(#67c23a, 0.1);
      }
      .svg-icon {
        &:focus {
          outline: 0;
        }
      }
    }
    .icon-active {
      background-color: rgba(#67c23a, 0.1);
    }
  }
  .right-content-box {
    flex: 1;
    min-width: 200px;
    overflow: auto;
  }
}
</style>
