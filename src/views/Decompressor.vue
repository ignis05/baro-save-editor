<template>
  <v-container>
    <!-- row 1 - info -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-text style="opacity: 1">
            <div class="text-white text-center text-h5">Simple save decompression and compression tools.</div>
            <div class="text-center d-flex flex-row justify-center align-center">
              Your save files should be in <span class="text-primary ml-2">{{ saveLocation }}</span>
              <v-icon title="Copy path to clipboard" @click="copyPath" color="secondary" class="iconButton ml-3">
                mdi-clipboard-outline
              </v-icon>
            </div>
            <div class="text-center mt-2">
              <span class="text-orange">Warning:</span> This tool uses experimental File System API - it might not work
              correctly in some browsers.<br />It's also unable to access directories where some system files might be
              (this includes anything inside AppData directory - so you will need to copy the saves you want to
              decompress somewhere accessible).
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- row 2 - dir selector -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-header class="text-h4 justify-center">Select working directory</v-card-header>
          <div class="d-flex justify-center align-center mb-4">
            <div
              class="mr-4 mb-0 text-white d-inline-flex text-h5 justify-center"
              style="
                min-width: 200px;
                border: 1px solid rgb(var(--v-theme-secondary));
                padding: 2px;
                border-radius: 5px;
              "
            >
              {{ workingDir.name || 'none' }}
            </div>
            <v-btn
              title="select directory"
              color="secondary"
              variant="outlined"
              type="icon"
              elevation="1"
              @click="selectWorkingDir"
            >
              <v-icon>mdi-folder-search-outline</v-icon>
            </v-btn>
            <v-btn
              title="refresh directory"
              class="ml-2"
              v-if="workingDir.handle"
              color="secondary"
              variant="outlined"
              type="icon"
              elevation="1"
              @click="scanWorkingDir"
            >
              <v-icon>mdi-folder-sync-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- row 3 - save list -->
    <v-row v-if="workingDir.handle">
      <v-col>
        <v-card>
          <v-card-header class="text-h5 justify-center">Detected saves</v-card-header>
          <div class="d-flex flex-column justify-start align-center mb-4">
            <div
              v-for="save of this.savesList"
              :key="save.name"
              style="width: 400px"
              class="d-flex flex-row justify-center align-center my-1"
            >
              <div style="font-size: 1.1em">{{ save.name }}</div>
              <v-spacer />
              <v-btn
                color="secondary"
                :disabled="!save.compressed"
                title="decompress"
                class="mx-1"
                type="icon"
                elevation="1"
                variant="outlined"
                @click="decompress(save)"
              >
                <v-icon>mdi-package-variant</v-icon>
              </v-btn>
              <v-btn
                color="secondary"
                :disabled="!save.decompressed"
                title="compress"
                class="mx-1"
                type="icon"
                elevation="1"
                variant="outlined"
                @click="compress(save)"
              >
                <v-icon>mdi-package-variant-closed</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- row 4 - usage info -->
    <v-row>
      <v-col>
        <v-card class="d-flex align-center justify-center">
          <v-card-text style="opacity: 1">
            How to use:
            <ol class="pl-4 mb-2">
              <li>Select a directory in a location accessible by the API (Desktop, Documents, etc.)</li>
              <li>The tool will detect all compressed and decompressed saves directly in that selected directory</li>
              <li><v-icon color="secondary">mdi-package-variant</v-icon> button decompresses the save</li>
              <li><v-icon color="secondary">mdi-package-variant-closed</v-icon> button compresses the save</li>
              <li>
                You can use <v-icon color="secondary">mdi-folder-sync-outline</v-icon> to refresh the current directory
                or <v-icon color="secondary">mdi-folder-search-outline</v-icon> to select a different one.
              </li>
            </ol>
            If file / directory with a matching name exists when compressing/decompressing the save, it will be
            overwritten.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import platform from 'platform-detect/os.mjs'
import { Buffer } from 'buffer'

import { DecompressSave, CompressSave } from '@/helpers/CompressionHelpers.js'

export default {
  data() {
    return {
      workingDir: {
        name: null,
        handle: null,
      },
      savesList: [],
    }
  },
  computed: {
    /**@type {String} */
    saveLocation() {
      if (platform.windows) return 'C:\\Users\\%username%\\AppData\\Local\\Daedalic Entertainment GmbH\\Barotrauma'
      if (platform.linux) return '/home/$USER/.local/share/Daedalic Entertainment GmbH/'
      if (platform.macos) return '/$USER/Library/Application Support/Daedalic Entertainment GmbH/'
      return '(unrecognized os)'
    },
  },
  methods: {
    /** Promps with File System API and runs scanWorkingDir */
    async selectWorkingDir() {
      try {
        var dirHandle = await window.showDirectoryPicker({
          id: 'DecompressorWorkingDir',
          startIn: 'desktop',
        })
      } catch (err) {
        // window.showDirectoryPicker is not a function
        if (err instanceof TypeError) {
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed to use the File System API. It seems like it's not supported by your browser.`,
          })
        }
        // user canceled file selector - do nothing
        if (err instanceof DOMException) {
          return
        }
        console.log(`directory picker failed:`)
        console.error(err)
      }
      // most likely user canceled file selector - do nothing
      if (!dirHandle) return

      this.workingDir.name = dirHandle.name
      this.workingDir.handle = dirHandle

      this.scanWorkingDir()

      this.$store.dispatch('showAlert', {
        type: 'success',
        text: `Opened ${dirHandle.name} as the working directory.`,
      })
    },
    /** Scans working dir, detecting compressed and decompressed saves */
    async scanWorkingDir() {
      let tempList = []
      for await (const [name, handle] of this.workingDir.handle.entries()) {
        // files
        if (handle.kind === 'file') {
          if (name.endsWith('.save')) {
            let existing = tempList.find((el) => el.name == name.slice(0, -5))
            if (existing) {
              existing.compressed = handle
            } else tempList.push({ name: name.slice(0, -5), compressed: handle })
          }
        }
        // directory
        else {
          for await (const [subName, subHandle] of handle.entries()) {
            if (subHandle.kind === 'file' && subName == 'gamesession.xml') {
              let existing = tempList.find((el) => el.name == name)
              if (existing) {
                existing.decompressed = handle
              } else tempList.push({ name: name, decompressed: handle })
            }
          }
        }
      }
      this.savesList = tempList
    },
    /** Copies save path to clipboard */
    async copyPath() {
      await navigator.clipboard.writeText(this.saveLocation)
      this.$store.dispatch('showAlert', {
        type: 'success',
        text: `Copied save path to system clipboard.`,
      })
    },

    async decompress(save) {
      /** @type {FileSystemFileHandle} */
      let saveFile = save.compressed
      if (!saveFile) return console.error(`no saveFile - decompress button should not be reachable`)

      // check and/or request write permission for working dir
      /** @type {FileSystemDirectoryHandle} */
      let workingDir = this.workingDir.handle
      if (!workingDir) return console.error(`no workingDir - decompress button should not be reachable`)
      if ((await workingDir.queryPermission({ mode: 'readwrite' })) !== 'granted')
        if ((await workingDir.requestPermission({ mode: 'readwrite' })) !== 'granted')
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed get file system permissions.`,
          })

      // read and decompress save file
      let fileContent = await saveFile.getFile()
      let buffer = Buffer.from(await fileContent.arrayBuffer())
      let saveData = DecompressSave(buffer)

      /** @type {FileSystemDirectoryHandle} */
      let saveDir = save.decompressed
      // create output dir if doesnt exist
      saveDir ||= await workingDir.getDirectoryHandle(save.name, { create: true })

      // clear output dir if exists
      for await (const [name, handle] of saveDir.entries()) {
        if (handle.kind === 'file') await saveDir.removeEntry(name)
      }

      // create files in saveDir
      for (let [file, content] of Object.entries(saveData)) {
        let handle = await saveDir.getFileHandle(file, { create: true })
        let writable = await handle.createWritable()
        let blob = new Blob([content])
        await writable.write(blob)
        await writable.close()
      }

      this.scanWorkingDir()

      this.$store.dispatch('showAlert', {
        type: 'success',
        text: `Decompressed ${saveFile.name}`,
      })
    },
    // compressor methods
    async compress(save) {
      /** @type {FileSystemDirectoryHandle} */
      let saveDir = save.decompressed
      if (!saveDir) return console.error(`no saveDir - decompress button should not be reachable`)

      // check and/or request write permission for working dir
      /** @type {FileSystemDirectoryHandle} */
      let workingDir = this.workingDir.handle
      if (!workingDir) return console.error(`no workingDir - decompress button should not be reachable`)
      if ((await workingDir.queryPermission({ mode: 'readwrite' })) !== 'granted')
        if ((await workingDir.requestPermission({ mode: 'readwrite' })) !== 'granted')
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed get file system permissions.`,
          })

      // read files from dir and add them to the save
      const saveObject = {}
      for await (const [name, handle] of saveDir.entries()) {
        if (handle.kind !== 'file') continue
        let file = await handle.getFile()
        let buffer = Buffer.from(await file.arrayBuffer())
        saveObject[name] = buffer
      }

      // compress save
      let compressed = CompressSave(saveObject)
      let blob = new Blob([compressed.buffer], { type: 'application/gzip' })

      /** @type {FileSystemFileHandle} */
      let saveFile = save.compressed
      // create output dir if doesnt exist
      saveFile ||= await workingDir.getFileHandle(saveDir.name + '.save', { create: true })

      // open write stream and write compressed savefile
      let writable = await saveFile.createWritable()
      await writable.write(blob)
      await writable.close()

      this.scanWorkingDir()

      this.$store.dispatch('showAlert', {
        type: 'success',
        text: `Compressed ${save.name}`,
      })
    },
  },
}
</script>

<style scoped>
.iconButton {
  cursor: pointer;
}
</style>
