<script setup lang="ts">
import { useUserStore } from '@/store'
import { LoginType } from '@/utils/enums'
import { useVerifyCode } from '@/utils/verifyCode'
import { ElForm } from 'element-plus'
import Motion from '../utils/motion'

type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()

const { isDisabled, text } = useVerifyCode()
const userStore = useUserStore()

const updateRules = reactive({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  verifyCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  repeatPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
})

const ruleForm = reactive<any>({
  phone: '',
  verifyCode: '',
  password: '',
  repeatPassword: '',
})

function onSubmit() {
}

function onBack() {
  userStore.loginType = LoginType.username
}
</script>

<template>
  <ElForm
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="updateRules"
    size="large"
  >
    <Motion>
      <ElFormItem prop="phone">
        <ElInput
          v-model="ruleForm.phone"
          placeholder="请输入手机号"
          clearable
        >
          <template #prefix>
            <ReIcon icon="svg-icon:iphone" class="el-icon" />
          </template>
        </ElInput>
      </ElFormItem>
    </Motion>
    <Motion :delay="100">
      <ElFormItem prop="verifyCode">
        <div class="flex justify-between">
          <ElInput
            v-model="ruleForm.verifyCode"
            placeholder="请输入验证码"
            clearable
          >
            <template #prefix>
              <ReIcon icon="svg-icon:security-shield-fill" class="el-icon" />
            </template>
          </ElInput>
          <ElButton
            :disabled="isDisabled"
            class="ml-2"
            @click="useVerifyCode().start(ruleFormRef, 'phone', ruleForm.phone, 'get')"
          >
            {{
              text.length > 0
                ? `${text} 秒后重新获取`
                : '获取验证码'
            }}
          </ElButton>
        </div>
      </ElFormItem>
    </Motion>
    <Motion :delay="150">
      <ElFormItem prop="password">
        <ElInput
          v-model="ruleForm.password"
          placeholder="请输入密码"
          clearable
          show-password
        >
          <template #prefix>
            <ReIcon icon="svg-icon:lock" class="el-icon" />
          </template>
        </ElInput>
      </ElFormItem>
    </Motion>
    <Motion :delay="200">
      <ElFormItem prop="repeatPassword">
        <ElInput
          v-model="ruleForm.repeatPassword"
          placeholder="请再次输入密码"
          clearable
          show-password
        >
          <template #prefix>
            <ReIcon icon="svg-icon:lock" class="el-icon" />
          </template>
        </ElInput>
      </ElFormItem>
    </Motion>
    <Motion :delay="250">
      <ElFormItem>
        <ElButton
          type="primary"
          class="w-full"
          @click="onSubmit"
        >
          重置密码
        </ElButton>
      </ElFormItem>
    </Motion>
    <Motion :delay="300">
      <ElFormItem>
        <ElButton class="w-full" size="default" @click="onBack">
          返回
        </ElButton>
      </ElFormItem>
    </Motion>
  </ElForm>
</template>
