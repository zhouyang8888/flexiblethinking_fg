<template>
  <div>
  <div class='problem'>
    <h5>title</h5><p>{{ id }}_{{ title }}</p>
    <h5>desc</h5><p>{{ desc }}</p>
    <div class='container'>
      <input name="answerin" type="text" v-model="answer" placeholder="Fill in your answer here." v-on:mouseover="refill" />
      <button v-if="!show" type="submit" v-on:click="submit">提交</button>
      <img v-else-if="correct" src="../assets/right.png"/>
      <img v-else src="../assets/wrong.jpg"/>
    </div>
  </div>
  <button id='return' v-on:click="$emit('showList', Math.floor((id - 1) / 10 + 1))">返回</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Problem',
  props: {
    id: { type: Number, default: 1 },
    correct: Boolean,
    show: { type: Boolean, default: false },
    answer: String,
    problem: Object
  },
  computed: {
    title: function () { return this.problem.title },
    desc: function () { return this.problem.desc },
    in: function () { return this.problem.in },
    out: function () { return this.problem.out }
  },
  methods: {
    submit: function () {
      axios.get('/submit?id=' + this.id + '&answer=' + this.answer)
        .then(response => {
          alert('Submit:' + '/submit?id=' + this.id + '&answer=' + this.answer)
        })
        .catch(Error => {
          this.correct = false
          this.show = true
          alert('Submit Error:' + '/submit?id=' + this.id + '&answer=' + this.answer)
        })
    },
    refill: function () {
      if (this.correct !== true) {
        this.show = false
        document.getElementsByName('answerin')[0].select()
      }
    }
  },
  /* Fetch problem content when mounted */
  mounted: async function () {
    await axios.get('/problem?id=' + this.id)
      .then(response => console.log(response))
      .catch(err => { alert(err) })
  }
}
</script>

<style scoped>
  .problem {
    display: block;
    position: fixed;
    top: 20%;
    left: 20%;
    right: 20%;
    bottom: 20%;
    align-content: left;
    border-top: solid 1px;
    border-bottom: solid 1px;
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
 .container {
   height: 20px;
 }
 .container input {
   width: 200px;
   float: left;
 }
 .container button {
   float: left;
   margin-left: 20px;
 }
 .container img {
   width: auto;
   float: left;
   margin-left: 20px;
 }
 img {
   width: 20px;
   height: 20px;
 }
 #return {
   position: fixed;
   top: 85%;
   height: 20px;
 }

 button:hover {
    background-color:yellowgreen;
    color: red;
    font-weight: bolder;
 }
 button {
   border-radius: 2px;
   border: none;
   color:darkgreen;
   font-weight: bolder;
   background-color: lightgrey;
 }

</style>
