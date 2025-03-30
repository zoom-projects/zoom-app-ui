import type { App } from 'vue'

import hljsVuePlugin from '@highlightjs/vue-plugin'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import nginx from 'highlight.js/lib/languages/nginx'
import 'highlight.js/styles/stackoverflow-light.css'

export function setupHighlightJs(app: App<Element>) {
  hljs.registerLanguage('javascript', javascript)
  hljs.registerLanguage('nginx', nginx)

  app.use(hljsVuePlugin)
}
