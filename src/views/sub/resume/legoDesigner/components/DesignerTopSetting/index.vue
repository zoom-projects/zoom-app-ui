<script setup lang="ts">
import type { IHJSchema } from '../../types'
import { clone } from '@/utils'
import { isEqual } from 'lodash-es'
import { useLegoJsonStoreHook, useRefreshStoreHook, useUndoAndRedoStorehook } from '../../store/lego'
import GlobalSeeting from '../GlobalSetting/index.vue'

const emit = defineEmits(['addSize', 'reduceSize'])
const number = ref<number>(100)
const { HJSchemaJsonStore, draftTips } = useLegoJsonStoreHook()

onMounted(() => {
  // 鼠标事件
  window.addEventListener('mousedown', handleMousedown)
  window.addEventListener('mouseup', handleMouseup)
  // 键盘事件
  document.addEventListener('keyup', keyboard)
  document.addEventListener('keydown', keydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousedown', handleMousedown)
  window.removeEventListener('mouseup', handleMouseup)

  document.removeEventListener('keyup', keyboard)
  document.removeEventListener('keydown', keydown)
})

// 鼠标按下事件
const oldHJSchemaJsonStore = ref<any>(clone(HJSchemaJsonStore, true))
const newHJSchemaJsonStore = ref<any>(clone(HJSchemaJsonStore, true))
function handleMousedown() {
  oldHJSchemaJsonStore.value = clone(HJSchemaJsonStore, true)
}
// 鼠标松开
function handleMouseup() {
  newHJSchemaJsonStore.value = clone(HJSchemaJsonStore, true)
  const isEqualJson = isEqual(oldHJSchemaJsonStore.value, newHJSchemaJsonStore.value)
  if (!isEqualJson) {
    handleCache(oldHJSchemaJsonStore.value)
  }
  oldHJSchemaJsonStore.value = clone(HJSchemaJsonStore, true)
}
// 键盘按下
function keydown(event: any) {
  const crtlZ = event.ctrlKey && event.keyCode === 90
  const ctrlY = event.ctrlKey && event.keyCode === 89
  // 撤销和恢复
  if (crtlZ || ctrlY) {
    return
  }
  oldHJSchemaJsonStore.value = clone(HJSchemaJsonStore, true)
}
// 键盘松开
function keyboard(event: any) {
  const crtlZ = event.ctrlKey && event.keyCode === 90
  const ctrlY = event.ctrlKey && event.keyCode === 89
  // 撤销和恢复
  if (crtlZ || ctrlY) {
    return
  }
  newHJSchemaJsonStore.value = clone(HJSchemaJsonStore, true)
  const isEqualJson = isEqual(oldHJSchemaJsonStore.value, newHJSchemaJsonStore.value)
  if (!isEqualJson) {
    handleCache(oldHJSchemaJsonStore.value)
  }
}

// 加
function add() {
  if (number.value >= 250) {
    // Do nothing as the number is already at its maximum value
  }
  else {
    number.value += 5
    emit('addSize', number.value / 100)
  }
}

// 减
function reduce() {
  if (number.value <= 10) {
    // Do nothing as the number is already at its minimum value
  }
  else {
    number.value -= 5
    emit('reduceSize', number.value / 100)
  }
}

// 返回撤销恢复按钮颜色
const { undo, redo, insertCache } = useUndoAndRedoStorehook()
const { undoCommands, redoCommands } = useUndoAndRedoStorehook()
const { setUuid } = useRefreshStoreHook()
const undoColor = computed(() => {
  return undoCommands.length > 0 ? 'green' : '#aeaeae'
})

const redoColor = computed(() => {
  return redoCommands.length > 0 ? 'green' : '#aeaeae'
})

// 撤销
function handleUndo() {
  undo()
  setUuid()
}

// 恢复
function handleRedo() {
  redo()
  setUuid()
}

// 缓存步骤
function handleCache(oldHJSchemaJsonStore: IHJSchema) {
  insertCache(oldHJSchemaJsonStore)
}

// 更改标题
const titleIpf = ref<any>(null)
const isShowIpt = ref<boolean>(false)
function changeTitle() {
  isShowIpt.value = true
  titleIpf.value.focus()
}
function blurTitle() {
  isShowIpt.value = false
}
</script>

<template>
  <div class="designer-setting-box">
    <!-- 撤销和恢复 -->
    <div class="left">
      <div class="icon-reset-box">
        <div
          class="icon-box" :class="[{ 'is-disabled': undoCommands.length > 0 ? false : true }]"
          @click="handleUndo"
        >
          <ReIcon :color="undoColor" size="22px" icon="i-ep:refresh-left" />
          <span class="undo-span">撤销</span>
        </div>
        <div
          class="icon-box" :class="[{ 'is-disabled': redoCommands.length > 0 ? false : true }]"
          @click="handleRedo"
        >
          <ReIcon :color="redoColor" size="22px" icon="i-ep:refresh-right" />
          <span class="redo-span">还原</span>
        </div>
      </div>
      <!-- 草稿保存 -->
      <div class="draft-tips-box">
        <span class="draft-tips">{{ draftTips }}</span>
      </div>
    </div>

    <div class="center">
      <div class="title-box">
        <p v-show="!isShowIpt">
          <span :title="HJSchemaJsonStore.config.title">{{ HJSchemaJsonStore.config.title }}</span>
          <!-- <el-icon :size="20" color="#74a274" @click="changeTitle">
            <Edit />
          </el-icon> -->
          <ReIcon :size="20" color="#74a274" icon="i-ep:edit" @click="changeTitle" />
        </p>
        <el-input
          v-show="isShowIpt"
          ref="titleIpf"
          v-model="HJSchemaJsonStore.config.title"
          autofocus
          placeholder="请输入标题"
          @blur="blurTitle"
        />
      </div>
    </div>
    <!-- 缩放画布 -->
    <div class="right">
      <!-- 全局主题设置 -->
      <div class="global-setting-box">
        <ElPopover
          placement="bottom"
          width="400"
          trigger="click"
        >
          <template #reference>
            <div class="global-setting-btn">
              <ReIcon icon="svg-icon:theme-outline" color="#67c23a" size="18px" />
              全局设置
            </div>
          </template>
          <GlobalSeeting />
        </ElPopover>
      </div>
      <div class="zoom-box">
        <div class="icon-box" @click="reduce">
          <ReIcon icon="i-ep:zoom-out" color="#aeaeae" size="22px" />
        </div>
        <span>{{ number }}%</span>
        <div class="icon-box" @click="add">
          <ReIcon icon="i-ep:zoom-in" color="#aeaeae" size="22px" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .designer-setting-box {
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 260px;
    .icon-reset-box {
      display: flex;
      justify-content: space-between;
      width: 70px;
      .icon-box {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
        cursor: pointer;
        user-select: none;
        .undo-span {
          font-size: 12px;
          color: v-bind('undoColor');
        }
        .redo-span {
          font-size: 12px;
          color: v-bind('redoColor');
        }
      }
      .is-disabled {
        cursor: not-allowed;
      }
    }

    .draft-tips-box {
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 10px;
      flex: 1;
      .draft-tips {
        font-size: 10px;
        color: #999999;
      }
    }
  }
  .center {
    flex: 1;
    justify-content: flex-start;
    padding: 0 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .title-box {
      position: absolute;
      display: flex;
      align-items: center;
      p {
        display: flex;
        align-items: center;
        color: #333;

        span {
          display: block;
          max-width: 160px;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          white-space: nowrap;
        }
        .el-icon {
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }

  .right {
    width: 260px;
    justify-content: space-between;
    display: flex;
    color: #8a8a8a;
    align-items: center;
    font-size: 14px;
    user-select: none;
    .global-setting-box {
      display: flex;
      align-items: center;
      .svg-icon {
        margin-right: 10px;
      }
      span {
        color: #67c23a;
        font-size: 14px;
      }
      .global-setting-btn {
        display: flex;
        align-items: center;
        height: 30px;
        border-radius: 5px;
        padding: 0 10px;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          background-color: rgba($color: #ccc, $alpha: 0.2);
        }
      }
    }
    .zoom-box {
      width: 120px;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
          background-color: rgba($color: #ccc, $alpha: 0.2);
        }
      }
    }
  }
}
</style>
