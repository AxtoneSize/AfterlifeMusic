<template>
  <div class="singer" ref="singer">
    <list-view 
      ref="list"
      @select="selectSinger"
      :data="singers"/>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import VPingYin from 'common/js/vue-py.js'
import { getSingerList } from 'network/singer'
import { playListMixin } from 'common/js/mixin'
 
import ListView from 'components/common/listview/ListView'

import SingerDetail from 'components/singerdetail/SingerDetail'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  mixins: [playListMixin],
  components: {
    ListView,
    
    SingerDetail
  },
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : 0
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    // 网络请求相关方法
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === 200) {
          this.singers = this._normalizeSinger(res.list.artists)
        }
      })
    },

    //元素触发的相关事件
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },

    // 处理相关数据的方法
    _normalizeSinger(list) {
      let map = {
        hot: {
          title : HOT_NAME,
          item: []
        }
      }
      list.forEach((item,index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.item.push({
            id: item.id,
            name: item.name,
            avatar: item.picUrl
          })
        }
        const key = VPingYin.chineseToPinYin(item.name)
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          }
        }
        map[key].item.push({
          id: item.id,
          name: item.name,
          avatar: item.picUrl 
        })
      })
      // 为了得到有序列表，需要处理map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },

    // vuex
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
}
</script>

<style scoped>
.singer{
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>