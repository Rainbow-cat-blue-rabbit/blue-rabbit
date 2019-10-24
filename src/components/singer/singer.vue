<template>
<div class="singer">
 <list-view :data="singers"></list-view>
</div>
</template>

<script>
  import {getSingerList} from 'api/singer'
  import ListView from 'base/listview/listview'
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
      _getSingerList () {
        getSingerList().then((res) => {
            this.singers = res.singerList.data.singerlist
            console.log(this.singers)
        })
      }
    },
    components: {
      ListView
    }
  }
</script>

<style scoped lang="stylus">
  .singer
    position fixed
    top 88px
    width 100%
    bottom 0
    overflow: hidden;
</style>
