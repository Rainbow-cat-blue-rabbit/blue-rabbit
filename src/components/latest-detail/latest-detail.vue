<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getAlbumSongList} from 'api/latest'
  import {createSong} from 'common/js/song'
  export default {
    name: 'latest-detail',
    data () {
      return {
        songs: []
      }
    },
    computed: {
      title () {
        return this.newAlbum.name
      },
      bgImage () {
       let mid = this.newAlbum.mid
        return 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + mid + '.jpg?max_age=2592000'
      },
      ...mapGetters([
        'newAlbum'
      ])
    },
    created () {
      this._getAlbumSongList()
    },
    methods: {
      _getAlbumSongList() {
        if (!this.newAlbum.mid) {
          this.$router.push('/recommend')
          return
        }
        getAlbumSongList(this.newAlbum.mid).then((res) => {
            this.songs = this._normalizeSongs(res.albumSonglist.data.songList)
            console.log(this.songs.songInfo)
        })
      },
      _normalizeSongs (songList) {
        let ret = []
        // 精简代码
        songList.forEach((item) => {
          let { songInfo } = item
          if (songInfo.id && songInfo.album.mid && songInfo.file.media_mid) {
            // 创建song实力
            ret.push(createSong(songInfo))
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
</style>
