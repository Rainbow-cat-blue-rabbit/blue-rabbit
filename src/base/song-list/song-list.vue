<!--
 * @Author: JaneChelle
 * @Date: 2019-10-30 14:48:34
 * @LastEditTime: 2021-04-18 21:33:10
 * @Description:
-->
<template>
    <div class="song-list">
      <ul>
          <li @click="selectItem(song, index)" v-for="(song,index) in songs" class="item" :key="index">
            <div class="content">
              <h2 class="name">{{song.musicName}}</h2>
              <p class="desc">{{song.singerName}}</p>
            </div>
          </li>
      </ul>
    </div>
</template>

<script>
  import { play } from '../../api/play'
  export default {
    name: 'song-list',
    props: {
      songs: {
        type: Array,
        default: () => [],
        duration: '',
        status: ''
      }
    },
    methods: {
      selectItem(item, index) {
        // 向上派发出去
        this.$emit('select', item, index)
        play(item.musicId).then((res) => {
          console.log(res)
          if (res.code === 1) {
            this.duration = res.data.length
            this.status = res.data.status
            localStorage.setItem('duration', this.duration)
            localStorage.setItem('status', this.status)
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height 64px
      font-size $font-size-medium
      .content
        flex 1
        line-height 20px
        overflow hidden
        .name
          no-wrap()
          color $color-text
        .desc
          no-wrap()
          margin-top 4px
          color $color-tag
</style>
