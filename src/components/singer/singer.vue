<!--
 * @Author: JaneChelle
 * @Date: 2019-10-24 14:53:02
 * @LastEditTime: 2021-04-17 20:14:32
 * @Description:
-->
<template>
  <transition name="slide">
    <div class="singer">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="heading">歌手</h1>
      <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import ListView from 'base/listview/listview'
  import { mapMutations } from 'vuex'
  export default {
    name: 'singer',
    data () {
      return {
        singers: []
      }
    },
    created () {
      this._getSingerList()
    },
    methods: {
      selectSinger (singer) {
        // 编程式接口
        this.$router.push({
          path: `/singer/${singer.singer_id}`
        })
        // 实现对mutation的提交 类似于 this.$store.commit('setSinger', singer)，进而改变 state值
        this.setSinger(singer)
      },
      _getSingerList () {
        getSingerList().then((res) => {
          if (res.code === 1) {
            this.singers = res.data
          }
          console.log(res)
          // this.singers = res.singerList.data.singerlist
        })
      },
      back() {
        this.$router.back()
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
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
</style>
