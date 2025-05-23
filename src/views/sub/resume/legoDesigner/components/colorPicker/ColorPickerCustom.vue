<script setup lang="ts">
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

interface IColor {
  modelValue?: any
  teleported?: boolean
}
const props = withDefaults(defineProps<IColor>(), {
  modelValue: '',
  teleported: false,
})

const emit = defineEmits(['update:modelValue', 'change'])

const pureColor = ref(props.modelValue.includes('#') ? props.modelValue : '')
const gradientColor = ref(props.modelValue.includes('#') ? '' : props.modelValue)
// 颜色列表
const colorList = reactive<Array<{ rgb: string, hex: string }>>([
  {
    rgb: 'rgb(37, 70, 101)',
    hex: '#254665',
  },
  {
    rgb: 'rgb(221, 65, 94)',
    hex: '#dd415e',
  },
  {
    rgb: 'rgb(150, 122, 91)',
    hex: '#967a5b',
  },
  {
    rgb: 'rgb(51, 144, 205)',
    hex: '#3390cd',
  },
  {
    rgb: 'rgb(245, 79, 79)',
    hex: '#f54f4f',
  },
  {
    rgb: 'rgb(77, 77, 77)',
    hex: '#4d4d4d',
  },
  {
    rgb: 'rgb(170, 132, 96)',
    hex: '#aa8460',
  },
  {
    rgb: 'rgb(118, 186, 49)',
    hex: '#76ba31',
  },
  {
    rgb: 'rgb(100, 126, 201)',
    hex: '#647ec9',
  },
])

// 更改主题色
const curentIndex = ref<number>(-1)
function changTheme(index: number, item: { rgb: string, hex: string }) {
  console.log('主题色改变', item)
  curentIndex.value = index
  emit('update:modelValue', item.rgb)
  emit('change', item.rgb)
}

// 纯色改变
function pureColorChange(value: string) {
  console.log('纯色改变', value)
  curentIndex.value = -1
  emit('update:modelValue', value)
  emit('change', value)
}

// 渐变色改变
function gradientColorChange(value: string) {
  console.log('渐变色改变', value)
  curentIndex.value = -1
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="color-picker-box">
    <div class="item-box">
      <ElPopover :teleported="teleported" :width="276" trigger="click">
        <template #reference>
          <div class="custom-color-btn" title="自定义颜色" />
        </template>
        <div @click.prevent="">
          <ColorPicker
            :is-widget="true"
            :pure-color="pureColor"
            shape="circle"
            use-type="both"
            :round-history="true"
            :gradient-color="gradientColor"
            @pure-color-change="pureColorChange"
            @gradient-color-change="gradientColorChange"
          />
        </div>
      </ElPopover>
    </div>
    <div v-for="(item, index) in colorList" :key="item.hex" class="item-box">
      <span
        class="item" :class="[{ active: index === curentIndex || modelValue === item.rgb }]"
        :style="{
          'background-color': item.hex,
        }"
        @click="changTheme(index, item)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .color-picker-box {
  display: flex;
  flex-wrap: wrap;
  height: 60px;
  align-content: space-between;
  user-select: none;
  .item-box {
    width: 30px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    :deep(.el-popper) {
      padding: 0;
      width: 276px;
    }
    .custom-color-btn {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #ccc;
      cursor: pointer;
      background-color: v-bind('props.modelValue');
    }
    .item {
      display: block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .active {
    background-color: rgb(214, 21, 4);
    box-shadow: rgb(99, 100, 99) 0px 0px 10px;
  }
  :deep(.zs-color-picker) {
    border-radius: 50%;
    .zs-color-picker-btn {
      border-radius: 50%;
      .zs-color-picker-btn-color {
        border-radius: 50%;
      }
    }
    .zs-color-picker-panel {
      z-index: 5;
    }
  }
}
</style>
