<template>
  <div class="login" v-on:mouseenter="pop" v-on:mouseleave="hide">
    <div>
      <p ref='warning' :style="warningStyle">{{ warningInfo }}</p>
    </div>
    <div><strong>姓名</strong><input type="text" ref='name' class='logintext' v-model="name" placeholder='name' v-on:input="$refs.name.style = inputTextNormalStyle" v-on:mouseenter="$refs.name.style = inputTextNormalStyle; $refs.name.select()" /></div>
    <div><strong>密码</strong><input type="password" ref='pswd' class='logintext' v-model="pswd" placeholder='password'  v-on:input="$refs.pswd.style = inputTextNormalStyle" v-on:mouseenter="$refs.pswd.style = inputTextNormalStyle; $refs.pswd.select()" /></div>
    <div v-if="!logined"><input name="reg" type="submit" value="注册" v-on:click="register"/><input name="login" type="submit" value="登录" v-on:click="login"/></div>
    <div v-else><input name="logout" type="submit" value="退出" v-on:click="logout"/></div>
    <div class='statistics' ref='statistics'>
      <p>提交正确: <span>{{ numSubmitOK }}</span> / <span>{{ numSubmits }}</span></p>
      <p>问题正确: <span>{{ numProbOK }}</span> / <span>{{ numProb }}</span></p>
    </div>
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
      uid: -1,
      logined: false,
      name: '',
      pswd: '',
      warningInfo: '',
      warningStyle: this.invisibleWarningStyle,

      numSubmits: 0,
      numProb: 0,
      numSubmitOK: 0,
      numProbOK: 0
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
        this.$emit('loginSuc', -1)
        this.uid = -1
        vueCookies.remove('qwer')
        return
      } else if (!this.pswd) {
        this.$refs.pswd.style = this.inputTextWarningStyle
        this.warningInfo = '请填入密码'
        this.warningStyle = this.redWarningStyle
        this.$emit('loginSuc', -1)
        this.uid = -1
        vueCookies.remove('qwer')
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
            }
            this.warningStyle = this.greenWarningStyle
            this.$emit('loginSuc', resp.uid)
            this.uid = resp.uid
            this.logined = true
          } else {
            if (resp.statusCode === -11) {
              this.$refs.pswd.style = this.inputTextWarningStyle
            } else if (resp.statusCode === -12) { // -12
              this.$refs.name.style = this.inputTextWarningStyle
            }
            this.$refs.warning.style = this.redWarningStyle
            this.$emit('loginSuc', -1)
            this.uid = -1
            vueCookies.remove('qwer')
          }
        })
        .catch(Error => {
          this.$emit('loginSuc', -1)
          this.uid = -1
          vueCookies.remove('qwer')
          alert('login ' + Error + ' : ' + this.name + ' ' + this.pswd)
        })
    },
    logout: function () {
      this.$emit('loginSuc', -1)
      this.uid = -1
      vueCookies.remove('qwer')
      this.logined = false
      this.warningInfo = '请登录'
      this.warningStyle = this.redWarningStyle
      this.pswd = ''
    },
    pop: function () {
      if (this.uid > 0) {
        const postBody = { uid: this.uid }
        axios.post('http://127.0.0.1:80/api/statistics', postBody)
          .then(response => {
            this.numSubmits = response.data.numSubmits
            this.numSubmitOK = response.data.numSubmitOK
            this.numProb = response.data.numProb
            this.numProbOK = response.data.numProbOK
            this.$refs.statistics.style.display = 'block'
          })
          .catch(e => {
            alert(e)
          })
      }
    },
    hide: function () {
      this.$refs.statistics.style.display = 'none'
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
              this.uid = response.data.uid
              this.logined = true
            }
          })
          .catch(Error => {
            alert('Auto login' + Error + ' : ' + c)
          })
        break
      }
    }

    this._keyListener = function (e) {
      if (e.keyCode === 13) {
        if (document.activeElement === this.$refs.name || document.activeElement === this.$refs.pswd) {
          this.login()
        }
      }
    }
    document.addEventListener('keydown', this._keyListener.bind(this))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
    display: block;
    position: absolute;
    bottom:80%;
    right:20%;
    width:160px;
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
.login div input[class="logintext"] {
    display: inline;
    background-color: white;
    color:black;
    width:100px;
}
.statistics {
  display: none;
  position: fixed;
  top: 10%;
  left: 80%;
  transform: translateX(0%) translateY(-50%);
  z-index: 100;
}
.statistics p {
  text-align: left;
}
.statistics p span {
  color: red;
  width: 20px;
}
</style>
