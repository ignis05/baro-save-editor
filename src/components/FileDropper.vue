<template>
  <v-card class="pa-4" elevation="1">
    <div class="h3 mb-1">Drag a file below to get started</div>
    <div
      class="dropzone"
      @drop.prevent="dropHandler"
      @click="dropzoneClickHandler"
      @dragenter.stop.prevent="dragEnter"
      @dragleave.stop.prevent="dragLeave"
      @dragover.stop.prevent
      :style="{ borderColor: hovered ? getBorderColor : '' }"
    ></div>
    <input
      ref="fileInput"
      class="dropzoneInput"
      type="file"
      @change="selectHandler"
      multiple="false"
      accept=".save,.sub,.xml"
    />
  </v-card>
</template>

<script>
import { DecompressSave } from '@/helpers/CompressionHelpers'

export default {
  props: {
    fromSubEditor: Boolean,
  },
  data() {
    return {
      hovered: false,
    }
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

        // uploads from submarine editor
        if (this.fromSubEditor) {
          if (!file.name.endsWith('.sub')) {
            // todo: v-alert here
            return console.warn('not a .sub file')
          }
          resultFile.data = resultRaw
          this.$store.dispatch('subUploaded', resultFile)
        }
        // uploads from save editor
        else {
          if (file.name.endsWith('.save')) {
            var save = DecompressSave(Buffer.from(resultRaw))
            resultFile.data = save
          } else if (file.name.endsWith('.sub')) {
            resultFile.data = resultRaw
          } else if (file.name.endsWith('.xml')) {
            resultFile.data = Buffer.from(resultRaw).toString('utf-8')
          } else {
            resultFile.data = resultRaw
          }
          this.$store.dispatch('fileUploaded', resultFile)
        }
      }
    },
    selectHandler(ev) {
      if (ev.target?.files[0]) this.loadFile(ev.target.files[0])
      ev.target.value = null
    },
    dropHandler(ev) {
      console.log('drop triggered')
      this.hovered = false
      if (ev.dataTransfer?.files[0]) this.loadFile(ev.dataTransfer.files[0])
    },
    dropzoneClickHandler() {
      this.$refs.fileInput.click()
    },
    dragEnter() {
      this.hovered = true
    },
    dragLeave() {
      this.hovered = false
    },
  },
  computed: {
    getBorderColor() {
      return this.$vuetify.theme.themes.dark.colors.secondary
    },
  },
}
</script>

<style scoped>
input.dropzoneInput {
  display: none;
}
.dropzone {
  border: 2px dashed #bbb;
  border-radius: 5px;
  padding: 50px;
  text-align: center;
  cursor: pointer;
  position: relative;
  background-image: url('~@/assets/file-upload-outline.png');
  background-position: center;
}
</style>
