<template>
  <div class="swiper">
    <swiper
      v-if="swiperList.length"
      :options="swiperOption" 
    >
      <swiper-slide 
        v-for="(item, index) of swiperList" 
        :key="index"
      >
        <a :href="item.url">
          <img 
            style="width:100vw"
            :src="item.pic"
            @load="loadImage"
          >
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
 
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    swiperList: {
      type: Array,
      required: true
    },
    swiperOption: {
      type: Object,
      required: true
    }
  },
  methods: {
    loadImage() {
      if(!this.checkloaded) {
        this.$emit('loadImage')
        this.checkloaded = true
      }
    }
  },
}
</script>