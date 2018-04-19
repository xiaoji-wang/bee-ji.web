export default {
  install(Vue, options) {
    Vue.prototype.$IMAGE_URL = 'http://www.bee-ji.com:8000/image'
    Vue.prototype.$SERVER_URL = 'http://192.168.22.104:9000'
  }
}
