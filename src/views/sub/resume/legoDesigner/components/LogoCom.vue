<script setup lang="ts">
interface IBgcColor {
  fontColor?: string
  iconColor?: string
}
withDefaults(defineProps<IBgcColor>(), {
  fontColor: '#74a274',
  iconColor: '',
})

const router = useRouter()
function toHome() {
  router.push('/')
}
</script>

<template>
  <div class="logo" @click="toHome">
    <img src="@/assets/images/logo.png">
  </div>
</template>

<style lang="scss" scoped>
  .logo {
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  img {
    height: 100%;
  }
  span {
    letter-spacing: 2px;
    font-size: 22px;
    font-weight: 600;
    font-family: monospace;
    color: v-bind('fontColor');
    margin-left: 10px;
  }
}
</style>
