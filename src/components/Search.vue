<template>
  <div style="padding-top: 80px;">
    <div class="nav" @keyup.enter="search">
      <router-link :to="{path:'/'}" style="display: inline-block;vertical-align: middle;">
        <img src="../assets/logo_gray.png"
             style="border: solid 2px #333;border-radius: 60px;padding: 5px;width: 30px;"/>
      </router-link>
      <input v-model.trim="searchWord"/>
      <i class="fa fa-search" style="position: relative;left: -30px;cursor: pointer;font-size: 18px;color: #999;"
         @click="search"></i>
    </div>
    <div class="container">
      <div v-for="image in rows" class="item">
        <a :href="imgUrl(image)" target="_blank" :style="imgStyle(image)">
          <img :src="imgUrl(image)" :alt="image.desc"/>
        </a>
        <div class="desc animated">
          <span>
            {{image.width}}×{{image.height}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
        searchWord: '',
        rows: []
      }
    },
    mounted() {
      let params = this.$route.query
      if (!params.w) {
        this.$router.push({path: '/'})
        return
      }
      this.searchWord = params.w
      this.searchImage(params)
      document.body.style.overflowY = 'scroll'
    },
    computed: {
      defaultHeight() {
        return 180
      }
    },
    methods: {
      search() {
        if (this.searchWord.trim().length > 0) {
          this.$router.push({path: '/s', query: {w: this.searchWord}})
          this.searchImage({w: this.searchWord})
        }
      },
      imgUrl(image) {
        return this.$SERVER_URL + '/image/' + image.id
      },
      imgStyle(image) {
        return {
          width: image.width - 10 + 'px',
          height: image.height + 'px'
        }
      },
      searchImage(params) {
        this.rows = []
        this.axios.get(this.$SERVER_URL + '/s', {params: params}).then((response) => {
          let arr = response.data
          this.fillImage(arr.slice(0, 50))
        }).catch(function (error) {
          console.log(error)
        })
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

  .container {
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
  }

  .container .item {
    display: inline-block;
    position: relative;
    padding: 5px 5px 0 5px;
    overflow: hidden;
  }

  .container .item a {
    display: block;
    vertical-align: bottom;
  }

  .container .item img {
    width: 100%;
  }

  .container .item .desc {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 0;
    left: 3px;
    right: 3px;
    padding: 10px;
    visibility: hidden;
    font-size: 14px;
    color: #ccc;
  }

  .container .item:hover .desc {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-name: slideInUp;
    visibility: visible;
  }

  .container .item .desc span {
    align-self: flex-start;
  }
</style>
