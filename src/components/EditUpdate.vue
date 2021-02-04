<template>
    <div name='update' class='uproblems'>
      <div>
        <p id='pid'>题号</p>
        <input type='text' id='questID' class='text' onmouseover="this.select()" v-on:input="searchByID" placeholder='填入题号' v-model="questID"/>
        <button type='submit' v-on:click="searchByID" >查询</button>
        <p id='pstatus' :style="pstatusStyle" >{{ pstatusText }}</p>
      </div>
      <div><p>title</p><input type='text' class='text' v-model="title"/></div>
      <div>
        <p>desc</p><textarea  class='text' v-model="desc" />
        <div v-if="this.imgs">
          <img v-for="img in this.imgs" :key="img" :src="'http://127.0.0.1:80/api/getImg/' + img" :style="descimgstyle" />
        </div>
        <img src='' ref='newimg' id='newimg' />
        <input type='file' ref='saveImage' id='saveImage' name="saveImage" v-on:change="selectedImage" />
        <input type='submit' ref='upImage' id='upImage' v-on:click="uploadImage" />
      </div>
      <div><p>in</p><input type='text' class='text' v-model="input" /></div>
      <div><p>out</p><input type='text' class='text' v-model="output" /></div>
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
  data: function () {
    return {
      questID: '',
      pstatusStyle: 'display:none;',
      pstatusText: '',
      title: '',
      desc: '',
      input: '',
      output: '',
      imgs: [],
      descimgstyle: 'max-width: 100px;max-height: 100px;display: inline;'
    }
  },
  methods: {
    getQueryID: function () {
      const questID = this.questID.trim()
      if (questID === '') {
        this.pstatusStyle = 'display:inline;color:red;font-size:smaller'
        this.pstatusText = '<==填入题号'
        return { status: false }
      } else if (!questID.match(/^[0-9]+$/)) {
        this.pstatusStyle = 'display:inline;color:red;font-size:smaller'
        this.pstatusText = '题号只能包含0-9的数字'
        return { status: false }
      } else {
        return { status: true, questID: questID }
      }
    },
    update: async function () {
      const ret = this.getQueryID()
      if (ret.status === false) return
      const questID = ret.questID

      const title = this.title.trim()
      const desc = this.desc.trim()
      const input = this.input.trim()
      const output = this.output.trim()
      const postBody = { pid: questID, t: title, d: desc, i: input, o: output }
      await axios.post('http://127.0.0.1:80/api/updateByID', postBody)
        .then(response => {
          if (title === response.data.title && desc === response.data.desc && input === response.data.in && output === response.data.out && response.data.valid) {
            this.pstatusStyle = 'display:inline;color:red;font-size:smaller'
            this.pstatusText = '更新成功'
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
          const title = this.title.trim()
          const desc = this.desc.trim()
          const input = this.input.trim()
          const output = this.output.trim()
          if (title === response.data.title && desc === response.data.desc && input === response.data.in && output === response.data.out && !response.data.valid) {
            this.pstatusStyle = 'display:inline;color:red;font-size:smaller'
            this.pstatusText = '删除成功'
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
            this.title = ''
            this.desc = ''
            this.input = ''
            this.output = ''
            this.pstatusStyle = 'display:inline;color:red;font-size:smaller'
            this.pstatusText = '不存在该ID的题目!!!'
          } else {
            this.title = response.data.title
            this.desc = response.data.desc
            this.input = response.data.in
            this.output = response.data.out
            this.imgs = response.data.imgs
            if (response.data.valid) {
              this.pstatusStyle = 'display:none;'
            } else {
              this.pstatusStyle = 'display:inline;color:red;font-size:smaller'
              this.pstatusText = '该题目已经删除，可点击“更新”重启'
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
          alert(JSON.stringify(response.data))
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
#questID {
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
