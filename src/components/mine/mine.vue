<!--
 * @Author: JaneChelle
 * @Date: 2019-10-24 15:55:29
 * @LastEditTime: 2021-04-15 11:05:47
 * @Description:
-->
<template>
<transition name="slide">
  <div class="mine">
    <div class="mine-box-wrapper">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="heading">收藏</h1>
    </div>
    <scroll :data="songs" @scroll="scroll" ref="list" class="list"
              :listen-scroll="listenScroll"
              :probe-type="probeType">
        <div class="song-list-wrapper">
          <song-list @select="selectItem" :songs="songs"></song-list>
        </div>
        <div v-show="!songs.length" class="loading-container">
          <!-- <loading></loading> -->
          <img src="../../assets/null.png" alt="" class="img-null">
        </div>
    </scroll>
    <router-view></router-view>
  </div>
</transition>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import Loading from 'base/loading/loading'
  import {mapActions} from 'vuex'
  export default {
    name: 'mine',
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    data () {
      return {
        songs: [],
        scrollY: 0
      }
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
      },
      back() {
        this.$router.replace('/recommend')
      },
      selectItem (item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      random () {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    components: {
      Scroll,
      SongList,
      Loading
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .mine
    position: fixed;
    top: 0
    width: 100%
    bottom: 0
    z-index: 100
    overflow: hidden
    background: #f9f9f9
    &.slide-enter-active, &.slide-leave-active
      transition all 0.3s
    &.slide-enter, &.slide-leave-to
      transform translate3d(100%, 0, 0)
    .mine-box-wrapper
      display flex
      .back
        position absolute
        top 0
        left 6px
        z-index 50
        flex: 0 0 30px
        width: 30px
        .icon-back
          display: block
          padding: 10px
          font-size: 22px
          color: #00a0dc
      .heading
        position absolute
        top 0
        left 0
        right 0
        z-index 40
        text-align center
        white-space nowrap
        line-height 40px
        font-size 18px
        color: #000
    .list
      position fixed
      top 0
      bottom 0
      width 100%
      background $color-background
      /*overflow hidden*/
      .song-list-wrapper
        padding 20px 30px
      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
        .img-null
          display inline-block
          width: 100%
          transform scale(0.5)
</style>
