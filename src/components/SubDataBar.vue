<template>
  <v-col>
    <v-card elevation="1">
      <v-btn color="secondary" :disabled="blockDownload" @click="download">Download</v-btn>
      <div class="float-right ma-1">
        Loaded file: <span class="text-primary">{{ filename }}</span> ,   submarine name:
        <span class="text-primary">{{ subname }}</span>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import { desanitized_js2xml, CompressSub } from '../helpers/CompressionHelpers'

export default {
  props: {
    blockDownload: Boolean,
  },
  computed: {
    filename() {
      return this.$store.state.editorSubmarine.filename || 'none'
    },
    subname() {
      return this.$store.state.editorSubmarine.data?.elements?.[0].attributes.name || '-'
    },
  },
  methods: {
    download() {
      // compress file
      let compressed = CompressSub(desanitized_js2xml(this.$store.state.editorSubmarine.data))

      // trigger download
      let a = document.createElement('a')
      a.href = URL.createObjectURL(new Blob([compressed.buffer], { type: 'application/gzip' }))
      a.download = this.$store.state.editorSubmarine.filename
      a.click()
    },
  },
}
</script>

<style scoped></style>
