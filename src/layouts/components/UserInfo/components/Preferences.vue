<script setup lang="ts">
import { getUserSetttings, updateUserSettings } from '@/api/modules/login'

const list = ref([
  {
    key: 'messageNotification',
    title: '消息通知',
    illustrate: '审核通知，活动通知等消息通知',
    type: 'switch',
  },
])
const model = ref<any>({})

async function handleChange() {
  updateUserSettings(model.value)
}
async function onLoad() {
  const { success, data } = await getUserSetttings()
  if (success) {
    model.value = data ?? {}
  }
}
onMounted(() => {
  onLoad()
})
</script>

<template>
  <LayInfo title="偏好设置">
    <div v-for="(item, index) in list" :key="index">
      <div class="flex items-center">
        <div class="flex-1">
          <p>{{ item.title }}</p>
          <el-text class="mx-1" type="info">
            {{ item.illustrate }}
          </el-text>
        </div>
        <ElSwitch v-if="item.type === 'switch'" v-model="model[item.key]" @change="handleChange" />
      </div>
      <el-divider />
    </div>
  </LayInfo>
</template>
