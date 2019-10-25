<template>
<div class="recommend">
  <scroll ref="scroll" class="recommend-content" :data="discList">
    <div>
      <div class="slider-wrapper" v-if="recommends.length">
        <slider>
          <div v-for="(item, index) in recommends" :key="index">
            <a :href="item.linkUrl">
              <img class="needsclick" :src="item.picUrl" @load="loadImage">
            </a>
          </div>
        </slider>
      </div>
      <div class="module">
        <router-link class="module-item" to="/singer">
          <img src="../../assets/singer.png" width="25" height="25">
          <div class="tag">歌手</div>
        </router-link>
        <router-link class="module-item" to="/rank">
          <img src="../../assets/rank.png" width="25" height="25">
          <div class="tag">排行</div>
        </router-link>
        <router-link class="module-item" to="/sort">
          <img src="../../assets/sort.png" width="25" height="25">
          <div class="tag">分类</div>
        </router-link>
      </div>
      <div class="recommend-list">
<!--   1.     官方歌单-->
        <div>
          <div class="list-card">
            <h1 class="list-title">官方歌单</h1>
            <router-link to="/Official-more">
              <span class="more">更多</span>
            </router-link>
          </div>
          <cube-scroll direction="horizontal" :data="playList"
             ref="scroll" class="horizontal-scroll-list-wrap">
            <ul class="list-wrapper" ref="songList">
              <li v-for="(item, index) in playList.slice(0, 5)" class="list-item" :key="index">
                <div class="icon">
                  <img v-lazy="item.cover_url_big" alt="" width="90" height="90">
                </div>
                <span v-html="item.title" class="title"></span>
              </li>
            </ul>
          </cube-scroll>
        </div>
<!--     2.   达人歌单-->
        <div>
          <div class="list-card">
            <h1 class="list-title">达人歌单</h1>
            <router-link to="/doyen">
              <span class="more">更多</span>
            </router-link>
          </div>
          <cube-scroll direction="horizontal" :data="rePlaylist"
                       ref="scroll" class="horizontal-scroll-list-wrap">
            <ul class="list-wrapper">
              <li v-for="(item, index) in rePlaylist.slice(0, 5)" class="list-item item" :key="index">
                <div class="icon">
                  <img v-lazy="item.cover" alt="" width="90" height="90">
                </div>
                <span v-html="item.title" class="s-title"></span>
              </li>
            </ul>
          </cube-scroll>
        </div>

<!--   3.     新碟-->
        <div>
          <div class="list-card">
            <h1 class="list-title">最新专辑</h1>
            <span class="more">更多</span>
          </div>
          <cube-scroll direction="horizontal" :data="newAlbum"
                       ref="scroll" class="horizontal-scroll-list-wrap">
            <ul class="list-wrapper">
            <li v-for="(items, index) in newAlbum.slice(0, 5)" class="list-item" :key="index">
              <div class="icon">
                <img v-lazy="'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + items.photo.pic_mid + '.jpg?max_age=2592000'" width="90" height="90">
              </div>
              <div v-html="items.name" class="name"></div>
              <div v-html="items.release_time" class="time"></div>
            </li>
          </ul>
          </cube-scroll>
        </div>

      </div>
    </div>
    <div class="loading-container" v-if="!discList.length">
      <loading></loading>
    </div>
  </scroll>
</div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend, getDiscList, getPlayList, getRePlaylist, getNewAlbum} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  export default {
    name: 'recommend',
    data () {
      return {
        recommends: [],
        discList: [],
        playList: [],
        rePlaylist: [],
        newAlbum: []
      }
    },
    created () {
      this._getRecommend()
      this._getDiscList()
      this._getPlayList()
      this._getRePlaylist()
      this._getNewAlbum()
    },
    methods: {
      // 图片异步加载完，在进行refresh()
      loadImage () {
        if (!this.checkloaded) {
          this.$refs.scroll.refresh()
          this.checkloaded = true
        }
      },
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
          .catch(err => {
          console.log(err)
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
              this.discList = res.data.list
          }
        })
      },
      _getPlayList () {
        getPlayList().then((res) => {
          this.playList = res.playlist.data.v_playlist
        })
      },
      _getRePlaylist () {
        getRePlaylist().then((res) => {
          this.rePlaylist = res.recomPlaylist.data.v_hot
        })
      },
      _getNewAlbum () {
        getNewAlbum().then((res) => {
          this.newAlbum = res.new_album.data.albums
        })
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .module
        display flex
        margin 10px
        justify-content space-around
        text-align center
        .module-item
          align-items center
          flex 0 1 auto
          .tag
            align-items center
            padding-top 10px
            color black
      .recommend-list
        .list-card
          padding 0 10px
          position relative
          .more
            position absolute
            right 10px
            top 12px
            font-size 12px
            color $color-text-h
          .list-title
            height: 48px
            line-height: 48px
            font-size 16px
            color $color-text-h
            font-weight bold
      .horizontal-scroll-list-wrap
        display flex
        align-items: center
        .list-wrapper
          display flex
          justify-content center
          .list-item
            display inline-block
            padding 0 10px 10px 0
            .icon
              img
               border-radius 5px
            .s-title
              font-size 12px
          .title
            font-size 12px
          .name
            font-size 12px
            line-height 20px
            width 90px
            white-space nowrap
            overflow: hidden
            text-overflow:ellipsis
          .time
            font-size 12px
            color $color-tag
      .loading-container
        position absolute
        width 100%
        top 50%
        transform translateY(-50%)
</style>
