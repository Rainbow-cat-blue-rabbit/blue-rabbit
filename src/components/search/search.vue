<template>
<div class="search">
  <div class="search-box-wrapper">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <search-box @query="onChangeQuery"></search-box>
  </div>
  <div class="search-result">
    <suggest :query="query"></suggest>
  </div>
</div>
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
  // import {getHotKey} from 'api/search'
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
      },
      onChangeQuery (query) {
        this.query = query
      }
    },
    components: {
      SearchBox,
      Suggest
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    position: fixed;
    top: 0
    width: 100%
    bottom: 0
    z-index: 100
    overflow: hidden
    background: #f9f9f9
    .search-box-wrapper
      margin: 20px
      display flex
      justify-content flex-end
      .back
        position: absolute
        left: 0
        z-index: 50
        flex: 0 0 30px
        width: 30px
        .icon-back
          display: block
          padding: 10px
          font-size: 22px
          color: #00a0dc
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 80px
      bottom: 0
</style>
