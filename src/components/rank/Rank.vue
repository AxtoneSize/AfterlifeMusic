<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="topList">
      <ul>
        <li class="item" v-for="(item, index) in topList" :key="index" @click="selectItem(item)">
          <div class="icon">
            <img width="100%" height="100%" v-lazy="item.coverImgUrl">
          </div>
          <ul class="songlist">
            <li class="song">
              <span>{{ item.description }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getTopList } from 'network/rank'
import { playListMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
import Loading from 'components/common/loading/Loading'

export default {
  mixins: [playListMixin],
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.topList.refresh()
    },
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    _getTopList() {
      getTopList().then(res => {
        if(res.code === 200) {
          this.topList = res.list
        }
      })
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  },
}
</script>

<style scoped>
.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
.rank .toplist {
  height: 100%;
  overflow: hidden;
}
.rank .toplist .item {
  display: flex;
  margin: 0 20px;
  padding-top: 20px;
  height: 100px;
}
.rank .toplist .item:last-child {
  padding-bottom: 20px;
}
.rank .toplist .item .icon {
  flex: 0 0 100px;
  width: 100px;
  height: 100px;
}
.rank .toplist .item .songlist {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
  height: 100px;
  overflow: hidden;
  background: #333;
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
}
.rank .toplist .item .songlist .song {
  line-height: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.rank .toplist .loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>