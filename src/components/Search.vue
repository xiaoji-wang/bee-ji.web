<template>
  <div style="height: 100%;">
    <div class="nav" @keyup.enter="searchButtonEvent">
      <router-link :to="{path:'/'}" style="display: inline-block;vertical-align: middle;">
        <img src="../assets/logo_gray.png"
             style="border: solid 2px #333;border-radius: 60px;padding: 5px;width: 30px;"/>
      </router-link>
      <input v-model.trim="searchWord"/>
      <i class="fa fa-search" style="position: relative;left: -30px;cursor: pointer;font-size: 18px;color: #999;"
         @click="searchButtonEvent"></i>
    </div>
    <div id="container" class="container" v-scroll="autoLoad">
      <div v-for="image in items" class="item">
        <a :href="image.src + '.html'" target="_blank" :style="imgStyle(image)">
          <img :src="image.src" :alt="image.desc"/>
        </a>
        <div class="desc animated">
          <span>
            {{image.width}}×{{image.height}}
          </span>
        </div>
      </div>
      <div class="load" v-if="hasMove">
        <div class="loader"></div>
        <div>Loading...</div>
      </div>
      <div class="foot" v-if="!hasMove">
      </div>
    </div>
  </div>
</template>

<script>
  const blank = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg'
  export default {
    name: 'search',
    data() {
      return {
        imageIndex: 0,
        imageArray: [],
        searchWord: '',
        items: []
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
    },
    computed: {
      defaultHeight() {
        return 180
      },
      clientWidth() {
        return document.getElementById('container').clientWidth
      },
      clientHeight() {
        return document.getElementById('container').clientHeight
      },
      hasMove() {
        return this.imageIndex < this.imageArray.length
      }
    },
    methods: {
      searchButtonEvent() {
        if (this.searchWord.trim().length > 0) {
          this.$router.push({path: '/s', query: {w: this.searchWord}})
          this.searchImage({w: this.searchWord})
        }
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
          this.imageArray = response.data
          this.fillImage()
        }).catch(function (error) {
          console.log(error)
        })
      },
      fillImage() {
        let totalWidth = 0
        let totalHeight = 0
        let images = []
        for (let i = this.imageIndex; i < this.imageArray.length; i++) {
          let image = this.imageArray[i]
          if (totalHeight > this.clientHeight) {
            break
          }
          let w = image.width * this.defaultHeight / image.height
          if (totalWidth + w > this.clientWidth) {
            let h = this.clientWidth * this.defaultHeight / totalWidth
            images.forEach((im) => {
              im.width = Math.floor(im.width / im.height * h)
              im.height = Math.floor(h)
              this.items.push(JSON.parse(JSON.stringify(im)))
            })
            totalWidth = 0
            totalHeight += h
            images = []
          } else {
            images.push(this.createImage(image))
            totalWidth += w
          }
        }
        images.forEach((im) => {
          im.width = Math.floor(im.width / im.height * 180)
          im.height = 180
          this.items.push(JSON.parse(JSON.stringify(im)))
        })
        this.$nextTick(() => {
          for (let i = this.imageIndex; i < this.items.length; i++, this.imageIndex++) {
            this.items[i].src = this.items[i].lazyLoad
          }
        })
      },
      createImage(im) {
        return {
          id: im.id,
          width: im.width,
          height: im.height,
          desc: im.desc,
          lazyLoad: this.$IMAGE_URL + '/' + im.id,
          src: blank
        }
      },
      autoLoad(e, position) {
        if (this.hasMove && document.getElementById('container').scrollHeight - (position.scrollTop + this.clientHeight) < 200) {
          this.fillImage()
        }
      }
    }
  }
</script>

<style scoped>
  .nav {
    background: white;
    padding: 5px;
    border-bottom: solid 1px #ccc;
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
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
  }

  .container .item {
    display: inline-block;
    position: relative;
    margin: 5px;
    overflow: hidden;
    box-shadow: 2px 2px 4px #ccc;
  }

  .container .item a {
    display: block;
    vertical-align: bottom;
  }

  .container .item img {
    width: 100%;
    height: 100%;
  }

  .container .item .desc {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
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

  .load {
    padding: 5px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .load .loader {
    margin-right: 20px;
    font-size: 10px;
    position: relative;
    border: 5px solid rgba(255, 255, 255, 0.2);
    border-left-color: #ffffff;
    -webkit-animation: load 1.1s infinite linear;
    animation: load 1.1s infinite linear;
  }

  .load .loader, .load .loader:after {
    border-radius: 50%;
    width: 48px;
    height: 48px;
  }

  @-webkit-keyframes load {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .foot {
    height: 64px;
    border-top: solid 1px #ccc;
  }
</style>
