import 'babel-polyfill' // 编译es6不能识别的，如promise
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick' // 解决3毫秒延迟
import 'common/stylus/index.styl'
import axios from 'axios'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$axios = axios
Vue.use(ElementUI)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (to.meta.requiresAuth && !localStorage.getItem('Authorization')) {
      // 下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
      next('/login')
    } else {
      // 如果不需要登录验证，或者已经登录成功，则直接放行
      next()
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
