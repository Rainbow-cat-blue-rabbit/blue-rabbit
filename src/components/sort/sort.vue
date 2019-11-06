<template>
  <transition name="slide">
    <div class="recommend">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="heading">热门歌单推荐</h1>
      <scroll ref="scroll" :data="discList" class="recommend-content">
        <div class="recommend-list">
          <ul>
            <li v-for="(item, index) in discList" class="item" :key="index" @click="selectItem(item)">
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
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import {ERR_OK} from 'api/config'
  import { getDiscList } from 'api/recommend'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
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
      selectItem (item) {
        this.$router.push({
          path: `/sort/${item.dissid}`
        })
        this.setDiscList(item)
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      back() {
        this.$router.back()
      },
      ...mapMutations({
        setDiscList: 'SET_DISC_LIST'
      })
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
    .recommend-content
      height: 100%
      overflow: hidden
      margin-top 10px
      .recommend-list
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
