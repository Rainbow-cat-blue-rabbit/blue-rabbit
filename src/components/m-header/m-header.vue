<template>
  <div class="m-header">
    <div class="text">蓝兔音乐</div>
    <div class="iptBox" @click="search">
        <input type="text" placeholder="听你想听" class="ipt">
        <i class="icon-search"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-header.vue',
  methods: {
    search () {
      this.$router.replace('/search')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable.styl'
  @import "~common/stylus/mixin.styl"
  .m-header
    position: relative
    height: 44px
    line-height 44px
    display flex
    padding 0 20px
    .text
      color: black
      line-height: 44px
      font-size: $font-size-large
      margin-left: 6px
      flex 0 0 75px
      width 75px
    .iptBox
      vertical-align: middle
      position relative
      margin-left: 10px
      .icon-search
        position absolute
        left: 46px
        top: 16px
      .ipt
        line-height: 30px
        border-radius: 30px
        text-align: center
        font-size: 14px
        outline: none
        &::-webkit-input-placeholder
          color: #333;
          font-size: 12px;
</style>
