<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'scroll',
    props: { // 屏幕滑动超过一定时间后派发
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this._initScroll()
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          eventPassthrough: 'horizontal' // 这是代表的横向滚动
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        // 上拉加载更多
        if (this.pullup) {
          // 监听scrollEnd组件
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style scoped>

</style>
