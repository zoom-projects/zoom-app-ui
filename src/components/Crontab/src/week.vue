<script setup lang="ts">
const props = defineProps({
  cron: {
    type: Object,
    default: () => ({
      second: '*',
      min: '*',
      hour: '*',
      day: '*',
      month: '*',
      week: '?',
      year: '',
    }),
  },
  check: {
    type: Function,
    default: () => {
    },
  },
})
const emit = defineEmits(['update'])

const radioValue = ref<number>(2)
const cycle01 = ref<number>(2)
const cycle02 = ref<number>(3)
const average01 = ref<number>(1)
const average02 = ref<number>(2)
const weekday = ref<number>(2)
const checkboxList = ref<number[]>([])
const checkCopy = ref<number[]>([2])
const weekList = ref<{
  key: number
  value: string
}[]>([
  { key: 1, value: '星期日' },
  { key: 2, value: '星期一' },
  { key: 3, value: '星期二' },
  { key: 4, value: '星期三' },
  { key: 5, value: '星期四' },
  { key: 6, value: '星期五' },
  { key: 7, value: '星期六' },
])

const cycleTotal = computed(() => {
  cycle()
  return `${cycle01.value}-${cycle02.value}`
})
const averageTotal = computed(() => {
  average()
  return `${average02.value}#${average01.value}`
})
const weekdayTotal = computed(() => {
  weekdayFunc()
  return `${weekday.value}L`
})
const checkboxString = computed(() => {
  return checkboxList.value.join(',')
})

function cycle() {
  cycle01.value = props.check(cycle01.value, 1, 6)
  cycle02.value = props.check(cycle02.value, cycle01.value + 1, 7)
}
function average() {
  average01.value = props.check(average01.value, 1, 4)
  average02.value = props.check(average02.value, 1, 7)
}

function weekdayFunc() {
  weekday.value = props.check(weekday.value, 1, 7)
}

watch(() => props.cron.week, value => changeRadioValue(value))
watch([radioValue, cycleTotal, averageTotal, weekdayTotal, checkboxString], () => onRadioChange())

function changeRadioValue(value: string) {
  if (value === '*') {
    radioValue.value = 1
  }
  else if (value === '?') {
    radioValue.value = 2
  }
  else if (value.includes('-')) {
    const indexArr = value.split('-')
    cycle01.value = Number(indexArr[0])
    cycle02.value = Number(indexArr[1])
    radioValue.value = 3
  }
  else if (value.includes('#')) {
    const indexArr = value.split('#')
    average01.value = Number(indexArr[1])
    average02.value = Number(indexArr[0])
    radioValue.value = 4
  }
  else if (value.includes('L')) {
    const indexArr = value.split('L')
    weekday.value = Number(indexArr[0])
    radioValue.value = 5
  }
  else {
    checkboxList.value = [...new Set(value.split(',').map(item => Number(item)))]
    radioValue.value = 6
  }
}
function onRadioChange() {
  if (radioValue.value === 2 && props.cron.day === '?') {
    emit('update', 'day', '*', 'week')
  }
  if (radioValue.value !== 2 && props.cron.day !== '?') {
    emit('update', 'day', '?', 'week')
  }
  switch (radioValue.value) {
    case 1:
      emit('update', 'week', '*', 'week')
      break
    case 2:
      emit('update', 'week', '?', 'week')
      break
    case 3:
      emit('update', 'week', cycleTotal.value, 'week')
      break
    case 4:
      emit('update', 'week', averageTotal.value, 'week')
      break
    case 5:
      emit('update', 'week', weekdayTotal.value, 'week')
      break
    case 6:
      if (checkboxList.value.length === 0) {
        checkboxList.value.push(checkCopy.value[0])
      }
      else {
        checkCopy.value = checkboxList.value
      }
      emit('update', 'week', checkboxString.value, 'week')
      break
  }
}
</script>

<template>
  <el-form>
    <el-form-item>
      <el-radio v-model="radioValue" :value="1">
        周，允许的通配符[, - * ? / L #]
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :value="2">
        不指定
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :value="3">
        周期从
        <el-select v-model="cycle01" clearable>
          <el-option
            v-for="(item, index) of weekList"
            :key="index"
            :label="item.value"
            :value="item.key"
            :disabled="item.key === 7"
          >
            {{ item.value }}
          </el-option>
        </el-select>
        -
        <el-select v-model="cycle02" clearable>
          <el-option
            v-for="(item, index) of weekList"
            :key="index"
            :label="item.value"
            :value="item.key"
            :disabled="item.key <= cycle01"
          >
            {{ item.value }}
          </el-option>
        </el-select>
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :value="4">
        第
        <el-input-number v-model="average01" :min="1" :max="4" /> 周的
        <el-select v-model="average02" clearable>
          <el-option v-for="item in weekList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :value="5">
        本月最后一个
        <el-select v-model="weekday" clearable>
          <el-option v-for="item in weekList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-radio>
    </el-form-item>

    <el-form-item>
      <!-- <el-radio v-model="radioValue" :value="6">
        指定
        <el-select v-model="checkboxList" class="multiselect" clearable placeholder="可多选" multiple :multiple-limit="6">
          <el-option v-for="item in weekList" :key="item.key" :label="item.value" :value="item.key" />
        </el-select>
      </el-radio> -->

      <div flex>
        <el-radio v-model="radioValue" :value="6" style="margin-right: 10px;">
          指定
        </el-radio>
        <el-checkbox-group v-model="checkboxList" class="checkbox" @change="() => radioValue = 6">
          <el-checkbox v-for="item in weekList" :key="item.key" :label="item.key">
            {{ item.value }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.el-input-number--small,
.el-select,
.el-select--small {
  margin: 0 0.5rem;
}
.el-select,
.el-select--small {
  width: 8rem;
}
.el-select.multiselect,
.el-select--small.multiselect {
  width: 17.8rem;
}

.checkbox {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
</style>
