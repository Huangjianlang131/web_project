import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./config/antDesignVueConfig.js"
//全局css样式
import './assets/css/global.scss'
import 'ant-design-vue/dist/antd.less'
import axios from 'axios'


Vue.config.productionTip = false
Vue.prototype.$axios = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
