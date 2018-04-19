import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueScroll from 'vue-scroll'
import 'font-awesome/css/font-awesome.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import config from './config'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(vueScroll, {throttle: 600})
Vue.use(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
