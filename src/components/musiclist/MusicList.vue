<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back" @click="back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length" ref="playBtn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { prefixStyle } from 'common/js/dom'
import { mapActions } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
import SongList from 'components/common/songlist/SongList'
import Loading from 'components/common/loading/Loading'

const RESERVE_HEIGHT = 40
const transform = prefixStyle('transform')

export default {
  components: {
    Scroll,
    SongList,
    Loading
  },
  props: {
    bgImage: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    }
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVE_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      })
    },
    random() {
      this.randomPlay({
        list: this.songs
      })
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY)
      let zIndex = 0
      let scale = 1
      let blur = 0
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)` 
      //计算向下拉德过程中，图片需要放大的比例，实现无缝
      const percent = Math.abs(newY/this.imageHeight)
      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      } 
      if (newY < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVE_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
        // blur = Math.min(20 * percent, 20)
      }
      this.$refs.bgImage.style.zIndex = zIndex
      // this.$refs.bgImage.style['filter'] = `blur(${blur}px)`
      this.$refs.bgImage.style[transform] = `scale(${scale})` 
    }
  },
};
</script>

<style scoped>
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #222;
}
.back {
  position: absolute;
  top: 0;
  left: 6px;
  z-index: 50;
}
.icon-back {
  display: block;
  padding: 10px;
  font-size: 22px;
  color: #ffcd32;
}
.title {
  position: absolute;
  top: 0;
  left: 10%;
  z-index: 40;
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  color: #fff;
}
.bg-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 70%;
  transform-origin: top; /*从顶部放大缩小关键*/
  background-size: cover;
}
.song-list-wrapper {
  padding: 20px 30px;
}
.list {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #222;
}
.bg-layer {
  position: relative;
  height: 100%;
  background: #222;
}
.play-wrapper {
  position: absolute;
  bottom: 20px;
  z-index: 50;
  width: 100%;
}
.play {
  box-sizing: border-box;
  width: 135px;
  padding: 7px 0;
  margin: 0 auto;
  text-align: center;
  border: 1px solid #ffcd32;
  color: #ffcd32;
  border-radius: 100px;
  font-size: 0;
}
.icon-play {
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  font-size: 16px;
}
.text {
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
}
.bg-layer {
  position: relative;
  height: 100%;
  background: #222;
}
.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
