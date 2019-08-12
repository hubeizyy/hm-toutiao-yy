import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from '@/router'
import '@/style/index.less'
import axios from 'axios'
// 挂在vue原型上，每个组件都是vue构造函数的实例，都可以用到vue构造函数的原型
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
