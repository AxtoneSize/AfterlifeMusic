/**
 * mixin: 一个对象，Vue的混合机制，提高组件内容的复用性
 */
import { mapGetters } from 'vuex'

export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  methods: {
    handlePlayList() {
      throw new Error('component must implement handlePlayList method')
    }
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() { //<keep-alive>组件切换过来时会触发activated
    this.handlePlayList(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal)
    }
  },
}
