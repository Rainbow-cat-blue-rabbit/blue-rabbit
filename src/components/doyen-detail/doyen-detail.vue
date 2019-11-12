<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getDoyenInfo} from 'api/doyen'
  import {createSong} from 'common/js/song'
  import {ERR_OK} from 'api/config'
  export default {
    name: 'doyen-detail',
    computed: {
      title () {
        return this.rePlaylist.title
      },
      bgImage () {
        return this.rePlaylist.cover
      },
      ...mapGetters([
        'rePlaylist'
      ])
    },
    data () {
      return {
        songs: []
      }
    },
    created () {
      this._getDoyenInfo()
    },
    methods: {
      _getDoyenInfo() {
        if (!this.rePlaylist.content_id) {
          this.$router.push('/recommend')
          return
        }
        getDoyenInfo(this.rePlaylist.content_id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id && musicData.mid) {
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

<style scoped>

</style>
