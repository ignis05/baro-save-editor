<template>
  <v-container>
    <!-- row 1 - info -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-text style="opacity: 1">
            <div class="text-white text-center text-h5">Simple save decompression and compression tools.</div>
            <div class="text-center">
              Your save files are in <span class="text-primary">{{ saveLocation }}</span>
              <v-icon title="Copy path to clipboard" @click="copyPath" color="secondary" class="iconButton ml-4">
                mdi-clipboard-outline
              </v-icon>
            </div>
            <div class="text-center mt-2">
              <span class="text-orange">Warning:</span> this tool uses experimental File System API. It might not work
              correctly in some browsers and it can't access files outside of "safe" locations like Desktop, Documents,
              Downloads, etc.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- row 2 - tools -->
    <v-row>
      <!-- col 1 - decompressor -->
      <v-col>
        <v-card class="d-flex flex-column align-center pa-4">
          <div class="text-h4 text-center" style="width: 100%">Decompressor</div>
          <div class="d-flex justify-start align-center mt-2" style="width: 100%">
            <v-btn @click="selectDeInp" type="icon">
              <v-icon class="mr-1">mdi-file-find-outline</v-icon>
              <span>Select <span class="text-primary">.save</span> file</span>
            </v-btn>
            <div class="ml-4">
              Selected file: <span class="text-primary">{{ toDecompress.inpName || 'none' }}</span>
            </div>
          </div>
          <div class="d-flex justify-start align-center mt-2 mb-4" style="width: 100%">
            <v-btn @click="selectDeOut" type="icon">
              <v-icon class="mr-1">mdi-folder-search-outline</v-icon>
              <span>Select output dir</span>
            </v-btn>
            <div class="ml-4">
              Selected dir: <span class="text-primary">{{ toDecompress.outName || 'none' }}</span>
            </div>
          </div>
          <v-btn :disabled="!toDecompress.inp || !toDecompress.out" @click="decompress" type="icon" color="secondary">
            <v-icon>mdi-folder-zip-outline</v-icon>
            <span>Decompress</span>
          </v-btn>
        </v-card>
      </v-col>
      <!-- col 2 - compressor -->
      <v-col>
        <v-card class="d-flex flex-column align-center pa-4">
          <div class="text-h4 text-center" style="width: 100%">Compressor</div>
          <div class="d-flex justify-start align-center mt-2" style="width: 100%">
            <v-btn @click="selectCoInp" type="icon">
              <v-icon class="mr-1">mdi-folder-search-outline</v-icon>
              <span>Select input dir</span>
            </v-btn>
            <div class="ml-4">
              Selected dir: <span class="text-primary">{{ toCompress.inpName || 'none' }}</span>
            </div>
          </div>
          <div class="d-flex justify-start align-center mt-2 mb-4" style="width: 100%">
            <v-btn @click="selectCoOut" type="icon">
              <v-icon class="mr-1">mdi-file-download-outline</v-icon>
              <span>Select output file</span>
            </v-btn>
            <div class="ml-4">
              Selected file: <span class="text-primary">{{ toCompress.outName || 'none' }}</span>
            </div>
          </div>
          <v-btn :disabled="!toCompress.inp || !toCompress.out" @click="compress" type="icon" color="secondary">
            <v-icon>mdi-folder-zip-outline</v-icon>
            <span>Compress</span>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <!-- row 3 - specific info -->
    <v-row>
      <v-col>
        <v-card>
          <v-card-text style="opacity: 1">
            How to use:
            <ol class="pl-4 mb-2">
              <li>
                Make sure that whatever you select is in directory accessible by the API (Desktop, Documents, etc.)
              </li>
              <li>Select input .save file</li>
              <li>Select output directory</li>
              <li>Click "decompress"</li>
            </ol>
            Directory named like the selected savefile will be created in the output location and the save file will be
            decompressed into that directory.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text style="opacity: 1">
            How to use:
            <ol class="pl-4 mb-2">
              <li>
                Make sure that whatever you select is in directory accessible by the API (Desktop, Documents, etc.)
              </li>
              <li>Select input directory (after using the decompressor this will be selected automatically)</li>
              <li>Select output file (select an existing file or type the name of a new one)</li>
              <li>Click "compress"</li>
            </ol>
            All files from the input directory will be merged, compressed and written to the selected output file.
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
      toDecompress: {
        inpName: null,
        inp: null,
        outName: null,
        out: null,
      },
      toCompress: {
        inpName: null,
        inp: null,
        outName: null,
        out: null,
      },
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
    async copyPath() {
      await navigator.clipboard.writeText(this.saveLocation)
      this.$store.dispatch('showAlert', {
        type: 'success',
        text: `Copied save path to system clipboard.`,
      })
    },
    // decompressor methods
    async selectDeInp() {
      try {
        var [fileHandle] = await window.showOpenFilePicker({
          id: 'BaroSaveLocation',
          startIn: 'desktop',
          types: [
            {
              description: 'Barotrauma Save Files',
              accept: {
                'application/gzip': ['.save'],
              },
            },
          ],
        })
      } catch (err) {
        // window.showOpenFilePicker is not a function
        if (err instanceof TypeError) {
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed to use File System API. It seems like it's not supported by your browser.`,
          })
        }
        // user canceled file selector - do nothing
        if (err instanceof DOMException) {
          return
        }
        console.log(`file picker failed:`)
        console.error(err)
      }
      this.toDecompress.inpName = fileHandle.name
      this.toDecompress.inp = fileHandle
    },
    async selectDeOut() {
      try {
        var dirHandle = await window.showDirectoryPicker({
          id: 'BaroDeSaveLocation',
          startIn: 'desktop',
        })
      } catch (err) {
        // window.showDirectoryPicker is not a function
        if (err instanceof TypeError) {
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed to use File System API. It seems like it's not supported by your browser.`,
          })
        }
        // user canceled file selector - do nothing
        if (err instanceof DOMException) {
          return
        }
        console.log(`dor picker failed:`)
        console.error(err)
      }
      // most likely user canceled file selector - do nothing
      if (!dirHandle) return

      this.toDecompress.outName = dirHandle.name
      this.toDecompress.out = dirHandle
    },
    async decompress() {
      // verify and request read permission for .save file
      /** @type {FileSystemFileHandle} */
      let saveHandle = this.toDecompress.inp
      if (!saveHandle) return console.error(`no saveHandle - decompress button should not be reachable`)
      if ((await saveHandle.queryPermission({})) != 'granted')
        if ((await saveHandle.requestPermission({})) != 'granted')
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed get file system permissions.`,
          })

      // verify and request write permission for output dir
      /** @type {FileSystemDirectoryHandle} */
      let dirHandle = this.toDecompress.out
      if (!dirHandle) return console.error(`no dirHandle - decompress button should not be reachable`)
      if ((await dirHandle.queryPermission({ mode: 'readwrite' })) !== 'granted')
        if ((await dirHandle.requestPermission({ mode: 'readwrite' })) !== 'granted')
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed get file system permissions.`,
          })
      // read and decompress save file
      let saveFile = await saveHandle.getFile()
      let buffer = Buffer.from(await saveFile.arrayBuffer())
      let saveData = DecompressSave(buffer)

      // create output dir named like input file
      let outHandle = await dirHandle.getDirectoryHandle(saveHandle.name.replace('.', '_'), { create: true })

      // clear output dir if exists
      for await (const [name, handle] of outHandle.entries()) {
        if (handle.kind === 'file') await outHandle.removeEntry(name)
      }

      let counter = 0
      for (let [file, content] of Object.entries(saveData)) {
        let handle = await outHandle.getFileHandle(file, { create: true })
        let writable = await handle.createWritable()
        let blob = new Blob([content])
        await writable.write(blob)
        await writable.close()
        counter++
      }

      // set compressor input to decompressor output
      this.toCompress.inpName = outHandle.name
      this.toCompress.inp = outHandle

      this.$store.dispatch('showAlert', {
        type: 'success',
        text: `Succesfully saved ${counter} extracted files to ${outHandle.name}`,
      })
    },
    // compressor methods
    async selectCoInp() {
      try {
        var dirHandle = await window.showDirectoryPicker({
          id: 'BaroCoSaveLocation',
          startIn: 'desktop',
        })
      } catch (err) {
        // window.showDirectoryPicker is not a function
        if (err instanceof TypeError) {
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed to use File System API. It seems like it's not supported by your browser.`,
          })
        }
        // user canceled file selector - do nothing
        if (err instanceof DOMException) {
          return
        }
        console.log(`dor picker failed:`)
        console.error(err)
      }
      // most likely user canceled file selector - do nothing
      if (!dirHandle) return

      this.toCompress.inpName = dirHandle.name
      this.toCompress.inp = dirHandle
    },
    async selectCoOut() {
      try {
        var fileHandle = await window.showSaveFilePicker({
          id: 'BaroSaveLocation',
          startIn: 'desktop',
          types: [
            {
              description: 'Barotrauma Save Files',
              accept: {
                'application/gzip': ['.save'],
              },
            },
          ],
        })
      } catch (err) {
        // window.showSaveFilePicker is not a function
        if (err instanceof TypeError) {
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed to use File System API. It seems like it's not supported by your browser.`,
          })
        }
        // user canceled file selector - do nothing
        if (err instanceof DOMException) {
          return
        }
        console.log(`file picker failed:`)
        console.error(err)
      }
      this.toCompress.outName = fileHandle.name
      this.toCompress.out = fileHandle
    },
    async compress() {
      // verify and request read permission for input dir
      /** @type {FileSystemDirectoryHandle} */
      let dirHandle = this.toCompress.inp
      if (!dirHandle) return console.error(`no dirHandle - compress button should not be reachable`)
      if ((await dirHandle.queryPermission({})) !== 'granted')
        if ((await dirHandle.requestPermission({})) !== 'granted')
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed get file system permissions.`,
          })

      // verify and request write permission for .save file
      /** @type {FileSystemFileHandle} */
      let saveHandle = this.toCompress.out
      if (!saveHandle) return console.error(`no saveHandle - compress button should not be reachable`)
      if ((await saveHandle.queryPermission({ mode: 'readwrite' })) != 'granted')
        if ((await saveHandle.requestPermission({ mode: 'readwrite' })) != 'granted')
          return this.$store.dispatch('showAlert', {
            type: 'error',
            text: `Failed get file system permissions.`,
          })

      // read files from dir and add them to the save
      let counter = 0
      const save = {}
      for await (const [name, handle] of dirHandle.entries()) {
        if (handle.kind !== 'file') continue
        let file = await handle.getFile()
        let buffer = Buffer.from(await file.arrayBuffer())
        save[name] = buffer
        counter++
      }

      // compress save
      let compressed = CompressSave(save)
      let blob = new Blob([compressed.buffer], { type: 'application/gzip' })

      let writable = await saveHandle.createWritable()
      await writable.write(blob)
      await writable.close()

      this.$store.dispatch('showAlert', {
        type: 'success',
        text: `Succesfully created ${saveHandle.name} from ${counter} files in ${dirHandle.name}`,
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
