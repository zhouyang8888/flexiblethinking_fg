<template>
  <div class="login">
    <div><strong>姓名</strong><input type="text" name="name" v-bind:value="name"/></div>
    <div><strong>密码</strong><input name='pswd' type="text" v-bind:value="pswd"/></div>
    <div><input name="reg" type="submit" value="注册" /><input name="login" type="submit" value="登录" /></div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    name: String,
    pswd: String
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
