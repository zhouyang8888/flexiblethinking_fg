<template>
  <div class="fp">
    <div id='logo'><p>FlexibleThinking</p></div>
    <Login name="name" pswd="password"/>
    <Content :start="1" :items="[{title: '题1', id:'1'}, {title: '题2', id:'2'}, {title: '题3', id:'3'}]" :ps="[{no:'1'},{no:'2'},{no:'3'}]" />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Content from '@/components/Content.vue'

export default {
  name: 'Frontpage',
  components: {
    Login,
    Content
  }
}
</script>

<style scoped>
#logo{
    display: block;
    position: absolute;
    left: 20%;
    height: 90px;
}
#logo p {
    position: relative;
    bottom: 0;
    font-weight: bold;
    font-size: 50px;
    font-family: Sofia, sans-serif;
    vertical-align: bottom;
    margin: 0;
}
#logo p::first-letter {
    color:#FF0000;
}
</style>
