<template>
  <div id="app">
    <Header />
    <Tab />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player />
  </div>
</template>

<script>
import Header from 'components/header/Header'
import Tab from 'components/tab/Tab'
import Player from 'components/player/Player'

export default {
  components: {
    Header,
    Tab,
    Player
  }
}
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  #app
    color: $color-theme
</style>
