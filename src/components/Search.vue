<template>
  <div style="padding-top: 80px;">
    <div class="nav">
      <router-link :to="{path:'/'}" style="display: inline-block;vertical-align: middle;">
        <img src="../assets/logo_gray.png" style="border: solid 2px #333;border-radius: 60px;padding: 5px;width: 30px;"/>
      </router-link>
      <input/>
      <i class="fa fa-search" style="position: relative;left: -30px;cursor: pointer;font-size: 18px;color: #999;"
         @click="search"></i>
    </div>
    <thumbnails ref="thumbnails"/>
  </div>
</template>

<script>
  import Thumbnails from './Thumbnails'

  export default {
    name: 'search',
    components: {
      thumbnails: Thumbnails
    },
  }
</script>

<style scoped>
  .nav {
    background: white;
    top: 0;
    width: 100%;
    position: fixed;
    padding: 5px;
    border-bottom: solid 1px #ccc;
    box-shadow: 0 1px 10px #ccc;
  }

  .nav input{
    font-size: 20px;
    padding: 5px;
    vertical-align: middle;
    outline: none;
    border: none;
    width: 400px;
    border-bottom: solid 2px #999;
  }
</style>
