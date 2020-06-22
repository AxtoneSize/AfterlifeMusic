<template>
  <div class="recommend" ref="recommend">
    <Scroll ref="scroll" class="recommend-content" :data="discList">
      <div class="recommend-list">
        <my-swiper 
          @loadImage="loadImage"
          :swiper-list="swiperList"
          :swiper-option="swiperOption"
        />  
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li @click="selectItem(item)" v-for="(item, index) in discList" :key="index" class="item">
            <div class="icon">
              <img v-lazy="item.img" width="60" height="60">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.title"></h2>
              <ul class="tag">
                <li v-for="tag in item.tags" :key="tag">
                  |{{ tag }}|
                </li>
              </ul>
            </div>
          </li>    
        </ul>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
      </div>
    </Scroll>  
    <router-view></router-view>
  </div>
</template>


<script>
import { getRecommend, getDiscList } from 'network/recommend'
import { playListMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'
 
import Scroll from 'components/common/scroll/Scroll'
import MySwiper from 'components/common/swiper/MySwiper'
import Loading from 'components/common/loading/Loading'
import SongSheetList from 'components/recommend/SongSheetList'

export default {
  mixins: [playListMixin],
  components: {
    Scroll,
    MySwiper,
    Loading,
    SongSheetList
  },
  data() {
    return {
       swiperList: [],
       swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: true
      },
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : 0
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    loadImage() {
      this.$refs.scroll.refresh()
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      }),
      this.setDisc(item)
    },
    _getRecommend() {
      getRecommend().then( res => {
        if(res.code === 200)
        {
          this.swiperList = res.banners.map(item => ({
            pic: item.pic,
            url: item.url
          }))
        }
      })
    },
    _getDiscList() {
      getDiscList().then( res => {
        if(res.code === 200)
        {
          this.discList = res.playlists.map(item => ({
            id: item.id,
            img: item.coverImgUrl,
            title: item.name,
            tags: item.tags
          }))
        }
      }) 
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
}
</script>


<style scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
.recommend-content {
  height: 100%;
  overflow: hidden;
}
.recommend-list .list-title {
  height: 65px;
  line-height: 65px;
  text-align: center;
  font-size: 14px;
  color: #ffcd32;
}
.recommend-list .item {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 0 20px 20px 20px;
}
.recommend-list .item .icon {
  flex: 0 0 60px;
  width: 60px;
  padding-right: 20px;
}
.recommend-list .item .text {
  display: flex;
  flex-direction: column;/**纵向排列*/
  justify-content: center;/**垂直居中*/
  flex: 1;
  line-height: 20px;
  overflow: hidden;
  font-size: 14px;
}
.recommend-list .item .text .name {
  margin-bottom: 10px;
  color: #fff;
}
.recommend-list .item .text .tag{
  display: flex;
  color: rgba(255, 255, 255, 0.3)
}  
.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>