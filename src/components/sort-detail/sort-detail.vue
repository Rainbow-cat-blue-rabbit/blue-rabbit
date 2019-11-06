<template>
    <transition name="slide">
      <music-list  :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getCdList} from 'api/sort'
  import {createSong} from 'common/js/song'
  import {ERR_OK} from 'api/config'
  export default {
    name: 'sort-detail',
    computed: {
      title () {
        return this.discList.dissname
      },
      bgImage () {
        return this.discList.imgurl
      },
      ...mapGetters([
        'discList'
      ])
    },
    data () {
      return {
        songs: []
      }
    },
    created () {
      this._getCdList()
    },
    methods: {
      _getCdList() {
        // 处理边界
        if (!this.discList.dissid) {
          // singer是通过vuex获取的，当我们setSinger的时候才能会获取到
          this.$router.push('/sort')
          return
        }
        getCdList(this.discList.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs(list) {
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
