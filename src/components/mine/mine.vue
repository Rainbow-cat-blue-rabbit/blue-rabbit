<!--
 * @Author: JaneChelle
 * @Date: 2019-10-24 15:55:29
 * @LastEditTime: 2021-04-15 10:16:46
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
    <div class="mine-result">
      <div>内容</div>
    </div>
    <router-view></router-view>
  </div>
</transition>
</template>

<script>
  export default {
    name: 'search',
    created () {
    },
    data () {
      return {
        query: ''
      }
    },
    methods: {
      back() {
        this.$router.replace('/recommend')
      }
    },
    components: {
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
        text-align center
        white-space nowrap
        line-height 40px
        font-size 18px
    .mine-result
      position: fixed
      width: 100%
      top: 80px
      bottom: 0
</style>
