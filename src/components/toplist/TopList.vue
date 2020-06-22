<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMusicList} from 'network/rank'
import { createSong } from 'common/js/song'

import MusicList from 'components/musiclist/MusicList'

export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    title() {
      return this.topList.name
    },
    bgImage() {
      if(this.songs.length) {
        return this.songs[0].image
      }
    },
    ...mapGetters([
      'topList'
    ])
  },
  created() {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      if(!this.topList.id) {
        this.$router.push({
          path: '/rank'
        })
        return
      }
      getMusicList(this.topList.id).then(res => {
        if(res.code === 200) {
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