<!--
 * @Author: JaneChelle
 * @Date: 2019-10-24 15:55:29
 * @LastEditTime: 2021-04-19 20:08:40
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
    <scroll :data="result" @scroll="scroll" ref="list" class="list"
              :listen-scroll="listenScroll"
              :probe-type="probeType">
        <ul class="suggest-list" ref="suggest">
        <li @click="selectItem(item)" class="suggest-item" v-for="(item,index) in result" :key="index">
          <div class="icon">
            <i class="icon-music"></i>
          </div>
          <div class="name">
            <p class="text">{{item.musicName}}-{{item.singerName}}</p>
          </div>
        </li>
      </ul>
        <div v-show="!result.length" class="loading-container">
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
  import { mapActions } from 'vuex'
  import { select } from 'api/select'
  import { createSong } from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  import SongList from 'base/song-list/song-list'
  import Loading from 'base/loading/loading'
  export default {
    name: 'mine',
    data () {
      return {
        result: []
      }
    },
    created () {
      // 根据singer获取详细数据
      this._getSingerDetail()
      this.probeType = 3
      this.listenScroll = true
    },
    methods: {
      back() {
        this.$router.back()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      ...mapActions([
        'insertSong'
      ]),
      selectItem(item) {
        this.insertSong(item)
      },
      _getSingerDetail () {
        select().then((res) => {
          console.log(res)
          this.result = this._normalizeSongs(res.data)
        })
      },
      _normalizeSongs (songList) {
        let ret = []
        // 精简代码
        songList.forEach((item) => {
          let songInfo = item
          if (songInfo.singerId && songInfo.musicId && songInfo.audio) {
            const newSong = createSong(songInfo)
            ret.push(newSong)
          }
        })
        return ret
      }
    },
    components: {
      MusicList,
      Loading,
      Scroll,
      SongList
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
      top 40px
      bottom 0
      width 100%
      background $color-background
      .suggest-list
        padding: 10px 30px
        .suggest-item
          display: flex
          align-items: center
          padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text
        overflow: hidden
        .text
          no-wrap()
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
