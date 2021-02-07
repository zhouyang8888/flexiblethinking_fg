<template>
  <div class="login">
    <div>
      <p ref='warning' :style="warningStyle">{{ warningInfo }}</p>
    </div>
    <div><strong>姓名</strong><input type="text" ref='name' v-model="name" placeholder='name' v-on:mouseenter="$refs.name.style = inputTextNormalStyle" /></div>
    <div><strong>密码</strong><input type="text" ref='pswd' v-model="pswd" placeholder='password' v-on:mouseenter="$refs.pswd.style = inputTextNormalStyle" /></div>
    <div><input name="reg" type="submit" value="注册" v-on:click="register"/><input name="login" type="submit" value="登录" v-on:click="login"/></div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'
import vueCookies from 'vue-cookies'

export default {
  name: 'Login',
  props: {
  },
  data: function () {
    return {
      name: '',
      pswd: '',
      warningInfo: '',
      warningStyle: this.invisibleWarningStyle
    }
  },
  computed: {
    greenWarningStyle: function () { return 'visibility:visible;color:green;' },
    redWarningStyle: function () { return 'visibility:visible;color:red;' },
    invisibleWarningStyle: function () { return 'visibility:hidden' },
    inputTextNormalStyle: function () { return 'display:inline;background-color:white;color:black;width:100px;' },
    inputTextWarningStyle: function () { return 'display:inline;background-color:red;color:white;width:100px;' }
  },
  methods: {
    register: function () {
      if (!this.name) {
        this.$refs.name.style = this.inputTextWarningStyle
        return
      } else if (!this.pswd) {
        this.$refs.pswd.style = this.inputTextWarningStyle
        return
      }
      const postBody = { name: this.name, md5pswd: md5(this.pswd) }
      axios.post('http://127.0.0.1:80/api/signup', postBody)
        .then(response => {
          if (response.data.statusCode >= 0) {
            this.login()
          } else {
            this.warningInfo = response.data.message
            this.warningStyle = this.redWarningStyle
          }
        })
        .catch(Error => {
          alert('signup ' + Error + ' : ' + this.name + ' ' + this.pswd)
        })
    },
    login: function () {
      if (!this.name) {
        this.$refs.name.style = this.inputTextWarningStyle
        this.warningInfo = '填入用户名'
        this.warningStyle = this.redWarningStyle
        return
      } else if (!this.pswd) {
        this.$refs.pswd.style = this.inputTextWarningStyle
        this.warningInfo = '请填入密码'
        this.warningStyle = this.redWarningStyle
        return
      }
      const postBody = { name: this.name, md5pswd: md5(this.pswd) }
      axios.post('http://127.0.0.1:80/api/signin', postBody)
        .then(response => {
          const resp = response.data.info ? response.data.info : response.data
          this.warningInfo = resp.message
          if (resp.statusCode >= 0) {
            if (response.data.qwer) {
              vueCookies.set('qwer', response.data.qwer, '1d')
              this.$emit('loginSuc', resp.uid)
            }
            this.warningStyle = this.greenWarningStyle
          } else {
            if (resp.statusCode === -11) {
              this.$refs.pswd.style = this.inputTextWarningStyle
            } else if (resp.statusCode === -12) { // -12
              this.$refs.name.style = this.inputTextWarningStyle
            }
            this.$refs.warning.style = this.redWarningStyle
          }
        })
        .catch(Error => {
          alert('login ' + Error + ' : ' + this.name + ' ' + this.pswd)
        })
    }
  },
  mounted: function () {
    const cookies = document.cookie.split(';')
    for (let c in cookies) {
      c = cookies[c].trim()
      if (c.startsWith('qwer=')) {
        c = c.substr('qwer='.length)
        const postBody = { check: c }
        axios.post('http://127.0.0.1:80/api/signincheck', postBody)
          .then(response => {
            if (response.data.statusCode >= 0) {
              this.name = response.data.message
              this.$emit('loginSuc', response.data.uid)
            }
          })
          .catch(Error => {
            alert('Auto login' + Error + ' : ' + c)
          })
        break
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
    display: block;
    position: absolute;
    top:50px;
    right:20%;
    width:160px;
    height:120px;
}
.login div {
    width: 100%;
    margin: 0;
    height: 30px;
}
.login div p {
  font-size: smaller;
}
.login div input {
    display: inline;
    margin-left: 5px;
    border: 1px solid;
    border-radius: 2px;
}
.login div input[type="text"] {
    display: inline;
    background-color: white;
    color:black;
    width:100px;
}
</style>
