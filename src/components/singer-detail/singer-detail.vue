<!--
 * @Author: JaneChelle
 * @Date: 2019-10-26 09:52:45
 * @LastEditTime: 2021-04-18 16:11:54
 * @Description:
-->
<!--
 * @Author: JaneChelle
 * @Date: 2019-10-26 09:52:45
 * @LastEditTime: 2021-04-17 21:16:52
 * @Description:
-->
<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getSingerDetail } from 'api/singer'
  import { createSong } from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  export default {
    name: 'singer-detail',
    data () {
      return {
        songs: []
      }
    },
    computed: {
      title () {
        return this.singer.singer_name
      },
      bgImage () {
        return this.singer.singer_pic
      },
      // 从vuex中获取singer信息，然后传入组件
        ...mapGetters([
          'singer'
        ])
    },
    created () {
      // 根据singer获取详细数据
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail () {
        // 处理边界
        if (!this.singer.singer_id) {
          // singer是通过vuex获取的，当我们setSinger的时候才能会获取到
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.singer_id).then((res) => {
          console.log(res)
          this.songs = this._normalizeSongs(res.data)
        })
      },
      _normalizeSongs (songList) {
        let ret = []
        // 精简代码
        songList.forEach((item) => {
          console.log(item)
            // let { songInfo } = item
            let songInfo = item
          if (songInfo.singerId && songInfo.musicId && songInfo.audio) {
            const newSong = createSong(songInfo)
            ret.push(newSong)
          }
        })
        console.log(ret)
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
  .singer-detail
    &.slide-enter-active, &.slide-leave-active
      transition all 0.3s
    &.slide-enter, &.slide-leave-to
      transform translate3d(100%, 0, 0)
</style>
