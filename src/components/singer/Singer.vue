<template>
  <div class="singer">
    <list-view :data="singers"/>
  </div>
</template>

<script>
import VPingYin from 'common/js/vue-py.js'
import { getSingerList } from 'network/singer'

import ListView from 'components/common/listview/ListView'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  components: {
    ListView
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
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === 200) {
          this.singers = this._normalizeSinger(res.list.artists)
        }
      })
    },
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
    }
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