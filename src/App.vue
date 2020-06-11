<template>
  <div id="app">
    <Header />
    <Tab />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from 'components/header/Header'
import Tab from 'components/tab/Tab'
export default {
  components: {
    Header,
    Tab
  }
}
</script>

<style lang="stylus">
  @import '~common/stylus/variable'
  #app
    color: $color-theme
</style>
