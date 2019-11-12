import 'babel-polyfill' // 编译es6不能识别的，如promise
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick' // 解决3毫秒延迟
import 'common/stylus/index.styl'

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
