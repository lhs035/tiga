import Vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import settings from '@/settings'

// 你可以看  settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

// 判断是否显示
function checkNeed() {
  const env = process.env.NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

// 如果需要显示
if (checkNeed()) {
  Vue.config.errorHandler = function(err, vm, info, a) {
    // Don't ask me why I use Vue.nextTick, it just a hack.
    // 别问我为什么用Vue.nextTick，这只是一个hack
    // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      })
      console.error(err, info)
    })
  }
}
