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
    title: function () { return 'Problem' },
    desc: function () { return 'desc' },
    in: function () { return 'in' },
    out: function () { return 'out' }
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
 }
 h5 {
   margin-left: 10px;
 }
 p {
   display: inline;
 }
</style>
