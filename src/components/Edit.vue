<template>
   <div class='edit'>
      <div v-if="add">
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
      <div v-else name='update' class='uproblems'>
        <div><p id='pid'>题号</p><input type="text" id='queryID' class="text" value="0" /><button type='submit' v-on:click="searchByID" >查询</button><p id='pstatus' style='display:none;'>该题目已经删除，可点击“更新”重启</p></div>
        <div><p>title</p><input type='text' id='title' class='text' /></div>
        <div><p>desc</p><textarea  id='desc' class='text'  /></div>
        <div><p>in</p><input type='text'  id='in' class='text'  /></div>
        <div><p>out</p><input type='text'  id='out' class='text'  /></div>
        <button type='submit' v-on:click="update()" >更新</button>
        <button type='sumbit' v-on:click="del()" >删除</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Edit',
  props: {
  },
  data: function () {
    return {
      add: true,
      id: 0
    }
  },
  computed: {
  },
  methods: {
    addnew: function () {
      const lastid = this.id + 1
      const newsibling = document.createElement('li')
      const xxx = ['title', 'desc', 'in', 'out']
      const tag = ['input', 'textarea', 'input', 'input']
      const textstyle = 'width: 100%; border-radius: 5px; border-width: 1px;'
      const specificstyle = ['', 'height: 100px; font-family: Arial;', '', '']

      for (let i = 0; i < xxx.length; i++) {
        const p = document.createElement('p')
        p.innerText = xxx[i]
        const node = document.createElement(tag[i])
        node.style = textstyle + specificstyle[i]
        const div = document.createElement('div')
        div.appendChild(p)
        div.appendChild(node)
        div.style = 'text-align: left;'
        newsibling.appendChild(div)
      }
      document.getElementsByClassName('eproblems')[0].appendChild(newsibling)
      this.id = lastid
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
      alert(JSON.stringify(postBody))
      await axios.post('http://127.0.0.1:80/api/addproblem', postBody)
        .then(response => {
          alert(response.data.message)
        })
        .catch(err => { alert(err) })
    },
    update: async function () {
      const questID = document.getElementById('queryID').value.trim()
      const title = document.getElementById('title').value.trim()
      const desc = document.getElementById('desc').value.trim()
      const input = document.getElementById('in').value.trim()
      const output = document.getElementById('out').value.trim()
      const postBody = { pid: questID, t: title, d: desc, i: input, o: output }
      await axios.post('http://127.0.0.1:80/api/updateByID', postBody)
        .then(response => {
          alert(JSON.stringify(response.data))
        })
        .catch(err => { alert(err) })
    },
    del: async function () {
      const questID = document.getElementById('queryID').value.trim()
      const postBody = { pid: questID }
      await axios.post('http://127.0.0.1:80/api/deleteByID', postBody)
        .then(response => {
          alert(JSON.stringify(response.data))
        })
        .catch(err => { alert(err) })
    },
    searchByID: async function () {
      const questID = document.getElementById('queryID').value.trim()
      const postBody = { pid: questID }
      await axios.post('http://127.0.0.1:80/api/searchByID', postBody)
        .then(response => {
          if (!response.data) {
            document.getElementById('title').value = ''
            document.getElementById('desc').value = ''
            document.getElementById('in').value = ''
            document.getElementById('out').value = ''
            document.getElementById('pstatus').style = 'display:none;'
            alert('不存在该ID的题目!!!')
          } else {
            document.getElementById('title').value = response.data.title
            document.getElementById('desc').value = response.data.desc
            document.getElementById('in').value = response.data.in
            document.getElementById('out').value = response.data.out
            if (response.data.valid) {
              document.getElementById('pstatus').style = 'display:none;'
            } else {
              document.getElementById('pstatus').style = 'display:inline;color:red;'
            }
          }
        })
        .catch(err => { alert(err) })
    }
  },
  mounted: function () {
    this._keyListener = function (e) {
      if (e.ctrlKey && e.altKey && e.shiftKey) {
        this.add = !this.add
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
.edit {
  display: block;
  position: absolute;
  top: 20%;
  left: 20%;
  right: 20%;
  width: 60%;
  height: 70%;
  border-top: solid 1px;
}
.eproblems {
  padding-left: 0;
}
.eproblems li div {
  text-align: left;
}
.uproblems {
  text-align: left;
}
.text {
  width: 100%;
  border-radius: 5px;
  border-width: 1px;
}
#queryID {
  width: 20%;
  border-radius: 5px;
  border-width: 1px;
}
#pid {
  text-align: left;
  width: 20%;
  display: inline;
  padding-right: 20px;
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
