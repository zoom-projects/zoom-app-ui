<script setup lang="ts">
import type { PlusColumn } from 'plus-pro-components'
import type { ChallengeProps } from './utils/types'
import * as domainCertApi from '@/api/modules/domain/cert'
import { useDictStore } from '@/store'
import { ElLink } from 'element-plus'
import { domainIssueStatusDictKey } from './utils/const'

const props = defineProps<ChallengeProps>()
const emits = defineEmits(['nextStep', 'close', 'update:modelValue'])
const { toOptions, getDict, loadDict } = useDictStore()
const currentModel = toRef(props.formModel)
const autoChallenge = computed(() => currentModel.value?.autoChallenge ?? false)
const canChallenge = computed(() => {
  const { autoChallenge } = currentModel.value
  // 是否自动验证
  if (autoChallenge) {
    return false
  }
  // 是否可以验证
  // 只有在待验证状态下可以验证
  // 其他状态不可以验证
  // 例如：valid，invalid，error
  return ['pending'].includes(currentModel.value.status)
})
// 是否可以下一步
const hasNextStep = computed(() => {
  return ['valid'].includes(currentModel.value.status)
})
const dnsChallenge = ref<any>([])
const httpChallenge = ref<any>([])
const activeTab = ref('dns-01')
// 是否正在验证
const isValiding = ref(false)
const failStatus = computed(() => ['invalid', 'error'].includes(currentModel.value.status))

const dnsColumns: PlusColumn[] = [
  {
    label: '主机记录',
    prop: 'recordName',
    valueType: 'copy',
  },
  {
    label: '记录值',
    prop: 'value',
    valueType: 'copy',
  },
  {
    label: '状态',
    prop: 'status',
    valueType: 'select',
    options: computed(() => toOptions(domainIssueStatusDictKey)),
  },
]
const httpColumns: PlusColumn[] = [
  {
    label: '验证URL',
    prop: 'url',
    render: (_, { row }) => {
      const url = `http://${row.domain}/${row.recordName}`
      return h(
        ElLink,
        {
          href: url,
          target: '_blank',
          underline: 'never',
        },
        () => row.recordName,
      )
    },
  },
  {
    label: '下载',
    prop: 'fileName',
    render: (_, { row }) => {
      return h(
        ElLink,
        {
          type: 'primary',
          underline: 'never',
          onClick: () => {
            // 写入文件
            const { value, token } = row
            const fileName = token
            const blob = new Blob([value], { type: 'application/octet-stream' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(link.href)
          },
        },
        () => '下载',
      )
    },
  },
  {
    label: '状态',
    prop: 'status',
    valueType: 'select',
    options: computed(() => toOptions(domainIssueStatusDictKey)),
  },
]

// 定时器
const timer = ref<any>(null)
const orderTimer = ref<any>(null)

async function handleClose() {
  emits('close')
}

async function getInfo() {
  if (!currentModel.value.id) {
    return
  }
  const { success, data } = await domainCertApi.getInfo(currentModel.value.id)
  if (success) {
    currentModel.value = data
  }
}

async function handleNextStep() {
  if (currentModel.value.status === 'valid') {
    emits('nextStep', 3)
  }
  else {
    ElMessage.error('当前状态不允许进行下一步操作')
  }
}

watch(
  () => currentModel.value.status,
  (val) => {
    if (['invalid', 'error', 'valid'].includes(val)) {
      isValiding.value = false
      setTimeout(() => {
        clearInterval(timer.value)
        clearInterval(orderTimer.value)
      }, 100)
    }

    if (val === 'valid') {
      emits('nextStep', 3)
    }
  },
  { immediate: true },
)

async function getChallenges() {
  const { success, data } = await domainCertApi.getChallenges(currentModel.value.id)
  if (success) {
    // 区分DNS验证和HTTP验证
    dnsChallenge.value = data.filter((item: any) => item.type === 'dns-01')
    httpChallenge.value = data.filter((item: any) => item.type === 'http-01')
  }
}

/**
 * @description: 处理验证
 */
async function handleTriggerChallenge() {
  if (!currentModel.value.id) {
    return
  }
  // 触发验证
  isValiding.value = true
  await domainCertApi.triggerChallenge(currentModel.value.id, activeTab.value)
}

onMounted(() => {
  timer.value = setInterval(() => {
    getInfo()
  }, 3000)

  orderTimer.value = setInterval(() => {
    getChallenges()
  }, 3000)

  loadDict([domainIssueStatusDictKey])
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  if (orderTimer.value) {
    clearInterval(orderTimer.value)
  }
})
</script>

<template>
  <div class="challenge">
    <template v-if="!failStatus">
      <div v-if="autoChallenge">
        <ElAlert
          title="自动验证"
          type="success"
          description="系统正在自动为您验证域名，无需手动操作，稍后将自动为您签发证书"
          :closable="false"
        />
      </div>
      <div v-else>
        <ElAlert
          title="手动验证"
          type="warning"
          description="请根据以下方式验证域名"
          show-icon
          :closable="false"
        />
      </div>
      <div class="challenge-content">
        <ElTabs v-model:model-value="activeTab">
          <ElTabPane label="DNS验证" name="dns-01">
            <ElAlert
              v-if="!autoChallenge"
              title="DNS验证"
              type="info"
              description="请添加以下TXT记录到您的域名DNS解析中"
              show-icon
              :closable="false"
            />
            <PlusTable :columns="dnsColumns" :data="dnsChallenge" :title-bar="false" />
          </ElTabPane>
          <ElTabPane v-if="!autoChallenge" label="HTTP验证" name="http-01">
            <ElAlert
              title="HTTP验证"
              type="info"
              description="请将以下文件放置到您的网站根目录下"
              show-icon
              :closable="false"
            />
            <PlusTable :columns="httpColumns" :data="httpChallenge" :title-bar="false" />
          </ElTabPane>
        </ElTabs>
      </div>
    </template>
    <div v-else>
      <ElAlert
        title="验证失败"
        type="error"
        description="验证失败，请检查您的域名解析是否正确,请重新创建订单"
        show-icon
        :closable="false"
      />
    </div>
    <div class="footer">
      <ElButton @click="handleClose">
        取消
      </ElButton>
      <ElButton v-if="hasNextStep" type="primary" @click="handleNextStep">
        下一步
      </ElButton>
      <ElButton
        v-if="canChallenge"
        type="primary"
        :loading="isValiding"
        @click="handleTriggerChallenge"
      >
        验证
      </ElButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.challenge {
  .challenge-content {
    margin-top: 20px;
  }

  .footer {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
