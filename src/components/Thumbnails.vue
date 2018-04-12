<template>
  <div>
    <div class="column">
      <a :href="img.url" v-for="img in image">
        <img :src="img.url"/>
      </a>
    </div>
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
        image: []
      }
    },
    methods: {
      loadImage() {
        let url = '../static/data.json'
        this.axios.get(url).then((response) => {
          response.data.forEach((item, index) => {
            let img = {url: 'http://www.bee-ji.com:8000/image/' + item.id}
            this.image.push(img)
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
