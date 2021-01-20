<template>
    <div class='content'>
      <ol class='titles' :start="start">
          <li v-for="item in items" :key="item.id">
            <a :href="'/list/' + item.id">{{ item.title }}</a>
          </li>
      </ol>
      <ul class="pageno">
          <li v-for="p in ps" :key="p.no">
            <button v-if="p.no >= 1" v-on:click="jump(p.no)">{{ p.no }}</button>
            <button v-else style="background-color:red">无</button>
          </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    start: { type: Number, default: 1 },
    items: Array,
    ps: Array
  },
  methods: {
    jump: function (pn) {
      var pageNo = Number(pn)
      this.items = [{ title: pageNo + '_题1', id: pageNo * 10 + 1 }, { title: pageNo + '_题2', id: pageNo * 10 + 2 }, { title: pageNo + '_题3', id: pageNo * 10 + 3 }]
      this.ps = [{ no: pageNo - 1 }, { no: pageNo }, { no: pageNo + 1 }]
      this.start = pageNo * 10 - 9
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
    background-color:teal;
    color: white;
}
button:visited {
    text-decoration-color:crimson;
    background-color: lightgrey;
}

.pageno * {
    display: inline;
    width: 50px;
    margin: 2px;
    border-radius: 2px;
    border-style:none;
}
</style>
