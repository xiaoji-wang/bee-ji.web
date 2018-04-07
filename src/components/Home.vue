<template>
  <div style="height: 100%;background: url('../../static/bg2.png') center;" @keyup.enter="search">
    <ul style="display: flex;justify-content: flex-end;background: rgba(0,0,0,0.8)">
      <li>
        <i class="fa fa-user-circle" style="color: #ccc"></i>
        <a href="javascript:void(0)" style="color: #ccc">登录</a>
      </li>
    </ul>
    <div class="logo">
      <img src="../assets/logo_gray.png" class="animated bounceIn"/>
    </div>
    <div class="search">
      <h1>{{hello}}逗比拯救世界</h1>
      <div style="position: relative;">
        <input v-model.trim="searchWord" title="search"/>
        <i class="fa fa-search" style="position: absolute;top:16px;right: 0;cursor: pointer;font-size: 18px;"
           @click="search"></i>
        <transition name="fade" :duration="300">
          <i class="fa fa-close" style="position: absolute;top:16px;right: -40px;cursor: pointer;font-size: 18px;"
             v-show="isShowClear"
             @click="search"></i>
        </transition>
      </div>
    </div>
    <p style="position: fixed;bottom: 0;text-align: center;width: 100%;padding: 5px;">滇ICP备15001190号-1</p>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        searchWord: ''
      }
    },
    computed: {
      hello() {
        let hour = new Date().getHours()
        if (hour >= 0 && hour <= 5) {
          return '凌晨了，'
        } else if (hour > 5 && hour <= 11) {
          return '早上好，'
        } else if (hour > 11 && hour <= 13) {
          return '中午好，'
        } else if (hour > 13 && hour <= 17) {
          return '下午好，'
        } else if (hour > 17 && hour <= 19) {
          return '傍晚了，'
        } else if (hour > 19 && hour <= 24) {
          return '晚上好，'
        }
        return ''
      },
      isShowClear(){
        return this.searchWord.trim().length > 0
      }
    },
    methods: {
      search(){
        if (this.isShowClear) {
          this.$router.push({path: '/search', query: {w: this.searchWord}})
        }
      }
    }
  }
</script>

<style scoped>
  li {
    padding: 8px;
    display: inline-block;
  }

  .logo {
    text-align: center;
    margin-top: 150px;
  }

  .logo img {
    border: solid 4px #333;
    border-radius: 100px;
    padding: 10px;
  }

  .search {
    width: 600px;
    margin: 50px auto 100px;
  }

  h1 {
    font-weight: normal;
    text-align: center;
  }

  input {
    border: none;
    border-bottom: solid 2px #333;
    outline: none;
    padding: 8px;
    font-size: 24px;
    width: 100%;
    background: none;
  }

  @media screen and (max-width: 640px) {

    h1 {
      font-size: 22px;
    }

    .logo {
      text-align: center;
      margin-top: 50px;
    }

    .logo img {
      border: solid 4px #333;
      width: 60px;
    }

    .search {
      width: 70%;
      margin: 50px auto 100px;
    }
  }
</style>
