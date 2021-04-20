<template>
    <scroll class="suggest"
            :data="result"
            :pullup="pullup"
            @scrollEnd="searchMore"

    >
      <ul class="suggest-list" ref="suggest">
        <li @click="selectItem(item)" class="suggest-item" v-for="(item,index) in result" :key="index">
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
            <p class="text" v-html="getDisplayName(item)"></p>
          </div>
        </li>
        <Loading v-show="hasMore" title=" "></Loading>
      </ul>
    </scroll>
</template>

<script>
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  // import {filterSinger} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { mapActions } from 'vuex'
  import { createSong } from 'common/js/song'
  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    name: 'suggest',
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        result: [],
        pullup: true,
        hasMore: false
      }
    },
    methods: {
      search () {
        this.hasMore = true
        // 暂时有问题
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query).then((res) => {
          console.log(res)
            if (res.code === 1) {
              this.result = this._normalizeSongs(res.data)
              this.hasMore = false
              console.log(this.result)
            }
        })
      },
      _normalizeSongs (songList) {
        let ret = []
        // 精简代码
        songList.forEach((item) => {
          let songInfo = item
          if (songInfo.singerId && songInfo.musicId && songInfo.audio) {
            const newSong = createSong(songInfo)
            ret.push(newSong)
          }
        })
        return ret
      },
      searchMore () {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._getResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      selectItem (item) {
          console.log(item)
          this.insertSong(item)
      },
      getIconCls (item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName (item) {
        if (item.type === TYPE_SINGER) {
          return item.singerName
        } else {
          return `${item.musicName}-${item.singerName}`
        }
      },
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query () {
        this.search()
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 10px 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
