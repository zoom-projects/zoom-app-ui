<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="not-container">
    <img src="@/assets/images/500.png" class="not-img" alt="500">
    <div class="not-detail">
      <h2>500</h2>
      <h4>抱歉，您的网络不见了~🤦‍♂️🤦‍♀️</h4>
      <el-button type="primary" @click="router.back">
        返回上一页
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
