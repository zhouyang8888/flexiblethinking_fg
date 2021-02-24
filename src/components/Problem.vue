<template>
  <div>
  <div class='problem'>
    <h5>title</h5><p>{{ pid }}_{{ title }}</p>
    <h5>desc</h5>
    <p>{{ desc}}</p>
    <div v-if="this.imgs"><img v-for="(img, idx) in this.imgs" :key="img + '_' + idx" :src="'http://127.0.0.1:80/api/getImg/' + img" class="descimg" /></div>
    <div class='container'>
      <input v-if="!source" name="answerin" ref="answer" type="text" v-model="answer" placeholder="Fill in your answer here." v-on:mouseover="refill" />
      <textarea v-else name="answerin" ref="answer" v-model="answer" placeholder="Fill in your code here." v-on:mouseover="refill" />
      <div v-if="!show">
        <button type="submit" v-on:click="submit">提交</button>
        <form>
          <input type='radio' name='answtype' v-on:click="setAnswerType(true)" /><p>源码</p>
          <input type='radio' name='answtype' v-on:click="setAnswerType(false)" /><p>答案</p>
        </form>
      </div>
      <img v-else-if="correct" src="../assets/right.png" class="markimg" />
      <img v-else src="../assets/wrong.jpg" class="markimg" />
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
      correct: false,
      source: false
    }
  },
  computed: {
    title: function () { return this.problem ? this.problem.title : '' },
    desc: function () { return this.problem ? this.problem.desc : '' },
    in: function () { return this.problem ? this.problem.in : '' },
    out: function () { return this.problem ? this.problem.out : '' },
    imgs: function () { return this.problem ? this.problem.imgs : '' }
  },
  methods: {
    submit: function () {
      if (!this.uid || this.uid < 0) {
        alert('请先登录！！！')
        return
      }
      if (!this.answer) {
        alert('请填写答案！！！')
        return
      }
      const postBody = { uid: this.uid, id: this.pid, ans: this.answer }
      const url = 'http://127.0.0.1:80/api/' + (this.source ? 'submitsource' : 'submit')
      axios.post(url, postBody)
        .then(response => {
          this.correct = response.data.correct
          this.show = true
        })
        .catch(Error => {
          alert(Error)
        })
    },
    refill: function () {
      if (this.correct !== true) {
        this.show = false
        this.$refs.answer.select()
      }
    },
    setAnswerType: function (value) {
      this.source = value
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
      if (!this.source) {
        if (e.keyCode === 8) {
          if (document.activeElement.tagName.toLowerCase() !== 'input') {
            this.$emit('showList', Math.floor((this.pid - 1) / 10 + 1))
          }
        } else if (e.keyCode === 13 &&
         (document.activeElement === this.$refs.answer || document.activeElement.tagName.toLowerCase() !== 'input')) {
          this.submit()
        }
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
 .problem div {
   text-align: left;
   text-indent: 50px;
 }
 .descimg {
   max-width:100px;
   max-height:100px;
   width: auto;
   height: auto;
   margin-right: 10px;
   border:1px solid transparent;
   transition: all .1s;
 }
 .descimg:hover {
   border: 1px solid dimgrey;
   border-radius: 5px;
   -webkit-transform: scale(1.5);
   -moz-transform: scale(1.5);
   -ms-transform: scale(1.5);
   -o-transform: scale(1.5);
   transform: scale(1.5);
 }
 .descimg:active {
   max-height: 512px;
   max-width: 1024px;
   position: fixed;
   top:20%;
   right:20%;
   border: 1px solid dimgrey;
   border-radius: 5px;
   margin-right: 0;
   z-index: 10;
 }
 .container {
   padding-top: 20px;
   height: 60%;
 }
 .container input[type="text"] {
   width: 200px;
   height: 20px;
   float: left;
 }
 .container textarea {
   width: 60%;
   height: 60%;
   float: left;
 }
 .container button {
   float: left;
   margin-left: 20px;
 }
 form p {
   margin: 0;
   text-align: left;
   font-size: smaller;
   float: left;
   text-indent: 0;
 }
 form p::first-letter {
   font-size:unset;
   color: red;
   font-weight:unset;
 }
 input[type="radio"] {
   width: 20px;
   float: left;
 }
 .container img {
   width: auto;
   float: left;
   margin-left: 20px;
 }
 .markimg {
   width: 20px;
   height: 20px;
 }
 #return {
   position: fixed;
   top: 85%;
   height: 20px;
   z-index: -1;
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
