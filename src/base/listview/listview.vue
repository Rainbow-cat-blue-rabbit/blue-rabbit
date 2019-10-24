<template>
    <scroll class="listview" :data="data">
        <ul>
          <li v-for="(item, index) in data" class="list-group-item" :key="index">
              <img v-lazy="item.singer_pic"  width="60" height="60" class="avatar">
              <span v-html="item.singer_name" class="name"></span>
          </li>
        </ul>
        <div v-show="!data.length" class="loading-container">
          <loading></loading>
        </div>
    </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default {
    name: 'listview',
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus">
.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  .list-group-item
    display flex
    align-items center
    padding 20px 0 0 30px
    .avatar
      width 50px
      height 50px
      border-radius 50%
    .name
      margin-left 20px
      font-size: 14px
</style>
