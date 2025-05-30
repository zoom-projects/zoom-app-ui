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

const fullYear = Number(new Date().getFullYear())
const maxFullYear = fullYear + 10
const radioValue = ref<number>(1)
const cycle01 = ref<number>(fullYear)
const cycle02 = ref<number>(fullYear + 1)
const average01 = ref<number>(fullYear)
const average02 = ref<number>(1)
const checkboxList = ref<number[]>([])
const checkCopy = ref<number[]>([fullYear])

const cycleTotal = computed(() => {
  cycle()
  return `${cycle01.value}-${cycle02.value}`
})
const averageTotal = computed(() => {
  average()
  return `${average01.value}/${average02.value}`
})
const checkboxString = computed(() => {
  return checkboxList.value.join(',')
})

function cycle() {
  cycle01.value = props.check(cycle01.value, fullYear, maxFullYear - 1)
  cycle02.value = props.check(cycle02.value, cycle01.value + 1, maxFullYear)
}

function average() {
  average01.value = props.check(average01.value, fullYear, maxFullYear - 1)
  average02.value = props.check(average02.value, 1, 10)
}

watch(() => props.cron.year, value => changeRadioValue(value))
watch([radioValue, cycleTotal, averageTotal, checkboxString], () => onRadioChange())

function changeRadioValue(value: string) {
  if (value === '') {
    radioValue.value = 1
  }
  else if (value === '*') {
    radioValue.value = 2
  }
  else if (value.includes('-')) {
    const indexArr = value.split('-')
    cycle01.value = Number(indexArr[0])
    cycle02.value = Number(indexArr[1])
    radioValue.value = 3
  }
  else if (value.includes('/')) {
    const indexArr = value.split('/')
    average01.value = Number(indexArr[0])
    average02.value = Number(indexArr[1])
    radioValue.value = 4
  }
  else {
    checkboxList.value = [...new Set(value.split(',').map(item => Number(item)))]
    radioValue.value = 5
  }
}
function onRadioChange() {
  switch (radioValue.value) {
    case 1:
      emit('update', 'year', '', 'year')
      break
    case 2:
      emit('update', 'year', '*', 'year')
      break
    case 3:
      emit('update', 'year', cycleTotal.value, 'year')
      break
    case 4:
      emit('update', 'year', averageTotal.value, 'year')
      break
    case 5:
      if (checkboxList.value.length === 0) {
        checkboxList.value.push(checkCopy.value[0])
      }
      else {
        checkCopy.value = checkboxList.value
      }
      emit('update', 'year', checkboxString.value, 'year')
      break
  }
}
</script>

<template>
  <el-form>
    <el-form-item>
      <el-radio v-model="radioValue" :value="1">
        不填，允许的通配符[, - * /]
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :value="2">
        每年
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :value="3">
        周期从
        <el-input-number v-model="cycle01" :min="fullYear" :max="2098" /> -
        <el-input-number v-model="cycle02" :min="cycle01 ? cycle01 + 1 : fullYear + 1" :max="2099" />
      </el-radio>
    </el-form-item>

    <el-form-item>
      <el-radio v-model="radioValue" :value="4">
        从
        <el-input-number v-model="average01" :min="fullYear" :max="2098" /> 年开始，每
        <el-input-number v-model="average02" :min="1" :max="2099 - average01 || fullYear" /> 年执行一次
      </el-radio>
    </el-form-item>

    <el-form-item>
      <!-- <el-radio v-model="radioValue" :value="5">
        指定
        <el-select v-model="checkboxList" clearable placeholder="可多选" multiple :multiple-limit="8">
          <el-option v-for="item in 9" :key="item" :value="item - 1 + fullYear" :label="item - 1 + fullYear" />
        </el-select>
      </el-radio> -->

      <div flex>
        <el-radio v-model="radioValue" :value="5" style="margin-right: 10px;">
          指定
        </el-radio>
        <el-checkbox-group v-model="checkboxList" class="checkbox" @change="() => radioValue = 5">
          <el-checkbox v-for="item in 9" :key="item" :label="item - 1 + fullYear">
            {{ item - 1 + fullYear }}
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
  margin: 0 0.2rem;
}
.el-select,
.el-select--small {
  width: 18.8rem;
}

.checkbox {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
</style>
