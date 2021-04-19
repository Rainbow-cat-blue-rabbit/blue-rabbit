<!--
 * @Author: JaneChelle
 * @Date: 2019-10-24 14:53:02
 * @LastEditTime: 2021-04-19 15:53:48
 * @Description:
-->
<template>
<div class="recommend">
  <scroll ref="scroll" class="recommend-content">
    <div>
      <div class="slider-wrapper" v-if="recommends.length">
        <slider>
          <div v-for="(item, index) in recommends" :key="index">
            <a>
              <img class="needsclick" :src="`${baseUrl}`+item.picUrl" @load="loadImage">
            </a>
          </div>
        </slider>
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
              <li @click="selectItem(item)" v-for="(item, index) in playList.slice(0, 6)" class="list-item" :key="index">
                <div class="icon">
                  <img v-lazy="`${baseUrl}` + item.cover_url_big" alt="" width="90" height="90">
                </div>
                <span v-html="item.title" class="title"></span>
              </li>
            </ul>
          </cube-scroll>
        </div>
<!--2.达人歌单-->
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
              <li @click="selectDoyen(item)" v-for="(item, index) in rePlaylist.slice(0, 6)" class="list-item item" :key="index">
                <div class="icon">
                  <img v-lazy="`${baseUrl}` + item.cover" alt="" width="90" height="90">
                </div>
                <span v-html="item.title" class="s-title"></span>
              </li>
            </ul>
          </cube-scroll>
        </div>

<!--3.新碟-->
        <div>
          <div class="list-card">
            <h1 class="list-title">最新专辑</h1>
            <router-link to="/latestAlbum">
              <span class="more">更多</span>
            </router-link>
          </div>
          <cube-scroll direction="horizontal" :data="newAlbum"
                    ref="scroll" class="horizontal-scroll-list-wrap">
            <ul class="list-wrapper">
            <li @click="selectAlbum(items)" v-for="(items, index) in newAlbum.slice(0, 6)" class="list-item" :key="index">
              <div class="icon">
                <img v-lazy="`${baseUrl}` + items.pic_mid" width="90" height="90">
              </div>
              <div v-html="items.name" class="name"></div>
              <div v-html="items.release_time" class="time"></div>
            </li>
          </ul>
          </cube-scroll>
        </div>
      </div>
    </div>
    <div class="loading-container" v-if="!newAlbum.length">
      <loading></loading>
    </div>
  </scroll>
  <router-view></router-view>
</div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend, getPlayList, getRePlaylist, getNewAlbum} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {mapMutations} from 'vuex'
  import { baseUrl } from '../../common/js/config'
  export default {
    name: 'recommend',
    data () {
      return {
        recommends: [],
        playList: [],
        rePlaylist: [],
        newAlbum: [],
        baseUrl
      }
    },
    created () {
      this._getRecommend()
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
      // 点击选中，跳转路由
      selectItem (item) {
        this.$router.push({
          path: `/recommend/OfficialDetail/${item.tid}`
        })
        this.setOfficial(item)
      },
      selectDoyen (item) {
        this.$router.push({
          path: `/recommend/DoyenDetail/${item.content_id}`
        })
        this.setDoyen(item)
      },
      selectAlbum (items) {
        this.$router.push({
          path: `/recommend/LatestDetail/${items.mid}`
        })
        this.setNewAlbum(items)
      },
      // 轮播图
      _getRecommend () {
        getRecommend().then((res) => {
          console.log(res)
          if (res.code === ERR_OK) {
            this.recommends = res.data
          }
        })
          .catch(err => {
          console.log(err)
        })
      },
      // 官方歌单
      _getPlayList () {
        getPlayList().then((res) => {
          if (res.code === 1) {
            this.playList = res.data
          }
          console.log('官方歌单', res)
        })
      },
      // 达人歌单
      _getRePlaylist () {
        getRePlaylist().then((res) => {
          if (res.code === 1) {
            console.log('达人歌单', res)
            this.rePlaylist = res.data
          }
        })
      },
      // 最新专辑
      _getNewAlbum () {
        getNewAlbum().then((res) => {
          console.log('最新专辑', res)
          if (res.code === 1) {
            this.newAlbum = res.data
          }
        })
      },
      ...mapMutations({
          setOfficial: 'SET_OFFICIAL',
          setDoyen: 'SET_DOYEN',
          setNewAlbum: 'SET_NEWALBUM'
      })
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
            top 20px
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
