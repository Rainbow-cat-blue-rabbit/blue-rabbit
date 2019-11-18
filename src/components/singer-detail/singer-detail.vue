<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getSingerDetail, getSingerVkey } from 'api/singer'
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
        if (!this.singer.singer_mid) {
          // singer是通过vuex获取的，当我们setSinger的时候才能会获取到
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.singer_mid).then((res) => {
          this.songs = this._normalizeSongs(res.singerSongList.data.songList)
        })
      },
      _normalizeSongs (songList) {
        let ret = []
        // 精简代码
        songList.forEach((item) => {
            let { songInfo } = item
          if (songInfo.id && songInfo.album.mid && songInfo.file.media_mid) {
            // 创建song实例
            getSingerVkey(songInfo.mid).then((res) => {
              let songVkey = res.req_0.data.midurlinfo[0].purl
              const newSong = createSong(songInfo, songVkey)
              ret.push(newSong)
            })
          }
        })
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
