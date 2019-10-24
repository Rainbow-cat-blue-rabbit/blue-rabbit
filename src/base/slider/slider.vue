<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot></slot>
      </div>
      <div class="dots">
        <span class="dot" v-for="(item, index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    name: 'slider',
    data () {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true // 设置循环状态
      },
      autoPlay: { // 自动播放
        type: Boolean,
        default: true
      },
      interval: { // 轮播时间间隔
        type: Number,
        default: 4000
      }
    },
    mounted () { // mounted钩子函数，初始化better-scroll
      setTimeout(() => { // *页面刷新的时间在17ms左右，所以设置延时20ms，等待dom加载完成*
        this._setSliderWidth() // 初始化  设置容器宽度
        this._initDots()
        this._initSlider() // 初始化 bscroll
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 监听窗口改变事件，实时改变style宽度
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    // 组件销毁，释放内存
    destroyed () {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          // 改版之后的写法
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
        })
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          // if (this.loop) {
          //   pageIndex -= 1
          // }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      _play () {
        // let pageIndex = this.currentPageIndex + 1
        this.timer = setTimeout(() => {
          this.slider.next(400)
        }, this.interval)
      }
    }
  }
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
  .slider
    min-height: 1px
    .slider-group
      position relative
      overflow hidden
      white-space nowrap
      .slider-item
        float left
        box-sizing border-box
        overflow hidden
        text-align center
        a
         display block
         width 100%
         img
          display block
          width 100%
    .dots
      position absolute
      left 0
      right 0
      text-align center
      font-size 0
      bottom 12px
      transform translateZ(1px)
      .dot
        display inline-block
        margin 0 4px
        width 8px
        height 8px
        border-radius 50%
        background: hsla(0,0%,100%,.5)
        &.active
         width 20px
         border-radius 5px
         background: hsla(0,0%,100%,.8);
</style>
