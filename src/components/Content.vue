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
import axios from 'axios'

export default {
  name: 'Content',
  props: {
    pageNo: { type: Number, default: 1 }
  },
  data: function () {
    return {
      problems: [],
      pageCount: 0,
      pageStep: 10,
      pageMaxProblemCount: 10
    }
  },
  computed: {
    start: function () { return (this.pageNo - 1) * this.pageMaxProblemCount + 1 },
    items: function () {
      var arr = []
      var i = 0
      var sn = this.start
      if (this.problems) {
        while (i < this.problems.length) {
          arr[i] = { title: this.problems[i].title, id: sn }
          i++
          sn++
        }
      }
      return arr
    },
    pages: function () {
      var arr = []
      var halfPageStep = Math.floor(this.pageStep / 2)
      var minP = this.pageNo > halfPageStep ? this.pageNo - halfPageStep : 1
      var maxP = minP + this.pageStep < this.pageCount ? minP + this.pageStep : this.pageCount
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
    useData: function (response) {
      this.pageCount = response.data.pageCount
      this.problems = response.data.problems
    },
    /* getData to pull data by parameter pageNo and pageMaxProblemCount */
    getData: async function () {
      await axios.get('http://127.0.0.1:80/api/list?pn=' + this.pageNo + '&mpc=' + this.pageMaxProblemCount)
        .then(response => this.useData(response))
        .catch(err => { alert('#### ' + err + '  /list?pn=' + this.pageNo + '&mpc=' + this.pageMaxProblemCount) })
    },
    jump: function (pn) {
      this.pageNo = Number(pn)
      this.getData()
    }
  },
  /* Fetch problem content when mounted */
  mounted: function () {
    this.getData()
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
    font-weight: bolder;
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
    background-color:yellowgreen;
    color:red;
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
