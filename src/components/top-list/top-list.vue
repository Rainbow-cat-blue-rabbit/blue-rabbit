<template>
<transition name="slide">
  <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {getMusicList} from 'api/rank'
  import {mapGetters} from 'vuex'
  import {createSong} from 'common/js/song'
  export default {
    name: 'top-list',
    data () {
      return {
        songs: [],
        rank: true
      }
    },
    computed: {
      title () {
        return this.topList.title
      },
      bgImage () {
          return this.topList.mbFrontPicUrl
      },
      ...mapGetters([
        'topList'
      ])
    },
    created () {
      this._getMusicList()
    },
    methods: {
      _getMusicList () {
        if (!this.topList.topId) {
            this.$router.push('/rank')
            return
        }
        getMusicList(this.topList.topId, this.topList.period).then((res) => {
            this.songs = res.detail
            console.log(this.songs)
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
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
    .slide-enter-active, &.slide-leave-active
      transition all 0.3s
    .slide-enter, &.slide-leave-to
      transform translate3d(100%, 0, 0)
</style>
