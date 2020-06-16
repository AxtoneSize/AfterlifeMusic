<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" v-for="(song, index) in songs" :key="song.id" class="item">
        <div class="content">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ getDesc(song) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer} - ${song.album}`
    },
    selectItem(item, index) {
      this.$emit('select', item, index)
    }
  },
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 64px;
  font-size: 14px;
}
.rank {
  flex: 0 0 25px;
  width: 25px;
  margin-right: 30px;
  text-align: center;
}
.icon {
  display: inline-block;
  width: 25px;
  height: 24px;
  background-size: 25px 24px;
}
.text {
  color: #ffcd32;
  font-size: 18px;
}
.content {
  flex: 1;
  line-height: 20px;
  overflow: hidden;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #fff;
}
.desc {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.3);
}
</style>