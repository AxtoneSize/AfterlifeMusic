<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSongList } from 'network/recommend'
import { createSong } from 'common/js/song'

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
      return this.disc.title
    },
    bgImage() {
      return this.disc.img
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if(!this.disc.id) {
        this.$router.push({
          path: '/recommend'
        })
        return
      }
      getSongList(this.disc.id).then(res => {
        if (res.code === 200) {
          this.songs = this._normalizeSongs(res.playlist.tracks)
        }
      })
    },
    _normalizeSongs(list) {
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

</style>