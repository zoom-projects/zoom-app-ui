import * as socialApi from '@/api/modules/system/social'

/**
 *  社交账号绑定
 * @returns
 */
export function useSocialHook() {
  async function bindSocial(source: string) {
    const { success, data } = await socialApi.authBindSocial(source)
    if (success) {
      window.location.href = data
    }
  }
  return {
    bindSocial,
  }
}
