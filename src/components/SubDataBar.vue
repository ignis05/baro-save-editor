<template>
  <v-col>
    <v-card elevation="1" class="pr-2">
      <v-btn class="mr-4" color="secondary" :disabled="blockDownload" @click="download">Download</v-btn>
      <v-icon
        size="32"
        title="load to savefile"
        :color="buttonActive ? 'secondary' : 'grey'"
        :class="{ iconButton: buttonActive }"
        @click="pushToSaveEditor"
      >
        mdi-clipboard-arrow-left-outline
      </v-icon>
      <div class="float-right ma-1">
        Loaded file: <span class="text-primary">{{ filename }}</span> ,   submarine name:
        <span class="text-primary">{{ subname }}</span>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'

import { desanitized_js2xml, CompressSub } from '@/helpers/CompressionHelpers'

export default {
  props: {
    blockDownload: Boolean,
  },
  computed: {
    ...mapGetters(['saveLoaded']),
    filename() {
      return this.$store.state.editorSubmarine.filename || 'none'
    },
    subname() {
      return this.$store.state.editorSubmarine.data?.elements?.[0].attributes.name || '-'
    },
    buttonActive() {
      return this.saveLoaded && !this.blockDownload
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
    pushToSaveEditor() {
      if (!this.buttonActive) return
      this.$store.dispatch('fileUploaded', {
        name: this.filename + '.raw',
        data: this.$store.state.editorSubmarine.data,
      })
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.iconButton {
  cursor: pointer;
}
</style>
