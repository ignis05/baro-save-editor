<template>
  <v-card elevation="1" class="pb-4">
    <v-card-header class="flex-column align-center">
      <v-card-title> Export from file </v-card-title>
    </v-card-header>
    <v-sheet class="d-flex flex-column align-center">
      <!-- preview image -->
      <v-sheet
        v-if="previewImage !== ''"
        class="d-flex flex-row justify-center align-center mt-2 px-4"
        style="width: 100%"
      >
        <div class="d-flex flex-row justify-center align-center">Preview Image</div>
        <v-spacer></v-spacer>
        <v-icon class="iconButton" color="secondary" @click="downloadImage()">mdi-file-download-outline</v-icon>
      </v-sheet>
      <!-- linked submarines -->
      <v-sheet
        class="d-flex flex-row justify-center align-center mt-2 px-4"
        style="width: 100%"
        v-for="sub of linkedSubmarines"
        :key="sub.snowflake"
      >
        <div class="d-flex flex-row justify-center align-center">{{ sub.name }}</div>
        <v-spacer></v-spacer>
        <v-icon class="iconButton" color="secondary" @click="downloadShuttle(sub.object)"
          >mdi-file-download-outline
        </v-icon>
      </v-sheet>
      <!-- when no preview image or linked submarines -->
      <div v-if="previewImage == '' && linkedSubmarines.length == 0" class="text-center text-grey">
        Nothing suitable for export found
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import _clone from 'lodash/clone'
import { desanitized_js2xml, CompressSub } from '../helpers/CompressionHelpers'

export default {
  methods: {
    downloadShuttle(subObject) {
      // clone object to avoid modifying original one
      let subClone = _clone(subObject)
      subClone.name = 'Submarine'

      // wrap and convert to xml
      let xmlString = desanitized_js2xml({ elements: [subClone] })

      // compress
      let compressed = CompressSub(xmlString)

      // trigger download
      let a = document.createElement('a')
      a.href = URL.createObjectURL(new Blob([compressed.buffer], { type: 'application/gzip' }))
      a.download = `${subClone.attributes.name}.sub`
      a.click()
    },
    downloadImage() {
      var a = document.createElement('a')
      a.href = 'data:image/png;base64,' + this.previewImage
      a.download = `${this.$store.state.editorSubmarine.filename.slice(0, -4)}.png`
      a.click()
    },
  },
  computed: {
    linkedSubmarines() {
      return this.$store.state.editorSubmarine.data.elements[0].elements
        .filter((el) => el.name === 'LinkedSubmarine')
        .map((el) => {
          return { name: el.attributes.name, object: el, snowflake: el.attributes.linkedto }
        })
    },
    /** @returns {String} base64 preview image or empty string*/
    previewImage() {
      return this.$store.state.editorSubmarine.data.elements[0].attributes?.previewimage || ''
    },
  },
}
</script>

<style>
.iconButton {
  cursor: pointer;
}
</style>
