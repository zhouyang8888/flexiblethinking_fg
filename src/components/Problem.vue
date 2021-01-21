<template>
  <div class='problem'>
    <h5>title</h5><p>{{ id }}_{{ title }}</p>
    <h5>desc</h5><p>{{ desc }}</p>
    <h5>in</h5><p>{{ this.in }}</p>
    <h5>out</h5><p>{{ this.out }}</p>
    <button v-on:click="$emit('showList', Math.floor((id - 1) / 10 + 1))">关闭</button>
  </div>
</template>

<script>

export default {
  name: 'Problem',
  props: {
    id: { type: Number, required: true, default: 1 }
  },
  computed: {
    title: function () { return '题目' },
    desc: function () { return '内容描述' },
    in: function () { return '样例输入' },
    out: function () { return '期望输出' }
  }
}
</script>

<style scoped>
  .problem {
    display: block;
    position: absolute;
    top: 20%;
    left: 20%;
    right: 20%;
    width: 60%;
    height: 70%;
    border-top: solid 1px;
    align-content: left;
 }
 h5 {
   text-align: left;
   margin-left: 10px;
 }
 p {
   text-align: left;
   text-indent: 50px;
 }
 p::first-letter {
   font-size: larger;
   color: red;
   font-weight: bolder;
 }
</style>
