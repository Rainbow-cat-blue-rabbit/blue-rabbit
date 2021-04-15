<!--
 * @Author: JaneChelle
 * @Date: 2021-04-13 15:40:58
 * @LastEditTime: 2021-04-14 11:13:49
 * @Description:登录页面
-->
<template>
<transition name="slide">
  <div class="login">
    <div class="login-box-wrapper">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
    </div>
    <div class="container">
      <div class="toggle">
        <span @click="toLogin" :class="{active : showLogin === true}">登录</span>
        <span @click="toRegister" :class="{active : showRegister === true}">注册</span>
      </div>
      <div class="login-box" v-show="showLogin">
        <input type="text" placeholder="手机号">
        <input type="password" placeholder="密码">
        <button class="sumbit">登 录</button>
      </div>
      <div class="register-box" v-show="showRegister">
        <input type="text" placeholder="昵称">
        <input type="text" placeholder="手机号">
        <input type="password" placeholder="密码">
        <button class="sumbit">注 册</button>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
  export default {
    name: 'login',
    created () {
    },
    data () {
      return {
        showRegister: true,
        showLogin: false
      }
    },
    methods: {
      toLogin() {
        this.showRegister = false
        this.showLogin = true
      },
      toRegister() {
        this.showRegister = true
        this.showLogin = false
      },
      back() {
        this.$router.replace('/recommend')
      }
    },
    components: {
    }
  }
</script>
<style scoped lang="stylus">
.login
  position: fixed;
  top: 0
  width: 100%
  bottom: 0
  z-index: 100
  overflow: hidden
  background: #f9f9f9
  background-image url('../../assets/Everaldo.jpg')
  background-size cover
  &.slide-enter-active, &.slide-leave-active
    transition all 0.3s
  &.slide-enter, &.slide-leave-to
      transform translate3d(100%, 0, 0)
  .login-box-wrapper
      display flex
      .back
        z-index: 50
        flex: 0 0 30px
        width: 30px
        .icon-back
          display: block
          padding: 10px
          font-size: 22px
          color: #00a0dc
  .container
    margin: 20% 10%
    .toggle
      font-size: 20px;
      .active
        color: #fff;
        font-weight: 800;
    .login-box, .register-box
      margin: 20px auto;
      input
        box-sizing border-box
        padding 10px
        margin 5px 0
        width 100%
        border 1px solid #ccc
        border-radius 4px
        &:focus
          border 1px solid #00a0dc
      .sumbit
        padding 10px
        margin 5px 0
        width 100%
        border 1px solid #ccc
        border-radius 4px
        background-color #00a0dc
        color #fff
        font-size 16px

</style>
