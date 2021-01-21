<template>
  <div class="fp">
    <div id='logo'><p>FlexibleThinking</p></div>
    <Login/>
    <Content v-if="toShowlist" :pageNo="pageNo" v-on:showProblem="updateProblemId" />
    <Problem v-else :id="problemId" v-on:showList="updatePageNo"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Content from '@/components/Content.vue'
import Problem from '@/components/Problem.vue'

export default {
  name: 'Frontpage',
  components: {
    Login,
    Content,
    Problem
  },
  props: {
    pageNo: { type: Number, default: 1 },
    problemId: { type: Number, default: 1 },
    toShowlist: { type: Boolean, default: true }
  },
  methods: {
    updateProblemId: function (pid) {
      this.problemId = pid
      this.toShowlist = false
    },
    updatePageNo: function (pno) {
      this.pageNo = pno
      this.toShowlist = true
    }
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
