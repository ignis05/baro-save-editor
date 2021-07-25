import { createStore } from 'vuex'
import { xml2js } from 'xml-js'
import { DecompressSub } from '../helpers/CompressionHelpers'

export default createStore({
  state: {
    gamesession: {},
    savefileName: null,
    subfiles: {},
  },
  getters: {
    saveLoaded: (state) => {
      return state.savefileName !== null
    },
    isMultiPlayer: (state) => {
      return state.gamesession.elements?.[0]?.elements?.findIndex((el) => el.name === 'MultiPlayerCampaign') !== -1
    },
    campaign: (state) => {
      return state.gamesession.elements?.[0]?.elements?.find(
        (el) => el.name === 'MultiPlayerCampaign' || el.name === 'SinglePlayerCampaign',
      )
    },
  },
  mutations: {
    SET_SAVEFILENAME(state, newName) {
      state.savefileName = newName
    },
    SET_GAMESESSION(state, newData) {
      state.gamesession = newData
    },
    CLEAR_SUBFILES(state) {
      state.subfiles = {}
    },
    ADD_SUBFILE(state, { name, data }) {
      state.subfiles[name] = data
    },
  },
  actions: {
    clearSubFiles({ commit }) {
      commit('CLEAR_SUBFILES')
    },
    fileUploaded({ commit }, file) {
      console.log(`Received file ${file.name}`)

      if (file.name.endsWith('.save')) {
        commit('CLEAR_SUBFILES')
        commit('SET_SAVEFILENAME', file.name)

        // strips header - makes gamesssion the root of xml
        const stripSize = `<?xml version="1.0" encoding="utf-8"?>\n`.length
        var parsedGamesession = xml2js(file.data['gamesession.xml'].toString('utf-8').substring(stripSize))

        if (parsedGamesession.elements[0].name !== 'Gamesession') throw `Failed to parse gamesession.xml`
        console.dir(parsedGamesession)
        commit('SET_GAMESESSION', parsedGamesession)
        delete file.data['gamesession.xml'] // so it doesnt repeat when iterating through the rest

        // decompress and add .sub files
        for (let [filename, content] of Object.entries(file.data)) {
          if (filename.endsWith('.sub')) {
            let subObject = xml2js(DecompressSub(content))
            console.dir(subObject)
            commit('ADD_SUBFILE', { name: filename, data: subObject })
            let subName = subObject?.elements[0]?.attributes?.name
            if (!subName) {
              console.warn(`Failed to parse xml from ${filename} - file might be invalid`)
              // todo: replace with snackbar/v-alert warning message
            }
          } else {
            console.warn(`Failed to recognize file type: ${filename}`)
            // todo: replace with snackbar/v-alert warning message
          }
        }
      }
      // additional .sub file uploaded
      else if (file.name.endsWith('.sub')) {
        let subObject = xml2js(DecompressSub(file.data))
        commit('ADD_SUBFILE', { name: file.name, data: subObject })
        // todo: add it to owned submarines
      }
    },
  },
  modules: {},
})
