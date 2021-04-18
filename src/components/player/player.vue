<template>
    <div class="player" v-show="playlist.length > 0">
      <!-- 播放页面 -->
      <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
        <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="`${baseUrl}` + currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.musicName"></h1>
          <h2 class="subtitle" v-html="currentSong.singerName"></h2>
        </div>

        <div class="middle"
             @touchstart.prevent="middleTouchStart"
             @touchmove.prevent="middleTouchMove"
             @touchend="middleTouchEnd">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img :src="`${baseUrl}` + currentSong.image" alt="" class="image">
              </div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyricList"  :data="currentLyric && currentLyric.lines">
            <div ref="lyricList1" :data="currentLyric && currentLyric.lines">
              <div class="lyric-wrapper">
                <div v-if="currentLyric">
                  <p ref="lyricLine"
                     class="text"
                     :class="{'current': currentLineNum === index}"
                     v-for="(line,index) in currentLyric.lines" :key="line.time">{{line.txt}}</p>
                </div>
              </div>
            </div>
          </scroll>
        </div>

        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active' : currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active' : currentShow === 'lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onPercentChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i :class="playIcon"  @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
      </transition>
      <!-- 迷你 -->
      <transition name="mini">
        <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" :src="`${baseUrl}` + currentSong.image" alt="" width="40" height="40">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.musicName"></h2>
          <p class="desc" v-html="currentSong.singerName"></p>
        </div>
        <div class="control"></div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
          </progress-circle>
        </div>
      </div>
      </transition>
<!--      防止点击过快 ready error-->
      <!-- <audio ref="audio" src="http://localhost:10019/upload/music/十年/audio1a04430c-fdbc-4100-8c5a-8474b5314ecb.mp3
" @play="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio> -->
      <audio ref="audio" :src="`${baseUrl}` + currentSong.audio" @play="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
    </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import animations from 'create-keyframe-animation'
  import { prefixStyle } from 'common/js/dom'
  import {playMode} from 'common/js/config'
  import {shuffle} from 'common/js/util'
  import ProgressBar from 'base/progress-bar/progress-bar'
  import ProgressCircle from 'base/progress-circle/progress-circle'
  import Lyric from 'lyric-parser'
  import Scroll from 'base/scroll/scroll'
  import {baseUrl} from '../../common/js/config'
  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')
  export default {
    name: 'player',
    data () {
      return {
        songReady: false,
        currentTime: 0,
        radius: 32,
        currentLyric: null,
        currentLineNum: 0,
        currentShow: 'cd',
        baseUrl,
        duration: 0
      }
    },
    computed: {
      disableCls () {
        return this.songReady ? '' : 'disable'
      },
      playIcon () {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon () {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      cdCls () {
        return this.playing ? 'play' : 'play pause'
      },
      percent () {
          this.duration = localStorage.getItem('duration')
          console.log(this.currentSong.audio, this.duration)
          return this.currentTime / this.duration
      },
      iconMode () {
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
      ...mapGetters([
        'fullScreen',
        'playlist',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
        'sequenceList'
      ])
    },
    created () {
      this.touch = {}
    },
    methods: {
      back() {
        this.setFullScreen(false)
      },
      open() {
        this.setFullScreen(true)
      },
      enter (el, done) {
        const {x, y, scale} = this._getPosAndScale()
        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0, 0, 0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0, 0, 0) scale(1)`
          }
        }
        // 调用 第三方库 来注册
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })
        // 运行
        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter () {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      leave(el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },
      togglePlaying () {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing)
      },
      _getPosAndScale () {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 40
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
      ready () {
        this.songReady = true
      },
      error () {
        this.songReady = true
      },
      updateTime (e) {
        this.currentTime = e.target.currentTime
      },
      format (interval) {
         interval = interval | 0
        // | 0 向下取整，同 Object.Math.floor()
         let minute = interval / 60 | 0
         let second = this._pad(interval % 60)
         return `${minute}:${second}`
      },
      // 播放模式
      changeMode () {
       const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let list = null
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList
        }
        this.resetCurrentIndex(list)
        return this.setPlayList(list)
      },
      resetCurrentIndex (list) {
        // findIndex() es6语法
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      getLyric() {
        this.currentSong.getLyric().then((lyric) => {
          if (this.currentSong.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch(() => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
      },
      // 当前歌词高亮
      handleLyric ({lineNum, txt}) {
        this.currentLineNum = lineNum
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList1.scrollTo(lineEl, 1000)
        } else {
          // 如果小于5，则滚动制顶部
          this.$refs.lyricList1.scrollTo(0, 0, 1000)
        }
        // this.playingLyric = txt
      },
      middleTouchStart (e) {
        this.touch.initiated = true
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      middleTouchMove (e) {
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        const left = this.currentShow === 'cd' ? '0' : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
        this.$refs.lyricList.$el.style[transitionDuration] = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style[transitionDuration] = 0
      },
      middleTouchEnd() {
        let offsetWidth
        let opacity
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.currentShow = 'lyric'
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0
            this.currentShow = 'cd'
            opacity = 1
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
      },
      // 补0函数
      _pad (num, n = 2) {
        let len = num.toString().length
        while (len < n) {
          num = '0' + num
          len++
        }
        return num
      },
      end () {
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop () {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      },
      next () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      prev () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      onPercentChange (percent) {
        console.log(this.duration)
        this.$refs.audio.currentTime = this.duration * percent
        if (!this.playing) {
          this.togglePlaying()
        }
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAYLIST'
      })
    },
    watch: {
      currentSong (newSong, oldSong) {
        if (newSong.id === oldSong.id) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop()
        }
        this.$nextTick(() => {
          this.getLyric()
          this.$refs.audio.play()
        })
      },
      playing (newPlaying) {
        // 监听播放器的 播放 与 暂停，如果播放器是播放 则 playing就是  true，否则是  false
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    components: {
      ProgressBar,
      ProgressCircle,
      Scroll
    }
  }
</script>

<style lang="stylus">
  @import '~common/stylus/variable.styl'
  @import "~common/stylus/mixin.styl"
.player
  .normal-player
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 150
    background: $color-background
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      opacity: 0.6
      filter: blur(20px)
    .top
      position: relative
      margin-bottom: 25px
      .back
        position absolute
        top: 0
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 9px
          font-size: $font-size-large-x
          color: $color-theme
          transform: rotate(-90deg)
      .title
        width: 70%
        margin: 0 auto
        line-height: 40px
        text-align: center
        no-wrap()
        font-size: $font-size-large
        color: $color-text
      .subtitle
        line-height: 20px
        text-align: center
        font-size: $font-size-medium
        color: $color-text
    .middle
      position: fixed
      width: 100%
      top: 80px
      bottom: 170px
      white-space: nowrap
      font-size: 0
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrapper
          position: absolute
          left: 10%
          top: 0
          width: 80%
          height: 100%
          .cd
            width: 100%
            height: 100%
            box-sizing: border-box
            border: 10px solid rgba(255, 255, 255, 0.1)
            border-radius: 50%
            &.play
              animation: rotate 20s linear infinite
            &.pause
              animation-play-state: paused
            .image
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
              border-radius: 50%

        .playing-lyric-wrapper
          width: 80%
          margin: 30px auto 0 auto
          overflow: hidden
          text-align: center
          .playing-lyric
            height: 20px
            line-height: 20px
            font-size: $font-size-medium
            color: $color-text-l
      .middle-r
        display: inline-block
        vertical-align: top
        width: 100%
        height: 100%
        overflow: hidden
        .lyric-wrapper
          width: 80%
          margin: 0 auto
          overflow: hidden
          text-align: center
          .text
            line-height: 32px
            color: $color-text
            font-size: $font-size-medium
            &.current
              color: $color-text1
    .bottom
      position: absolute
      bottom: 50px
      width: 100%
      .dot-wrapper
        text-align: center
        font-size: 0
        .dot
          display: inline-block
          vertical-align: middle
          margin: 0 4px
          width: 8px
          height: 8px
          border-radius: 50%
          background: $color-time
          &.active
            width: 20px
            border-radius: 5px
            background: $color-text-ll
      .progress-wrapper
        display: flex
        align-items: center
        width: 80%
        margin: 0px auto
        padding: 10px 0
        .time
          color: $color-text1
          font-size: $font-size-small
          flex: 0 0 30px
          line-height: 30px
          width: 30px
          &.time-l
            text-align: left
          &.time-r
            text-align: right
        .progress-bar-wrapper
          flex: 1
      .operators
        display: flex
        align-items: center
        .icon
          flex: 1
          color: $color-theme
          &.disable
            color: $color-theme-d
          i
            font-size: 30px
        .i-left
          text-align: right
        .i-center
          padding: 0 20px
          text-align: center
          i
            font-size: 40px
        .i-right
          text-align: left
        .icon-favorite
          color: $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition: all 0.4s
      .top, .bottom
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity: 0
      .top
        transform: translate3d(0, -100px, 0)
      .bottom
        transform: translate3d(0, 100px, 0)
  .mini-player
    display: flex
    align-items: center
    position: fixed
    left: 0
    bottom: 0
    z-index: 180
    width: 100%
    height: 60px
    background: $color-highlight-background
    &.mini-enter-active, &.mini-leave-active
      transition: all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity: 0
    .icon
      flex: 0 0 40px
      width: 40px
      padding: 0 10px 0 20px
      img
        border-radius: 50%
        &.play
          animation: rotate 10s linear infinite
        &.pause
          animation-play-state: paused
    .text
      display: flex
      flex-direction: column
      justify-content: center
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        margin-bottom: 2px
        no-wrap()
        font-size: $font-size-medium
        color: $color-text1
      .desc
        no-wrap()
        font-size: $font-size-small
        color: $color-text-d
    .control
      flex: 0 0 30px
      width: 30px
      padding: 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size: 30px
        color: $color-theme-d
      .icon-mini
        font-size: 32px
        position: absolute
        left: 0
        top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
