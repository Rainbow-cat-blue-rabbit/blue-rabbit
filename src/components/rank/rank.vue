<template>
  <transition name="slide">
    <div class="rank">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="heading">排行</h1>
      <scroll class="toplist">
        <ul>
          <!-- 新歌榜 -->
          <li class="item">
              <div class="icon">
                <img src="../../assets/biaosheng.jpg" alt="" width="100" height="100">
              </div>
              <ul class="songList">
                <li class="song" v-for="(item, index) in newList" :key="index" @click="selectItem1(item)">
                  <!-- <span class="text_name">{{item.rank}}</span> -->
                  <span><span class="text_name">{{item.musicName}}</span>-{{item.singerName}}</span>
                </li>
              </ul>
          </li>
          <!-- 热歌榜 -->
          <li  class="item">
              <div class="icon">
                <img src="../../assets/rege.jpg" alt="" width="100" height="100">
              </div>
              <ul class="songList">
                <li class="song" v-for="(item, index) in playList" :key="index" @click="selectItem2(item)">
                  <!-- <span class="text_name">{{item.searchTimes}}</span> -->
                  <span><span class="text_name">{{item.musicName}}</span>-{{item.singerName}}</span>
                </li>
              </ul>
          </li>
          <!-- 搜索榜 -->
          <li  class="item">
              <div class="icon">
                <img src="../../assets/xinge.jpg" alt="" width="100" height="100">
              </div>
              <ul class="songList">
                <li class="song" v-for="(item, index) in searchList" :key="index" @click="selectItem3(item)">
                  <!-- <span class="text_name">{{item.rank}}</span> -->
                  <span><span class="text_name">{{item.musicName}}</span>-{{item.singerName}}</span>
                </li>
              </ul>
          </li>
        </ul>
        <div class="loading-container">
          <loading v-if="!searchList.length"></loading>
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
        newList: [],
        playList: [],
        searchList: []
      }
    },
    methods: {
        _getTopList() {
          getTopList().then((res) => {
            console.log(res)
            if (res.code === 1) {
              this.newList = res.data.newList
              this.playList = res.data.playList
              this.searchList = res.data.searchList
            }
          })
        },
      back() {
        this.$router.back()
      },
      selectItem1 (item) {
          this.$router.push({
            path: `/rank/${1}`
          })
        this.setTopList(item)
      },
      selectItem2 (item) {
          this.$router.push({
            path: `/rank/${2}`
          })
        this.setTopList(item)
      },
      selectItem3 (item) {
          this.$router.push({
            path: `/rank/${3}`
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
