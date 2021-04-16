<!--
 * @Author: JaneChelle
 * @Date: 2021-04-13 15:40:58
 * @LastEditTime: 2021-04-16 11:02:27
 * @Description: 登录注册页面
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
        <input type="text" placeholder="手机号" v-model="ruleForm.phone">
        <input type="password" placeholder="密码" v-model="ruleForm.password">
        <button class="sumbit" @click="login">登 录</button>
      </div>
      <div class="register-box" v-show="showRegister">
        <input type="text" placeholder="昵称" v-model="ruleForm.name">
        <input type="text" placeholder="手机号" v-model="ruleForm.phone">
        <input type="password" placeholder="密码" v-model="ruleForm.password">
        <button class="sumbit" @click="register">注 册</button>
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
        showRegister: false,
        showLogin: true,
        ruleForm: {
          password: '',
          phone: '',
          name: ''
        }
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
      },
      login() {
        let params = {
          phone: this.ruleForm.phone,
          password: this.ruleForm.password
        }
        this.$axios.post('http://localhost:10019/user/login', params).then((res) => {
          console.log(res)
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.$message.error(res.data.msg)
            } else if (res.data.code === 1) {
              this.$store.dispatch('isLogin', true)
              localStorage.setItem('Flag', 'isLogin')
              this.$message.success(res.data.msg)
              this.$router.replace('/recommend')
            }
          }
        }).catch(function(err) {
          this.$message.error(err)
      })
      },
      register() {
        let params = {
          name: this.ruleForm.name,
          phone: this.ruleForm.phone,
          password: this.ruleForm.password
        }
        this.$axios.post('http://localhost:10019/user/register', params).then((res) => {
          console.log(res)
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg
              })
            } else if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
            }
          }
        }).catch(function(err) {
          this.$message.error(err)
      })
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
