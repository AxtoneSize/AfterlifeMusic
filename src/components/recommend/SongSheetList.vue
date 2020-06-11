<template>
  <div class="song-sheet-list">
    <ul class="song-sheet">
      <li 
        class="song-sheet-item"
        v-for="item of hotSong"
        :key="item.id"
      >
      <img :src="item.img" width="60">
      <div class="song-sheet-item-info right d-flex flex-wrap pl-3 ai-center">
        <span class="title">
          {{ item.title }}
        </span>
        <span class="info" style="color:rgba(255, 255, 255, 0.3)">
          {{ item.title }}
        </span>
      </div>
      </li>
    </ul>   
  </div>
</template>

<script>
export default {
  props: {
    hotSong: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.song-sheet {
  padding-top: 1.5rem
}
.song-sheet-item {
  display: flex;
  padding-bottom: 4px;
}
.song-sheet-item-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.title {
  color: #fff;
}
</style>