import type { App } from 'vue'

import router from '@/router'
import { setupStore } from '@/store'
import { MotionPlugin } from '@vueuse/motion'
import { setupContextmenu } from './contextmenu'
import { setupDirectives } from './directives'
import './ep'
import './unocss'
import './svg'
// 注册resume
import './resume'

export default {
  install(app: App<Element>) {
    // 注册指令
    setupDirectives(app)
    // Mount router
    app.use(router)
    // mount pinia store
    setupStore(app)
    // vueuse motion
    app.use(MotionPlugin)
    // 注册右键菜单
    setupContextmenu(app)
  },
}
