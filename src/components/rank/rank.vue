<template>
<div class="rank">
<scroll class="toplist">
  <ul>
    <li v-for="(items, index) in topList" :key="index" >
      <div v-for="(item, index) in items.toplist" :key="index" class="item">
        <div class="icon">
          <img v-lazy="item.frontPicUrl" alt="" width="100" height="100">
        </div>
        <ul class="songList">
          <li class="song" v-for="(song, index) in item.song" :key="index">
            <span class="text_name">{{song.rank}}</span>
            <span><span class="text_name">{{song.title}}</span>-{{song.singerName}}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
  <div class="loading-container">
    <loading></loading>
  </div>
</scroll>
</div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getTopList} from 'api/rank'
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
              this.topList = res.toplist.data.group
          })
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
.rank
  position fixed
  width 100%
  top 88px
  bottom 0
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
