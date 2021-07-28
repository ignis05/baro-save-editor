<template>
  <v-col>
    <v-card elevation="1" class="pr-2">
      <v-btn color="secondary" :disabled="blockDownload" @click="download">Download</v-btn>
      <div class="float-right ma-1">
        Loaded file: <span class="text-primary">{{ filename }}</span> , Save date:
        <span class="text-primary">{{ modificationDate }}</span>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import { desanitized_js2xml, CompressSave, CompressSub, gsHeader } from '../helpers/CompressionHelpers'

export default {
  props: {
    blockDownload: Boolean,
  },
  computed: {
    filename() {
      return this.$store.state.savefileName || 'none'
    },
    modificationDate() {
      let timestamp = this.$store.state.gamesession.elements?.[0]?.attributes?.savetime
      if (!timestamp) return '-'
      let date = new Date(parseInt(timestamp) * 1000)
      return date.toLocaleString()
    },
  },
  methods: {
    download() {
      var save = {}

      // convert gamesession to xml string and prepend header
      save['gamesession.xml'] = gsHeader + desanitized_js2xml(this.$store.state.gamesession)

      // compress and attach .sub files
      for (let [subFileName, subObject] of Object.entries(this.$store.state.subfiles)) {
        save[subFileName] = CompressSub(desanitized_js2xml(subObject))
      }

      // merge and compress savefile
      var compressed = CompressSave(save)

      // trigger download
      var a = document.createElement('a')
      a.href = URL.createObjectURL(new Blob([compressed.buffer], { type: 'application/gzip' }))
      a.download = this.$store.state.savefileName
      a.click()
    },
  },
}
</script>

<style scoped></style>
