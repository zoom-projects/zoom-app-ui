<script setup lang="ts">
import { useUserStore } from '@/store'
import { LoginType } from '@/utils/enums'
import { useVerifyCode } from '@/utils/verifyCode'
import { ElForm } from 'element-plus'
import Motion from '../utils/motion'

const { isDisabled, text } = useVerifyCode()
const userStore = useUserStore()
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()

const updateRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  verifyCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  repeatPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
})

const ruleForm = reactive<any>({
  username: '',
  phone: '',
  verifyCode: '',
  password: '',
  repeatPassword: '',
  readAccept: false,
})

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
      <ElFormItem prop="username">
        <ElInput
          v-model="ruleForm.username"
          placeholder="请输入用户名"
          clearable
        >
          <template #prefix>
            <ReIcon icon="svg-icon:user" class="el-icon" />
          </template>
        </ElInput>
      </ElFormItem>
    </Motion>
    <Motion :delay="100">
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
    <Motion :delay="150">
      <ElFormItem prop="verifyCode">
        <div class="w-full flex justify-between">
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
            class="ml-2"
            :disabled="isDisabled"
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
    <Motion :delay="200">
      <ElFormItem prop="password">
        <ElInput
          v-model="ruleForm.password"
          type="password"
          placeholder="请输入密码"
          clearable
        >
          <template #prefix>
            <ReIcon icon="svg-icon:lock" class="el-icon" />
          </template>
        </ElInput>
      </ElFormItem>
    </Motion>
    <Motion :delay="250">
      <ElFormItem prop="repeatPassword">
        <ElInput
          v-model="ruleForm.repeatPassword"
          type="password"
          placeholder="请再次输入密码"
          clearable
        >
          <template #prefix>
            <ReIcon icon="svg-icon:lock" class="el-icon" />
          </template>
        </ElInput>
      </ElFormItem>
    </Motion>
    <Motion :delay="300">
      <ElFormItem>
        <ElCheckbox v-model="ruleForm.readAccept">
          我已阅读并同意
        </ElCheckbox>
        <ElButton link type="primary">
          <a href="#">《用户协议》</a>
        </ElButton>
      </ElFormItem>
    </Motion>
    <Motion :delay="350">
      <ElFormItem>
        <ElButton class="w-full" type="primary">
          注册并登录
        </ElButton>
      </ElFormItem>
    </Motion>

    <Motion :delay="400">
      <ElFormItem>
        <ElButton class="w-full" size="default" @click="onBack">
          返回
        </ElButton>
      </ElFormItem>
    </Motion>
  </ElForm>
</template>
