<!--
 * @Author: JaneChelle
 * @Date: 2019-10-24 14:53:02
 * @LastEditTime: 2021-04-11 17:08:07
 * @Description:
-->
<template>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">首页</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/Official-more">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/search">
        <span class="tab-link">搜索</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/mine">
        <span class="tab-link">收藏</span>
      </router-link>
    </div>
</template>

<script>
  export default {
    name: 'tab'
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable.styl'
  .tab
    display: flex
    height: 44px
    line-height 44px
    font-size $font-size-medium
    .tab-item
     flex 1
     text-align center
     .tab-link
       padding-bottom 5px
       color $color-text
     &.router-link-active
       .tab-link
         color $color-theme
         border-bottom 2px solid $color-theme
</style>
