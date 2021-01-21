<template>
    <div class='content'>
      <ol class='titles' :start="start">
          <li v-for="item in items" :key="item.id">
            <a v-on:click="$emit('showProblem', item.id)">{{ item.title }}</a>
          </li>
      </ol>
      <ul class="pageno">
          <li v-for="p in pages" :key="p.no">
            <button v-if="p.no >= 1 && p.no != pageNo" v-on:click="jump(p.no)">{{ p.no }}</button>
            <button v-else-if="p.no >= 1 && p.no == pageNo" v-on:click="jump(p.no)" class="curPage">{{ p.no }}</button>
            <button v-else style="background-color:red">无</button>
          </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    pageNo: { type: Number, default: 1 }
  },
  computed: {
    start: function () { return this.pageNo * 10 - 9 },
    items: function () {
      var arr = []
      var i = 0
      while (i < 10) {
        var sn = this.pageNo * 10 - 9 + i
        arr[i] = { title: sn + '_题', id: sn }
        i += 1
      }
      return arr
    },
    pages: function () {
      var arr = []
      var minP = this.pageNo > 4 ? this.pageNo - 4 : 1
      var maxP = minP + 9
      var j = 0
      var i = minP
      while (i <= maxP) {
        arr[j] = { no: i }
        j += 1
        i++
      }
      return arr
    }
  },
  methods: {
    jump: function (pn) {
      this.pageNo = Number(pn)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    display: block;
    position: absolute;
    top: 20%;
    left: 20%;
    right: 20%;
    width: 60%;
    height: 70%;
    border-top: solid 1px;
}
.titles {
    align-items:baseline;
    text-align: left;
    height: 70%;
    border-bottom: solid 1px;
}
button {
    color:darkgreen;
}
button:hover {
    background-color:yellowgreen;
    color: red;
    font-size: large;
}
button:visited {
    text-decoration-color:crimson;
    background-color: lightgrey;
}
.pageno li {
    display: inline;
    width: 50px;
    margin: 2px;
    border-radius: 2px;
    border: none;
}
li button {
    display: inline;
    width: 50px;
    margin: 2px;
    border-radius: 2px;
    border:none;
}
a:hover {
    background-color: teal;
    text-decoration-color: white;
}
a:visited {
    text-decoration-color:crimson;
    background-color: lightgrey;
}
.curPage {
    color:whitesmoke;
    background-color:darkcyan;
}
</style>
