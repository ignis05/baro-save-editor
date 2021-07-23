<template>
  <div
    class="dropzoneWrapper"
    @drop.prevent="dropHandler"
    @click="dropzoneClickHandler"
    @dragenter="dragEnter"
    @dragover="dragOver"
    @dragleave="dragLeave"
  >
    <p>Drop files here</p>
    <input
      ref="fileInput"
      class="dropzone"
      type="file"
      @change="selectHandler"
      multiple="false"
      accept=".save,.sub,.xml"
    />
  </div>
</template>

<script>
import { DecompressSave } from '../helpers/CompressionHelpers'

export default {
  data() {
    return {}
  },
  methods: {
    loadFile(file) {
      const reader = new FileReader()

      reader.readAsArrayBuffer(file)
      reader.onload = (e) => {
        /**@type {ArrayBuffer} */
        const resultRaw = e.target.result
        var resultFile = {
          name: file.name,
          data: null,
        }

        if (file.name.endsWith('.save')) {
          var save = DecompressSave(Buffer.from(resultRaw))
          resultFile.data = save
        } else if (file.name.endsWith('.sub')) {
        } else {
          resultFile.data = resultRaw.toString('utf-8')
        }
        this.$store.dispatch('fileUploaded', resultFile)
      }
    },
    selectHandler(ev) {
      if (ev.target?.files[0]) this.loadFile(ev.target.files[0])
      ev.target
    },
    dropHandler(ev) {
      if (ev.dataTransfer?.files[0]) this.loadFile(ev.dataTransfer.files[0])
    },
    dropzoneClickHandler(ev) {
      this.$refs.fileInput.click()
    },
    dragEnter(ev) {
      ev.stopPropagation()
      console.log('enter')
    },
    dragOver(ev) {
      ev.stopPropagation()
      console.log('over')
    },
    dragLeave(ev) {
      ev.stopPropagation()
      console.log('leave')
    },
  },
}
</script>

<style scoped>
input.dropzone {
  opacity: 0;
}
.dropzoneWrapper {
  border: 2px dashed #bbb;
  border-radius: 5px;
  padding: 50px;
  text-align: center;
  cursor: pointer;
}
</style>
