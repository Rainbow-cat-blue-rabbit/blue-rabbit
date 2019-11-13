<template>
  <transition name="slide">
    <div class="singer">
        <div class="back" @click="back">
          <i class="icon-back"></i>
        </div>
        <h1 class="heading">达人歌单</h1>
      <scroll class="listview" :data="rePlaylist" ref="scroll">
        <ul class="list-wrapper">
          <li @click="selectItemDoyen(item)" v-for="(item, index) in rePlaylist" class="list-item item" :key="index">
            <div class="icon">
              <img v-lazy="item.cover" alt="" width="90" height="90">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.username"></h2>
              <p class="desc" v-html="item.title"></p>
            </div>
          </li>
        </ul>
      </scroll>
      <div v-if="!rePlaylist.length" class="loading-container">
        <loading></loading>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import { getRePlaylist } from 'api/recommend'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
  export default {
    name: 'doyen',
    data () {
      return {
        rePlaylist: []
      }
    },
    created () {
      this._getRePlaylist()
    },
    methods: {
      selectItemDoyen (item) {
        console.log(item.content_id)
        this.$router.push({
          path: `/doyen/${item.content_id}`
        })
        this.setDoyen(item)
      },
      _getRePlaylist () {
        getRePlaylist().then((res) => {
          this.rePlaylist = res.recomPlaylist.data.v_hot
        })
      },
      ...mapMutations({
        setDoyen: 'SET_DOYEN'
      }),
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
        .list-item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px
          .icon
            flex 0 0 90px
            width 90px
            padding-right 20px
            img
              border-radius 5px
          .text
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height 20px
            overflow hidden
            font-size 14px
            .name
              margin-bottom 10px
              color $color-text
            .desc
              color: $color-tag
</style>
