<template>
  <transition name="slide">
    <div class="rank">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="heading">排行</h1>
      <scroll class="toplist">
        <ul>
          <li v-for="(items, index) in topList" :key="index" class="item" @click="selectItem(item)">
            <!-- <div v-for="(item, index) in items.toplist" :key="index" class="item" @click="selectItem(item)"> -->
              <div class="icon">
                <img v-lazy="item.musicImages" alt="" width="100" height="100">
              </div>
              <ul class="songList">
                <li class="song" v-for="(song, index) in item.song" :key="index">
                  <span class="text_name">{{song.rank}}</span>
                  <span><span class="text_name">{{song.title}}</span>-{{song.singerName}}</span>
                </li>
              </ul>
            <!-- </div> -->
          </li>
        </ul>
        <div class="loading-container">
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getTopList} from 'api/rank'
  import { mapMutations } from 'vuex'
  export default {
    name: 'rank',
    created () {
      this._getTopList()
    },
    data () {
      return {
        topList: []
      }
    },
    methods: {
        _getTopList() {
          getTopList().then((res) => {
            console.log(res)
            if (res.code === 1) {
              this.topList = res.data.newList
              console.log(this.topList)
            }
          })
        },
      back() {
        this.$router.back()
      },
      selectItem (item) {
          this.$router.push({
            path: `/rank/${item.topId}`
          })
        this.setTopList(item)
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
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
.rank
  position fixed
  top 0
  width 100%
  bottom 0
  padding-top 30px
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
  .toplist
    height 100%
    overflow hidden
    .item
      display flex
      margin 0 20px
      padding-top 20px
      height 100px
      .icon
        flex 0 0 100px
        width 100px
        height 100px
        img
         border-radius 5px
      .songList
        flex 1
        display flex
        flex-direction column
        padding 0 20px
        height 100px
        overflow hidden
        font-size 12px
        background $color-text1
        justify-content center
        .song
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          line-height 26px
          .text_name
            color black
            margin-left 8px
            margin-right 5px
</style>
