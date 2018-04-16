<template>
  <div id="app">
    <!--<transition name="fade" mode="out-in" :duration="500">-->
    <router-view/>
    <!--</transition>-->
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration-line: underline;
  }

  a:hover {
    color: burlywood;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
</style>
