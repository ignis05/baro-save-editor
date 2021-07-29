<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Owned Submarines </v-card-title>
    </v-card-header>
    <v-sheet class="mb-2">
      <v-sheet
        v-for="sub of ownedSubList.map((el) => el.attributes.name)"
        :key="sub"
        class="d-flex flex-row justify-center px-4"
      >
        <div class="subname">{{ sub }}</div>
        <v-spacer></v-spacer>
        <v-icon title="download" color="secondary" class="iconButton" @click="downloadSub(sub)">
          mdi-file-download-outline
        </v-icon>
        <v-icon title="edit" color="secondary" class="iconButton" @click="editSub(sub)">
          mdi-clipboard-arrow-right-outline
        </v-icon>
        <v-icon title="delete" color="red" class="iconButton" @click="deleteSub(sub)">mdi-delete-outline</v-icon>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<script>
import { CompressSub, desanitized_js2xml } from '@/helpers/CompressionHelpers'

export default {
  computed: {
    ownedSubList() {
      return this.$store.state.gamesession.elements?.[0].elements.find((el) => el.name == 'ownedsubmarines').elements
    },
  },
  methods: {
    deleteSub(subName) {
      // remove from attached files
      let subFiles = this.$store.state.subfiles
      let subFilename = Object.keys(subFiles).find((file) => subFiles[file].elements[0].attributes.name === subName)
      if (!subFilename) return console.error(`Failed to delete ${subName} - not found in attached .sub files`)
      delete subFiles[subFilename]
      // remove from ownedsubmarines
      let index = this.ownedSubList.findIndex((el) => el.attributes.name === subName)
      if (index === -1) return console.error(`Failed to delete ${subName} - not found in ownedSubmarines`)
      this.ownedSubList.splice(index, 1)
    },
    downloadSub(subName) {
      let subFiles = this.$store.state.subfiles
      let subFilename = Object.keys(subFiles).find((file) => subFiles[file].elements[0].attributes.name === subName)
      if (!subFilename) return console.error(`Failed to download ${subName} - not found in attached .sub files`)
      // compress file
      let compressed = CompressSub(desanitized_js2xml(subFiles[subFilename]))
      // trigger download
      let a = document.createElement('a')
      a.href = URL.createObjectURL(new Blob([compressed.buffer], { type: 'application/gzip' }))
      a.download = subFilename
      a.click()
    },
    editSub(subName) {
      let subFiles = this.$store.state.subfiles
      let subFilename = Object.keys(subFiles).find((file) => subFiles[file].elements[0].attributes.name === subName)
      if (!subFilename) return console.error(`Failed to move ${subName} to editor - not found in attached .sub files`)
      this.$store.dispatch('subUploaded', {
        name: subFilename + '.raw',
        data: JSON.parse(JSON.stringify(subFiles[subFilename])),
      })
      this.$router.push('/SubTools')
    },
  },
}
</script>

<style scoped>
.iconButton {
  cursor: pointer;
}
</style>
