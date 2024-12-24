<script setup lang="ts">
import { loginApiByCodeApi } from '@/api/modules/login'
import { useUserStore } from '@/store'
import { LoginType } from '@/utils/enums'
import { useVerifyCode } from '@/utils/verifyCode'
import { ElForm } from 'element-plus'
import Motion from '../utils/motion'

const { isDisabled, text } = useVerifyCode()
const userStore = useUserStore()
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const usernameRules = reactive({
  username: [{ required: true, message: '请输入手机号/邮箱', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})
const loading = ref(false)
const ruleForm = reactive<any>({
  username: '',
  code: '',
})

function formSubmit() {
  ruleFormRef.value?.validate(async (valid) => {
    if (!valid)
      return
    loading.value = true
    try {
      // // 1.执行登录接口
      const { data } = await loginApiByCodeApi({ ...ruleForm })
      userStore.setToken(data)
      // 2.执行登录后的操作
      await userStore.afterLogin()
    }
    finally {
      loading.value = false
    }
  })
}

function onBack() {
  userStore.loginType = LoginType.username
}
</script>

<template>
  <ElForm
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="usernameRules"
    size="large"
  >
    <Motion>
      <ElFormItem prop="username">
        <ElInput
          v-model="ruleForm.username"
          placeholder="手机号/邮箱"
        >
          <template #prefix>
            <ReIcon icon="svg-icon:iphone" class="el-icon" />
          </template>
        </ElInput>
      </ElFormItem>
    </Motion>
    <Motion :delay="100">
      <ElFormItem prop="code">
        <div class="flex justify-between">
          <ElInput
            v-model="ruleForm.code"
            placeholder="验证码"
            clearable
          >
            <template #prefix>
              <ReIcon icon="svg-icon:security-shield-fill" class="el-icon" />
            </template>
          </ElInput>
          <ElButton
            class="ml-2"
            :disabled="isDisabled"
            @click="useVerifyCode().start(ruleFormRef, 'mobile', ruleForm.username, 'login')"
          >
            {{ text.length > 0 ? `${text} 秒后重新获取` : '获取验证码' }}
          </ElButton>
        </div>
      </ElFormItem>
    </Motion>
    <Motion :delay="150">
      <ElFormItem>
        <ElButton
          class="w-full"
          size="default"
          type="primary"
          :loading="loading"
          @click="formSubmit"
        >
          登录
        </ElButton>
      </ElFormItem>
    </Motion>
    <Motion :delay="200">
      <ElFormItem>
        <ElButton
          class="w-full"
          size="default"
          @click="onBack"
        >
          返回
        </ElButton>
      </ElFormItem>
    </Motion>
  </ElForm>
</template>
