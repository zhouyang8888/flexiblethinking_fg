<template>
  <div>
    <ol class='eproblems'>
      <li>
        <div><p>title</p><input type='text' class='text' /></div>
        <div><p>desc</p><textarea  class='text'  /></div>
        <div><p>in</p><input type='text'  class='text'  /></div>
        <div><p>out</p><input type='text'  class='text'  /></div>
      </li>
    </ol>
    <button type='submit' v-on:click="addnew()" >添加</button><button type='sumbit' v-on:click="submitall()" >提交</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditNew',
  methods: {
    addnew: function () {
      const newsibling = document.createElement('li')
      const xxx = ['title', 'desc', 'in', 'out']
      const tag = ['input', 'textarea', 'input', 'input']
      const textstyle = 'width: 100%; border-radius: 5px; border-width: 1px;'
      const specificstyle = ['', 'height: 100px; font-family: Arial;', '', '']

      for (let i = 0; i < xxx.length; i++) {
        const p = document.createElement('p')
        p.innerText = xxx[i]
        p.style = 'font-size: larger; color: green;'
        const node = document.createElement(tag[i])
        node.style = textstyle + specificstyle[i]
        const div = document.createElement('div')
        div.appendChild(p)
        div.appendChild(node)
        div.style = 'text-align: left;'
        newsibling.appendChild(div)
      }
      document.getElementsByClassName('eproblems')[0].appendChild(newsibling)
    },
    submitall: async function () {
      const postBody = []
      const ol = document.getElementsByClassName('eproblems')[0]
      for (let i = 0; i < ol.childElementCount; i++) {
        const curLiNode = ol.childNodes[i]
        const title = curLiNode.childNodes[0].childNodes[1].value.trim()
        const desc = curLiNode.childNodes[1].childNodes[1].value.trim()
        const input = curLiNode.childNodes[2].childNodes[1].value.trim()
        const output = curLiNode.childNodes[3].childNodes[1].value.trim()
        postBody[i] = { title: title, desc: desc, in: input, out: output }
      }
      await axios.post('http://127.0.0.1:80/api/addproblem', postBody)
        .then(response => {
          alert(response.data.message)
        })
        .catch(err => { alert(err) })
    }
  }
}
</script>

<style scoped>
.eproblems {
  padding-left: 0;
}
.eproblems li div {
  text-align: left;
}
.text {
  width: 100%;
  border-radius: 5px;
  border-width: 1px;
}
textarea.text {
  height: 100px;
  font-family: Arial;
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
  margin: 5px
}
p {
  font-size: larger;
  color:green;
}
</style>
