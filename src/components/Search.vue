<template>
  <div style="padding-top: 80px;">
    <div class="nav">
      <router-link :to="{path:'/'}" style="display: inline-block;vertical-align: middle;">
        <img src="../assets/logo_gray.png"
             style="border: solid 2px #333;border-radius: 60px;padding: 5px;width: 30px;"/>
      </router-link>
      <input v-model="queryString"/>
      <i class="fa fa-search" style="position: relative;left: -30px;cursor: pointer;font-size: 18px;color: #999;"
         @click="search"></i>
    </div>
    <div>
      <a v-for="image in rows" :href="imgUrl(image)" target="_blank" :style="imgStyle(image)">
        <img :src="imgUrl(image)" :alt="image.desc" style="width: 100%;"/>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
        queryString: '',
        rows: []
      }
    },
    mounted() {
      let params = this.$route.query
      if (!params.w) {
        this.$router.push({path: '/'})
        return
      }
      this.queryString = params.w
      this.axios.get(this.$SERVER_URL + '/s', {params: params}).then((response) => {
        let arr = response.data
        this.fillImage(arr.slice(0, 50))
      }).catch(function (error) {
        console.log(error)
      })
      document.body.style.overflowY = 'scroll'
    },
    computed: {
      defaultHeight() {
        return 180
      }
    },
    methods: {
      search() {
        console.log('search')
      },
      imgUrl(image) {
        return this.$SERVER_URL + '/image/' + image.id
      },
      imgStyle(image) {
        return {
          width: image.width - 6 + 'px',
          height: image.height + 'px',
          display: 'inline-block',
          padding: '0 3px'
        }
      },
      fillImage(arr) {
        let clientWidth = document.body.clientWidth
        let totalWidth = 0
        let images = []
        for (let i = 0; i < arr.length; i++) {
          let w = arr[i].width * this.defaultHeight / arr[i].height
          if (totalWidth + w > clientWidth) {
            let h = clientWidth * this.defaultHeight / totalWidth
            images.forEach((im) => {
              im.width = Math.floor(im.width / im.height * h)
              im.height = Math.floor(h)
              this.rows.push(JSON.parse(JSON.stringify(im)))
            })
            totalWidth = 0
            images = []
          } else {
            images.push({
              id: arr[i].id, desc: arr[i].desc, width: arr[i].width, height: arr[i].height
            })
            totalWidth += w
          }
        }
      }
    }
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

  .nav input {
    font-size: 20px;
    padding: 5px;
    vertical-align: middle;
    outline: none;
    border: none;
    width: 400px;
    border-bottom: solid 2px #999;
  }
</style>
