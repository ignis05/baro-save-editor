<template>
  <v-card elevation="1" class="pb-4">
    <v-card-header class="flex-column align-center">
      <v-card-title> Export from file </v-card-title>
    </v-card-header>
    <v-sheet class="d-flex flex-column align-center">
      <v-btn v-if="previewImage !== ''" color="primary" @click="downloadImage">Export preview image</v-btn>
      <v-btn
        color="primary"
        class="mt-2"
        v-for="sub of linkedSubmarines"
        :key="sub.snowflake"
        @click="downloadShuttle(sub.object)"
      >
        Export {{ sub.name }}
      </v-btn>
    </v-sheet>
  </v-card>
</template>

<script>
import { desanitized_js2xml, CompressSub } from '../helpers/CompressionHelpers'

export default {
  methods: {
    downloadShuttle(subObject) {
      // use String#replace to not modify original element in main sub
      let xmlString = desanitized_js2xml({ elements: [subObject] }).replace('LinkedSubmarine', 'Submarine')

      // compress
      let compressed = CompressSub(xmlString)

      // trigger download
      let a = document.createElement('a')
      a.href = URL.createObjectURL(new Blob([compressed.buffer], { type: 'application/gzip' }))
      a.download = `${subObject.attributes.name}.sub`
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

<style></style>
