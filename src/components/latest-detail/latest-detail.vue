<!--
 * @Author: JaneChelle
 * @Date: 2019-11-11 20:30:05
 * @LastEditTime: 2021-04-18 16:58:00
 * @Description:
-->
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
        return this.newAlbum.pic_mid
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
          console.log(res)
            this.songs = this._normalizeSongs(res.data)
        })
      },
      _normalizeSongs (songList) {
        let ret = []
        // 精简代码
        songList.forEach((songInfo) => {
          if (songInfo.singerId && songInfo.musicId) {
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
