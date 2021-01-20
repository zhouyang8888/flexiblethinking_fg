<template>
    <div class='content'>
      <ol class='titles'>
          <li v-for="item in items" :key="item.id">
            <a :href="'/list/' + item.id">{{ item.title }}</a>
          </li>
      </ol>
      <ul class="pageno">
          <li v-for="p in ps" :key="p.no">
            <button v-on:click="jump(p.no)">{{ p.no }}</button>
          </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    items: Array,
    ps: Array
  },
  methods: {
    jump: function (pageNo) {
      this.items = [{ title: pageNo + '_题1', id: pageNo * 10 + 1 }, { title: pageNo + '_题2', id: pageNo * 10 + 2 }, { title: pageNo + '_题3', id: pageNo * 10 + 3 }]
      this.ps = [{ no: pageNo - 1 }, { no: pageNo }, { no: pageNo + 1 }]
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
a {
    text-decoration: none;
}
a:hover {
    background-color: chartreuse;
}
a:visited {
    text-decoration-color:crimson;
    background-color: lightgrey;
}

.pageno * {
    display: inline;
    width: 50px;
    margin: 2px;
    background-color:lightgreen;
    border-radius: 2px;
    border-style:none;
}
</style>
