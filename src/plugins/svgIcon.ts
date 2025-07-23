import type { App } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'

const componentPlugin = {
  install: function (vue: App) {
    vue.component(SvgIcon.name || 'SvgIcon', SvgIcon)
  }
}
export default componentPlugin
