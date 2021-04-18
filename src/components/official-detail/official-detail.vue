<template>
    <transition name="slide">
      <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getCdInfo} from 'api/official-detail'
  import {createSong} from 'common/js/song'
  import {ERR_OK} from 'api/config'
  export default {
    name: 'official-detail',
    computed: {
      title () {
        return this.playList.title
      },
      bgImage () {
        return this.playList.cover_url_big
      },
      ...mapGetters([
        'playList'
      ])
    },
    data () {
      return {
        songs: []
      }
    },
    created () {
      this._getCdInfo()
    },
    methods: {
      _getCdInfo() {
        if (!this.playList.tid) {
          this.$router.push('/recommend')
          return
        }
        getCdInfo(this.playList.tid).then((res) => {
          console.log(res)
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data)
          }
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.musicId && musicData.singerId) {
            ret.push(createSong(musicData))
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
