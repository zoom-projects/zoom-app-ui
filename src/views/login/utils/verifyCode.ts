import type { FormInstance, FormItemProp } from 'element-plus'
import { getCaptchaCode } from '/src/api/modules/login'
import { clone } from '/src/utils'

const isDisabled = ref(false)
const timer = ref<any>(null)
const text = ref('')

export function useVerifyCode() {
  const start = async (
    formEl: FormInstance | undefined,
    props: FormItemProp,
    account: string,
    type: 'login' | 'register',
    time = 60,
  ) => {
    if (!formEl)
      return
    const initTime = clone(time, true)

    await formEl.validateField(props, async (isValid) => {
      if (isValid) {
        let _type: string = type
        if (type === 'login') {
          // 如果是登录，需要判断是手机号还是邮箱
          _type = account.includes('@') ? 'email' : 'phone'
        }
        const { success } = await getCaptchaCode(_type, account)
        if (success) {
          clearInterval(timer.value)
          isDisabled.value = true
          text.value = `${time}`
          timer.value = setInterval(() => {
            if (time > 0) {
              time -= 1
              text.value = `${time}`
            }
            else {
              text.value = ''
              isDisabled.value = false
              clearInterval(timer.value)
              time = initTime
            }
          }, 1000)
        }
      }
    })
  }
  const end = () => {
    text.value = ''
    isDisabled.value = false
    clearInterval(timer.value)
  }
  return {
    isDisabled,
    timer,
    text,
    start,
    end,
  }
}
