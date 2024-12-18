<script setup lang="ts">
import { socialTypeList } from './utils/const'
import { useSocialHook } from './utils/hook'

const { bindSocial } = useSocialHook()
</script>

<template>
  <LayInfo title="第三方帐号绑定">
    <div v-for="(item, index) in socialTypeList" :key="index">
      <div class="flex items-center border border-gray-200 rounded-lg p-7">
        <div class="meta flex flex-1 items-center">
          <div class="avatar h-12 w-12 flex items-center justify-center rounded-full">
            <ReIcon icon="svg-icon:github-fill" :size="35" />
          </div>
          <div class="meta-content">
            <h4 class="title text-4">
              {{ item.title }}
            </h4>
          </div>
        </div>
        <div class="action">
          <ElButton type="primary" @click="bindSocial(item.key)">
            绑定
          </ElButton>
        </div>
      </div>
    </div>
  </LayInfo>
</template>

<style lang="scss" scoped>
</style>
