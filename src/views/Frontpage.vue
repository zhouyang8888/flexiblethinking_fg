<template>
  <div class="fp">
    <div id='logo'><p>FlexibleThinking</p></div>
    <div v-if="!imteacher">
      <Login v-on:loginSuc="updateUID"/>
      <Content v-if="toShowlist" :ppageNo="pageNo" v-on:showProblem="updateProblemId" />
      <Problem v-else :uid="uid" :pid="problemId" v-on:showList="updatePageNo"/>
    </div>
    <div v-else>
      <Edit/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Content from '@/components/Content.vue'
import Problem from '@/components/Problem.vue'
import Edit from '@/components/Edit.vue'

export default {
  name: 'Frontpage',
  components: {
    Login,
    Content,
    Problem,
    Edit
  },
  data: function () {
    return {
      pageNo: 1,
      problemId: 1,
      toShowlist: true,
      uid: null,
      imteacher: false
    }
  },
  methods: {
    updateProblemId: function (pid) {
      this.problemId = pid
      this.toShowlist = false
    },
    updatePageNo: function (pno) {
      this.pageNo = pno
      this.toShowlist = true
    },
    updateUID: function (uid) {
      this.uid = uid
    }
  },
  mounted: function () {
    this._keyListener = function (e) {
      if (e.key === 'o' && (e.ctrlKey || e.metaKey) && (e.altKey || e.shiftKey)) {
        this.imteacher = true
      }
    }
    document.addEventListener('keydown', this._keyListener.bind(this))
  },
  beforeDestroy: function () {
    document.removeEventListener('keydown', this._keyListener)
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
