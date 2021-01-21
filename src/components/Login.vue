<template>
  <div class="login">
    <div><strong>姓名</strong><input type="text" v-model="name" placeholder='name'/></div>
    <div><strong>密码</strong><input type="text" v-model="pswd" placeholder='password'/></div>
    <div><input name="reg" type="submit" value="注册" v-on:click="register"/><input name="login" type="submit" value="登录" v-on:click="login"/></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  props: {
    name: { type: String, default: 'name' },
    pswd: { type: String, default: 'password' }
  },
  methods: {
    register: function () {
      axios.get("'/signup?name='name'&pswd='pswd")
        .then(response => {
        // aaaaa
        })
        .catch(Error => {
          alert('signup ' + Error + ' : ' + this.name + ' ' + this.pswd)
        })
    },
    login: function () {
      axios.get("'/login?name='name'&pswd='pswd")
        .then(response => {
        // aaaaa
        })
        .catch(Error => {
          alert('login ' + Error + ' : ' + this.name + ' ' + this.pswd)
        })
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
