<template>
    <div name='update' class='uproblems'>
      <div>
        <p id='pid'>题号</p><input type="text" ref="queryID" id="queryID" class="text" onmouseover="this.select()" v-on:input="searchByID" placeholder="填入题号" />
        <button type='submit' v-on:click="searchByID" >查询</button>
        <p id='pstatus' ref='pstatus' style="display:none;" />
      </div>
      <div><p>title</p><input type='text' ref='title' id='title' class='text' /></div>
      <div>
        <p>desc</p><textarea  ref='desc' id='desc' class='text'  />
        <img src='' ref='newimg' id='newimg' />
        <input type='file' ref='saveImage' id='saveImage' name="saveImage" v-on:change="selectedImage" />
        <input type='submit' ref='upImage' id='upImage' v-on:click="uploadImage" />
      </div>
      <div><p>in</p><input type='text' ref='in' id='in' class='text'  /></div>
      <div><p>out</p><input type='text' ref='out' id='out' class='text'  /></div>
      <button type='submit' v-on:click="update()" >更新</button>
      <button type='sumbit' v-on:click="del()" >删除</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditUpdate',
  props: {
  },
  computed: {
  },
  methods: {
    getQueryID: function () {
      const questID = this.$refs.queryID.value.trim()
      // document.getElementById('queryID').value.trim()
      if (questID === '') {
        this.$refs.pstatus.style = 'display:inline;color:red;font-size:smaller'
        this.$refs.pstatus.textContent = '<==填入题号'
        // document.getElementById('pstatus').style = 'display:inline;color:red;font-size:smaller'
        // document.getElementById('pstatus').textContent = '<==输入题号'
        return { status: false }
      } else if (!questID.match(/^[0-9]+$/)) {
        this.$refs.pstatus.style = 'display:inline;color:red;font-size:smaller'
        this.$refs.pstatus.textContent = '题号只能包含0-9的数字'
        // document.getElementById('pstatus').style = 'display:inline;color:red;font-size:smaller'
        // document.getElementById('pstatus').textContent = '题号只能包含0-9的数字'
        return { status: false }
      } else {
        return { status: true, questID: questID }
      }
    },
    update: async function () {
      const ret = this.getQueryID()
      if (ret.status === false) return
      const questID = ret.questID

      // const title = document.getElementById('title').value.trim()
      // const desc = document.getElementById('desc').value.trim()
      // const input = document.getElementById('in').value.trim()
      // const output = document.getElementById('out').value.trim()
      // const postBody = { pid: questID, t: title, d: desc, i: input, o: output }

      const title = this.$refs.title.value.trim()
      const desc = this.$refs.desc.value.trim()
      const input = this.$refs.in.value.trim()
      const output = this.$refs.out.value.trim()
      const postBody = { pid: questID, t: title, d: desc, i: input, o: output }
      await axios.post('http://127.0.0.1:80/api/updateByID', postBody)
        .then(response => {
          if (title === response.data.title && desc === response.data.desc && input === response.data.in && output === response.data.out && response.data.valid) {
            this.$refs.pstatus.style = 'display:inline;color:red;font-size:smaller'
            this.$refs.pstatus.textContent = '更新成功'
            // document.getElementById('pstatus').style = 'display:inline;color:red;font-size:smaller'
            // document.getElementById('pstatus').textContent = '更新成功'
          }
        })
        .catch(err => { alert(err) })
    },
    del: async function () {
      const ret = this.getQueryID()
      if (ret.status === false) return
      const questID = ret.questID

      const postBody = { pid: questID }
      await axios.post('http://127.0.0.1:80/api/deleteByID', postBody)
        .then(response => {
          // const title = document.getElementById('title').value.trim()
          // const desc = document.getElementById('desc').value.trim()
          // const input = document.getElementById('in').value.trim()
          // const output = document.getElementById('out').value.trim()
          const title = this.$refs.title.value.trim()
          const desc = this.$refs.desc.value.trim()
          const input = this.$refs.in.value.trim()
          const output = this.$refs.out.value.trim()
          if (title === response.data.title && desc === response.data.desc && input === response.data.in && output === response.data.out && !response.data.valid) {
            this.$refs.pstatus.style = 'display:inline;color:red;font-size:smaller'
            this.$refs.pstatus.textContent = '删除成功'
            // document.getElementById('pstatus').style = 'display:inline;color:red;font-size:smaller'
            // document.getElementById('pstatus').textContent = '删除成功'
          }
        })
        .catch(err => { alert(err) })
    },
    searchByID: async function () {
      const ret = this.getQueryID()
      if (ret.status === false) return
      const questID = ret.questID

      const postBody = { pid: questID }
      await axios.post('http://127.0.0.1:80/api/searchByID', postBody)
        .then(response => {
          if (!response.data) {
            // document.getElementById('title').value = ''
            // document.getElementById('desc').value = ''
            // document.getElementById('in').value = ''
            // document.getElementById('out').value = ''
            // document.getElementById('pstatus').style = 'display:inline;color:red;font-size:smaller'
            // document.getElementById('pstatus').textContent = '不存在该ID的题目!!!'
            this.$refs.title.value = ''
            this.$refs.desc.value = ''
            this.$refs.in.value = ''
            this.$refs.out.value = ''
            this.$refs.pstatus.style = 'display:inline;color:red;font-size:smaller'
            this.$refs.pstatus.textContent = '不存在该ID的题目!!!'
          } else {
            // document.getElementById('title').value = response.data.title
            // document.getElementById('desc').value = response.data.desc
            // document.getElementById('in').value = response.data.in
            // document.getElementById('out').value = response.data.out
            this.$refs.title.value = response.data.title
            this.$refs.desc.value = response.data.desc
            this.$refs.in.value = response.data.in
            this.$refs.out.value = response.data.out
            if (response.data.valid) {
              this.$refs.pstatus.style = 'display:none;'
              // document.getElementById('pstatus').style = 'display:none;'
            } else {
              this.$refs.pstatus.style = 'display:inline;color:red;font-size:smaller'
              this.$refs.pstatus.textContent = '该题目已经删除，可点击“更新”重启'
              // document.getElementById('pstatus').style = 'display:inline;color:red;font-size:smaller'
              // document.getElementById('pstatus').textContent = '该题目已经删除，可点击“更新”重启'
            }
          }
        })
        .catch(err => { alert(err) })
    },
    selectedImage: function () {
      var imgFile = this.$refs.saveImage.files[0]
      var fr = new FileReader()
      fr.onload = function () {
        document.getElementById('newimg').src = fr.result
        document.getElementById('newimg').style.display = 'block'
      }
      fr.readAsDataURL(imgFile)
    },
    uploadImage: async function () {
      const ret = this.getQueryID()
      if (ret.status === false) return

      const params = new FormData() // 创建一个form对象,以参数形式提供访问信息
      params.append('pid', ret.questID)

      const imgfile = this.$refs.saveImage.files[0]
      params.append('file', imgfile, imgfile.name) // append向form表单添加数据
      // 添加请求头，通过form添加的图片和文件的格式必须是multipart/form-data
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      await axios.post('http://127.0.0.1:80/api/saveImg', params, config)
        .then(response => {
          console.log(JSON.stringify(response.data))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted: function () {
    this._keyListener = function (e) {
      if (e.keyCode === 13) {
        this.searchByID()
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
#newimg {
  max-width: 100px;
  max-height: 100px;
  display: none;
}
</style>
