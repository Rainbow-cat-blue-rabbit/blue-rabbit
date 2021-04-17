<template>
    <scroll class="listview" :data="data">
        <ul>
          <li @click="selectItem(item)" v-for="(item, index) in data" class="list-group-item" :key="index">
              <img v-lazy="`${baseUrl}` + item.singer_pic" width="60" height="60" class="avatar">
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
  import {baseUrl} from '../../common/js/config'
  export default {
    name: 'listview',
    data() {
      return {
        baseUrl
      }
    },
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    methods: {
      // 点击时向外派发，告诉父组件，点击的是哪个
      selectItem (item) {
        this.$emit('select', item)
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
