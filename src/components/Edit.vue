<template>
   <div class='edit'>
      <EditNew v-if="add" />
      <EditUpdate v-else />
    </div>
</template>

<script>
import EditUpdate from '@/components/EditUpdate.vue'
import EditNew from '@/components/EditNew.vue'

export default {
  name: 'Edit',
  components: {
    EditUpdate,
    EditNew
  },
  data: function () {
    return {
      add: true
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
</style>
