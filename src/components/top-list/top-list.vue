<!--
 * @Author: JaneChelle
 * @Date: 2019-11-04 21:21:51
 * @LastEditTime: 2021-04-20 09:58:53
 * @Description:
-->
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
        rank: true,
        typeNum: 1
      }
    },
    computed: {
      title () {
        return this.topList.title
      },
      bgImage () {
        if (this.typeNum === 1) {
          return '/upload/T003R300x300M000004MbuEP0Eyiff.jpg'
        } else if (this.typeNum === 2) {
          return '/upload/T003R300x300M00000359vyu2SlQZq.jpg'
        } else {
          return '/upload/T003R300x300M000004LVKKs3zDEdw.jpg'
        }
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
        let url = window.location.href
        this.typeNum = url.substr(url.length - 1, 1)
        getMusicList(this.typeNum).then((res) => {
            this.songs = this._normalizeSongs(res.data)
            console.log(this.songs)
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.musicId) {
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
