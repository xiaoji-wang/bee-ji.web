<template>
  <div>
    <ul style="display: flex;justify-content: flex-end;background: rgba(0,0,0,0.3)">
      <li>
        <a href="javascript:void(0)">
          <i class="fa fa-user-circle">&nbsp;登录/注册&nbsp;</i>
        </a>
      </li>
    </ul>
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <div class="nav" v-show="navShow">
        <img src="../assets/logo.png" style="border: solid 2px #ccc;border-radius: 60px;padding: 5px;width: 30px;"/>
      </div>
    </transition>
    <div style="text-align: center;margin-top: 50px;">
      <img src="../assets/logo.png" style="border: solid 4px #ccc;border-radius: 60px;padding: 10px;"/>
    </div>
    <div class="search">
      <h1>{{ hello }}</h1>
      <input v-model="searchWord" title="search"/>
    </div>
    <thumbnails ref="thumbnails"/>
    <b></b>
  </div>
</template>

<script>
  import Thumbnails from './Thumbnails'

  export default {
    name: 'home',
    components: {
      thumbnails: Thumbnails
    },
    mounted() {
      window.addEventListener('scroll', this.scrollEvent)
    },
    data() {
      return {
        searchWord: '',
        navShow: false
      }
    },
    computed: {
      hello() {
        let hour = new Date().getHours()
        if (hour > 0 && hour <= 5) {
          return '凌晨您想搜索点什么？'
        } else if (hour > 5 && hour <= 11) {
          return '早上好，您想搜索点什么？'
        } else if (hour > 11 && hour <= 13) {
          return '中午好，您想搜索点什么？'
        } else if (hour > 13 && hour <= 17) {
          return '下午好，您想搜索点什么？'
        } else if (hour > 17 && hour <= 19) {
          return '傍晚了，您想搜索点什么？'
        } else if (hour > 19 && hour <= 24) {
          return '晚上好，您想搜索点什么？'
        }
        return '逗比拯救世界！'
      }
    },
    methods: {
      scrollEvent() {
        let scrollTop = document.documentElement.scrollTop
        let clientHeight = document.documentElement.clientHeight
        let scrollHeight = document.documentElement.scrollHeight
        if (scrollTop >= 400 && (!this.navShow)) {
          this.navShow = true
        } else if (scrollTop < 400 && (this.navShow)) {
          this.navShow = false
        }
        if (scrollHeight - scrollTop - clientHeight < 100) {
          this.$refs.thumbnails.loadImage()
        }
      }
    }
  }
</script>

<style scoped>
  li {
    padding: 5px;
    display: inline-block;
  }

  .nav {
    background: #141414;
    top: 0;
    height: 45px;
    width: 100%;
    position: fixed;
    padding: 5px;
    box-shadow: 0 3px 10px #333;
  }

  .search {
    width: 600px;
    margin: 50px auto 100px;
  }

  h1 {
    font-weight: lighter;
    text-align: center;
  }

  input {
    border: none;
    border-bottom: solid 2px #e0e0e0;
    outline: none;
    padding: 8px;
    font-size: 24px;
    width: 100%;
    background: none;
  }

  b {
    background: url('../../static/bg.jpg') center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
</style>
