<template>
  <transition name="slide">
    <div class="singer">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="heading">官方歌单</h1>
      <scroll class="listview" :data="playList" ref="scroll">
        <ul class="list-wrapper" ref="songList">
          <li v-for="(item, index) in playList" class="list-item" :key="index">
            <div class="icon">
              <img v-lazy="item.cover_url_big" alt="" width="160" height="160">
            </div>
            <div v-html="item.title" class="title"></div>
          </li>
        </ul>
      </scroll>
        <div v-if="!playList.length" class="loading-container">
          <loading></loading>
        </div>
    </div>
  </transition>
</template>

<script>
  import { getPlayList } from 'api/recommend'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default {
    name: 'Official-more',
    data () {
      return {
        playList: []
      }
    },
    created () {
      this._getPlayList()
    },
    methods: {
      _getPlayList () {
        getPlayList().then((res) => {
          this.playList = res.playlist.data.v_playlist
        })
      },
      back() {
        this.$router.back()
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .singer
    position fixed
    top 0
    width 100%
    bottom 0
    padding-top 35px
    z-index 100
    overflow: hidden
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition all 0.3s
    &.slide-enter, &.slide-leave-to
      transform translate3d(100%, 0, 0)
    .heading
      position absolute
      top 0
      left 0
      right 0
      text-align center
      white-space nowrap
      line-height 40px
      font-size 18px
      color $color-theme
    .back
      position absolute
      top 0
      left 6px
      z-index 50
      .icon-back
        display block
        padding 10px
        font-size $font-size-large-x
        color $color-theme
    .listview
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      .list-wrapper
        display flex
        justify-content center
        flex-wrap wrap
        .list-item
          flex 0 1 auto
          padding 10px
          .icon
            img
             border-radius 5px
          .title
            font-size 14px
            line-height 22px
            color #000
            width 130px
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
</style>
