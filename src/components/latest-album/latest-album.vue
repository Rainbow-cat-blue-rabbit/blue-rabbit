<template>
  <transition name="slide">
    <div class="singer">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="heading">最新专辑</h1>
      <scroll class="listview" :data="newAlbum" ref="scroll">
        <ul class="list-wrapper">
          <li @click="selectAlbum(items)" v-for="(items, index) in newAlbum" class="list-item" :key="index">
            <div class="icon">
              <img v-lazy="`${baseUrl}` + items.pic_mid" width="150" height="150">
            </div>
            <div v-html="items.name" class="name"></div>
            <div v-html="items.release_time" class="time"></div>
          </li>
        </ul>
      </scroll>
      <div v-if="!newAlbum.length" class="loading-container">
        <loading></loading>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import { getNewAlbum } from 'api/recommend'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
  import { baseUrl } from '../../common/js/config'
  export default {
    name: 'Official-more',
    data () {
      return {
        newAlbum: [],
        baseUrl
      }
    },
    created () {
      this._getNewAlbum()
    },
    methods: {
      selectAlbum (items) {
        this.$router.push({
          path: `/latestAlbum/${items.mid}`
        })
        this.setNewAlbum(items)
      },
      _getNewAlbum () {
        getNewAlbum().then((res) => {
          if (res.code === 1) {
            this.newAlbum = res.data
          }
        })
      },
      back() {
        this.$router.back()
      },
      ...mapMutations({
        setNewAlbum: 'SET_NEWALBUM'
      })
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
          .name
            font-size 14px
            color #000
            line-height 22px
            height 22px
            width 130px
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
          .time
            font-size 14px
            color $color-time
            line-height 22px
            height 22px
</style>
