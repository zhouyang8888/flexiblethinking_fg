<template>
  <div class="login">
    <div><strong>姓名</strong><input type="text" v-model="name" placeholder='name'/></div>
    <div><strong>密码</strong><input type="text" v-model="pswd" placeholder='password'/></div>
    <div><input name="reg" type="submit" value="注册" v-on:click="register"/><input name="login" type="submit" value="登录" v-on:click="login"/></div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'

export default {
  name: 'Login',
  props: {
    name: { type: String, default: 'name' },
    pswd: { type: String, default: 'password' }
  },
  methods: {
    register: function () {
      const postBody = { name: this.name, md5pswd: md5(this.pswd) }
      axios.post('http://127.0.0.1:80/api/signup', postBody)
        .then(response => {
          if (response.data.statusCode >= 0) {
            this.$emit('loginSuc', response.data.uid)
          } else {
            alert(response.data.message)
          }
        })
        .catch(Error => {
          alert('signup ' + Error + ' : ' + this.name + ' ' + this.pswd)
        })
    },
    login: function () {
      const postBody = { name: this.name, md5pswd: md5(this.pswd) }
      axios.post('http://127.0.0.1:80/api/signin', postBody)
        .then(response => {
          if (response.data.statusCode >= 0) {
            this.$emit('loginSuc', response.data.uid)
          } else {
            alert(response.data.message)
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
      c = c.trim()
      if (c.startsWith('qwer=')) {
        const v = c.substr('qwer='.length(), c.length())
        const postBody = { check: v }
        axios.post('http://127.0.0.1:80/api/signincheck', postBody)
          .then(response => {
            if (response.data.statusCode >= 0) {
              this.name = response.data.message
              this.$emit('loginSuc', response.data.uid)
            }
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
    top:80px;
    right:20%;
    width:160px;
    height:90px;
}
.login div {
    width: 100%;
    margin: 0;
}
.login div input {
    display: inline;
    margin: 5px;
}
.login div input[type="text"] {
    display: inline;
    background-color: #336633;
    color:#FFFFFF;
    width:100px;
}
</style>
