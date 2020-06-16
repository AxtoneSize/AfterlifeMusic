<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { createSong } from 'common/js/song'
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'network/singer'

import MusicList from 'components/musiclist/MusicList'
export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {

    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if(!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if(res.code === 200) {
          this.songs = this._normalizeSong(res.hotSongs)
        }
      })
    },
    _normalizeSong(list) {
      let ret = []
      list.forEach(item => {
        if(item.al.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    } 
  },
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);/*100% 完全移动到屏幕右侧 动画开始后向左滑入*/
}
</style>