<template>
 <div class="recommend">
  <scroll ref="scroll" :data="discList" class="recommend-content">
  <div class="recommend-list">
    <h1 class="list-title">热门歌单推荐</h1>
    <ul>
      <li v-for="(item, index) in discList" class="item" :key="index">
        <div class="icon">
          <img v-lazy="item.imgurl"  width="60" height="60">
        </div>
        <div class="text">
          <h2 class="name" v-html="item.creator.name"></h2>
          <p clas="desc" v-html="item.dissname"></p>
        </div>
      </li>
    </ul>
  </div>
</scroll>
</div>
</template>

<script>
  import {ERR_OK} from 'api/config'
  import { getDiscList } from 'api/recommend'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default {
    name: 'sort',
    data () {
      return {
        discList: []
      }
    },
    created () {
      this._getDiscList()
    },
    methods: {
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
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
  @import '~common/stylus/variable'
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .recommend-list
        .list-title
          height: 25px
          line-height: 25px
          text-align center
          font-size 14px
          color $color-theme
        .item
          display flex
          align-items center
          box-sizing border-box
          padding 0 20px 20px
          .icon
            flex 0 0 60px
            width 60px
            padding-right 20px
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

      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>
