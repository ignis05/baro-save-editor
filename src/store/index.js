import { createStore } from 'vuex'
import { xml2js } from 'xml-js'
import { DecompressSub, gsHeader } from '@/helpers/CompressionHelpers'

export default createStore({
  state: {
    editorSubmarine: { filename: null, data: {} },
    gamesession: {},
    savefileName: null,
    subfiles: {},
  },
  getters: {
    campaign: (state) => {
      return state.gamesession.elements?.[0]?.elements?.find(
        (el) => el.name === 'MultiPlayerCampaign' || el.name === 'SinglePlayerCampaign',
      )
    },
    isMultiPlayer: (state) => {
      return state.gamesession.elements?.[0]?.elements?.findIndex((el) => el.name === 'MultiPlayerCampaign') !== -1
    },
    saveLoaded: (state) => {
      return state.savefileName !== null
    },
    sub: (state) => {
      return state.editorSubmarine.data?.elements?.[0]
    },
    subLoaded: (state) => {
      return state.editorSubmarine.filename !== null
    },
  },
  mutations: {
    SET_SAVEFILENAME(state, newName) {
      state.savefileName = newName
    },
    SET_GAMESESSION(state, newData) {
      state.gamesession = newData
    },
    // clear submarine files attached to savefile
    CLEAR_SUBFILES(state) {
      state.subfiles = {}
    },
    // add submarine file as attached to savefile
    ADD_SUBFILE(state, { name, data }) {
      state.subfiles[name] = data
    },
    // set submarine file for submarine editor
    SET_SUBFILE(state, { name, data }) {
      state.editorSubmarine.filename = name
      state.editorSubmarine.data = data
    },
  },
  actions: {
    clearSubFiles({ commit }) {
      commit('CLEAR_SUBFILES')
    },
    subUploaded({ commit }, file) {
      // .sub submarine
      if (file.name.endsWith('.sub')) {
        let sub = xml2js(DecompressSub(Buffer.from(file.data)))
        commit('SET_SUBFILE', { name: file.name, data: sub })
      }
      // .xml submarine
      else if (file.name.endsWith('.xml')) {
        commit('SET_SUBFILE', { name: file.name.slice(0, -4) + '.sub', data: xml2js(file.data.toString('utf-8')) })
      }
      // transfer from save editor
      else if (file.name.endsWith('.raw')) {
        commit('SET_SUBFILE', { name: file.name.slice(0, -4), data: file.data })
      }
      // other file types
      else return console.error(`wrong file type uploaded - ${file.name}`)
    },
    fileUploaded({ commit, state }, file) {
      if (file.name.endsWith('.save')) {
        commit('CLEAR_SUBFILES')
        commit('SET_SAVEFILENAME', file.name)

        // strips header - makes gamesssion the root of xml
        let parsedGamesession = xml2js(file.data['gamesession.xml'].toString('utf-8').substring(gsHeader.length))

        if (parsedGamesession.elements[0].name !== 'Gamesession') throw `Failed to parse gamesession.xml`
        commit('SET_GAMESESSION', parsedGamesession)
        delete file.data['gamesession.xml'] // so it doesnt repeat when iterating through the rest

        // decompress and add .sub files
        for (let [filename, content] of Object.entries(file.data)) {
          if (filename.endsWith('.sub')) {
            let subObject = xml2js(DecompressSub(content))
            commit('ADD_SUBFILE', { name: filename, data: subObject })
            let subName = subObject?.elements[0]?.attributes?.name
            if (!subName) {
              console.warn(`Failed to parse xml from ${filename} - file might be invalid`)
              // todo: replace with v-alert warning message
            }
          } else {
            console.warn(`Failed to recognize file type: ${filename}`)
            // todo: replace with v-alert warning message
          }
        }
      } else if (!state.savefileName) return console.warn(`No .save file to attach additional files to`)
      // additional .sub file uploaded, or .raw transfer from submarine editor
      else if (file.name.endsWith('.sub') || file.name.endsWith('.raw')) {
        var subObject
        // raw js object
        if (file.name.endsWith('.raw')) {
          subObject = file.data
          file.name = file.name.substring(0, -4) // strip .raw extention
        }
        // normal .sub file
        else subObject = xml2js(DecompressSub(Buffer.from(file.data)))

        if (!state.subfiles[file.name]) {
          // todo: v-alert `adding new submarine ${file.name}`
          // push submarine name to ownedsubmarines list
          let subName = subObject.elements[0].attributes.name
          let ownedSubs = state.gamesession.elements?.[0].elements.find((el) => el.name == 'ownedsubmarines').elements
          ownedSubs.push({ type: 'element', name: 'sub', attributes: { name: subName } })
        } else {
          // todo: v-alert `updating existing submarine ${file.name}`
        }
        commit('ADD_SUBFILE', { name: file.name, data: subObject })
      }
      // gamesession.xml
      else if (file.name === 'gamesession.xml') {
        // strips header - makes gamesssion the root of xml
        let parsedGamesession = xml2js(file.data.substring(gsHeader.length))

        if (parsedGamesession.elements?.[0]?.name !== 'Gamesession') throw `Failed to parse gamesession.xml`
        // todo: v-alert replaced gamesession.xml
        commit('SET_GAMESESSION', parsedGamesession)
      } else {
        console.warn(`Failed to recognize file type: ${file.name}`)
        // todo: replace with v-alert warning message
      }
    },
  },
  modules: {},
})
