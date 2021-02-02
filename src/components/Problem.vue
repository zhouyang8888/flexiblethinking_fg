<template>
  <div>
  <div class='problem'>
    <h5>title</h5><p>{{ pid }}_{{ title }}</p>
    <h5>desc</h5><p>{{ desc }}</p>
    <div class='container'>
      <input name="answerin" type="text" v-model="answer" placeholder="Fill in your answer here." v-on:mouseover="refill" />
      <button v-if="!show" type="submit" v-on:click="submit">提交</button>
      <img v-else-if="correct" src="../assets/right.png"/>
      <img v-else src="../assets/wrong.jpg"/>
    </div>
  </div>
  <button id='return' v-on:click="$emit('showList', Math.floor((pid - 1) / 10 + 1))">返回</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Problem',
  props: {
    uid: Number,
    pid: { type: Number, default: 1 }
  },
  data: function () {
    return {
      problem: '',
      answer: '',
      show: false,
      correct: false
    }
  },
  computed: {
    title: function () { return this.problem ? this.problem.title : '' },
    desc: function () { return this.problem ? this.problem.desc : '' },
    in: function () { return this.problem ? this.problem.in : '' },
    out: function () { return this.problem ? this.problem.out : '' }
  },
  methods: {
    submit: function () {
      // alert('UID:' + this.uid)
      if (!this.uid || this.uid < 0) {
        alert('请先登录！！！')
        return
      }
      if (!this.answer) {
        alert('请填写答案！！！')
        return
      }
      const postBody = { uid: this.uid, id: this.pid, ans: this.answer }
      axios.post('http://127.0.0.1:80/api/submit', postBody)
        .then(response => {
          this.correct = response.data.correct
          this.show = true
        })
        .catch(Error => {
          alert('Submit Error:' + '/submit?id=' + this.pid + '&answer=' + this.answer)
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
    const postBody = { id: this.pid }
    await axios.post('http://127.0.0.1:80/api/problem', postBody)
      .then(response => {
        this.problem = response.data
      })
      .catch(err => { alert(err) })

    this._keyListener = function (e) {
      if (e.keyCode === 8) {
        this.$emit('showList', Math.floor((this.pid - 1) / 10 + 1))
      } else if (e.keyCode === 13) {
        this.submit()
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
