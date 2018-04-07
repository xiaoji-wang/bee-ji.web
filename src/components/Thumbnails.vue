<template>
  <div>
    <div class="column">
      <a :href="img.url" v-for="img in image0">
        <img :src="img.url"/>
      </a>
    </div>
    <!--<div class="column">-->
      <!--<a :href="img.url" v-for="img in image1">-->
        <!--<img :src="img.url"/>-->
      <!--</a>-->
    <!--</div>-->
    <!--<div class="column">-->
      <!--<a :href="img.url" v-for="img in image2">-->
        <!--<img :src="img.url"/>-->
      <!--</a>-->
    <!--</div>-->
    <!--<div class="column">-->
      <!--<a :href="img.url" v-for="img in image3">-->
        <!--<img :src="img.url"/>-->
      <!--</a>-->
    <!--</div>-->
    <!--<div class="column">-->
      <!--<a :href="img.url" v-for="img in image4">-->
        <!--<img :src="img.url"/>-->
      <!--</a>-->
    <!--</div>-->
    <!--<div class="column">-->
      <!--<a :href="img.url" v-for="img in image5">-->
        <!--<img :src="img.url"/>-->
      <!--</a>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'thumbnails',
    mounted() {
      this.loadImage()
    },
    data() {
      return {
        image0: [],
        image1: [],
        image2: [],
        image3: [],
        image4: [],
        image5: []
      }
    },
    methods: {
      loadImage() {
        let url = '../static/data.json'
        this.axios.get(url).then((response) => {
          response.data.data.forEach((item, index) => {
            let img = {url: 'http://www.bee-ji.com' + item.path + '/pic_url'}
//            if (index % 6 === 0) {
              this.image0.push(img)
//            } else if (index % 6 === 1) {
//              this.image1.push(img)
//            } else if (index % 6 === 2) {
//              this.image2.push(img)
//            } else if (index % 6 === 3) {
//              this.image3.push(img)
//            } else if (index % 6 === 4) {
//              this.image4.push(img)
//            } else if (index % 6 === 5) {
//              this.image5.push(img)
//            }
          })
        })
      }
    }
  }
</script>

<style scoped>
  .column {
    /*width: 166px;*/
    /*display: inline-block;*/
    /*vertical-align: top;*/
  }

  .column a {
    display: inline;
  }

  .column img {
    height: 160px;
    margin: 2px;
  }
</style>
