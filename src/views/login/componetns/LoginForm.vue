<script setup lang="ts">
import type { LoginType } from '@/utils/enums'
import { authBindSocial, loginApiByUsernameApi } from '@/api/modules/login'
import { useUserStore } from '@/store'
import { ElForm } from 'element-plus'
import Motion from '../utils/motion'
import PhoneLogin from './PhoneLogin.vue'
import Register from './Register.vue'
import ResetPassword from './ResetPassword.vue'

const userStore = useUserStore()

type FormInstance = InstanceType<typeof ElForm>
const loginFormRef = ref<FormInstance>()
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const currentLoginType = computed(() => userStore.loginType)
const loginTypes = [
  { type: 'phone', label: '手机登录' },
  { type: 'register', label: '注册' },
]

const loading = ref(false)
const loginForm = reactive<any>({
  username: '',
  password: '',
})

function formSubmit() {
  loginFormRef.value?.validate(async (valid) => {
    if (!valid)
      return
    loading.value = true
    try {
      // // 1.执行登录接口
      const { data } = await loginApiByUsernameApi({ ...loginForm, password: loginForm.password })
      userStore.setToken(data)
      // 2.执行登录后的操作
      await userStore.afterLogin()
    }
    finally {
      loading.value = false
    }
  })
}

function changeLoginType(type: LoginType) {
  userStore.loginType = type
}

async function socialLogin(source: string) {
  const { success, data } = await authBindSocial(source)
  if (success) {
    window.location.href = data
  }
}
</script>

<template>
  <template v-if="currentLoginType === 'username'">
    <ElForm
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      size="large"
    >
      <Motion :delay="150">
        <ElFormItem prop="username">
          <ElInput
            v-model="loginForm.username"
            placeholder="支持用户名、邮箱、手机号"
          >
            <template #prefix>
              <ReIcon icon="svg-icon:user" class="el-icon" />
            </template>
          </ElInput>
        </ElFormItem>
      </Motion>
      <Motion :delay="200">
        <ElFormItem prop="password">
          <ElInput
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            show-password
            autocomplete="new-password"
          >
            <template #prefix>
              <ReIcon icon="svg-icon:lock" class="el-icon" />
            </template>
          </ElInput>
        </ElFormItem>
      </Motion>
      <Motion :delay="250">
        <div class="h-[20px] w-full flex items-center justify-between">
          <ElButton
            link
            type="primary"
            @click="changeLoginType('reset' as LoginType)"
          >
            忘记密码？
          </ElButton>
        </div>
        <ElFormItem>
          <ElButton
            class="mt-4 w-full"
            size="default"
            type="primary"
            :loading="loading"
            @click="formSubmit"
          >
            登录
          </ElButton>
        </ElFormItem>
        <Motion :delay="300">
          <ElFormItem>
            <div class="h-[20px] w-full flex items-center justify-between">
              <ElButton
                v-for="(item) in loginTypes"
                :key="item.type"
                class="mt-4 w-full"
                size="default"
                @click="changeLoginType(item.type as LoginType)"
              >
                {{ item.label }}
              </ElButton>
            </div>
          </ElFormItem>
        </Motion>
        <Motion :delay="350">
          <ElFormItem>
            <ElDivider>
              <p class="text-xs text-gray-500">
                第三方登录
              </p>
            </ElDivider>
            <div class="w-full flex justify-evenly">
              <ReIcon
                icon="svg-icon:github-fill"
                :size="20"
                class="cursor-pointer text-gray-500 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-300"
                @click="socialLogin('github')"
              />
            </div>
          </ElFormItem>
        </Motion>
      </Motion>
    </ElForm>
  </template>
  <PhoneLogin v-if="currentLoginType === 'phone'" />
  <Register v-if="currentLoginType === 'register'" />
  <ResetPassword v-if="currentLoginType === 'reset'" />
</template>

<style scoped lang="scss">
    @import '../index.scss';
</style>
