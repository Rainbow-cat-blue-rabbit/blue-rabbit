<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
<!--    缓存-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style lang="stylus">
  @import '~common/stylus/variable.styl'
</style>
