import 'babel-polyfill' // 编译es6不能识别的，如promise
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App'
import fastclick from 'fastclick' // 解决3毫秒延迟
import 'common/stylus/index.styl'
import router from './router'
Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
