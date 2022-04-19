import { createStore } from 'vuex'
import { xml2js } from 'xml-js'
import { Buffer } from 'buffer'
import _random from 'lodash/random'

import { DecompressSub, gsHeader } from '@/helpers/CompressionHelpers'
import fixOldSave from '@/helpers/fixOldSave'

export default createStore({
  state: {
    alert: false,
    alertTimout: null,
    editorSubmarine: { filename: null, data: {} },
    gamesession: {},
    isLoading: false,
    savefileName: null,
    subfiles: {},
    playerCharacters: [],
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
    SET_ALERT(state, value) {
      state.alert = value
    },
    SET_ALERT_TIMEOUT(state, fn) {
      state.alertTimout = setTimeout(fn, 10000)
    },
    CLEAR_ALERT_TIMEOUT(state) {
      clearTimeout(state.alertTimout)
    },
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
    // add characters to the SP crew
    ADD_CHARACTERS(state, characters) {
      let crew = state.gamesession.elements[0].elements
        ?.find((el) => el.name === 'SinglePlayerCampaign')
        .elements.find((el) => el.name === 'crew')
      for (let char of characters) crew.elements.push(char)
    },
    // add characters to the MP bot crew
    ADD_BOTS(state, characters) {
      let bots = state.gamesession.elements?.[0]?.elements
        ?.find((el) => el.name === 'MultiPlayerCampaign')
        .elements.find((el) => el.name === 'bots')
      if (bots.attributes.hasbots !== 'true') bots.attributes.hasbots = 'true'
      if (!bots.elements) bots.elements = []
      for (let char of characters) bots.elements.push(char)
    },
    // sets isLoading
    SET_LOADING(state, value) {
      state.isLoading = value
    },
    CLEAR_PLAYERS(state) {
      state.playerCharacters = []
    },
  },
  actions: {
    showAlert({ commit }, value) {
      if (!value) {
        commit('CLEAR_ALERT_TIMEOUT')
        commit('SET_ALERT', false)
      }
      commit('SET_ALERT', value)
      commit('SET_ALERT_TIMEOUT', () => {
        commit('SET_ALERT', false)
      })
    },
    clearSubFiles({ commit }) {
      commit('CLEAR_SUBFILES')
    },
    subUploaded({ commit, dispatch }, file) {
      // .sub submarine
      if (file.name.endsWith('.sub')) {
        let sub = xml2js(DecompressSub(Buffer.from(file.data)))
        commit('SET_SUBFILE', { name: file.name, data: sub })
      }
      // .xml submarine
      else if (file.name.endsWith('.xml')) {
        commit('SET_SUBFILE', {
          name: file.name.slice(0, -4) + '.sub',
          data: xml2js(Buffer.from(file.data).toString('utf-8')),
        })
      }
      // transfer from save editor
      else if (file.name.endsWith('.raw')) {
        commit('SET_SUBFILE', { name: file.name.slice(0, -4), data: file.data })
      }
      // other file types
      else {
        console.warn(`wrong file type uploaded - ${file.name}`)
        dispatch('showAlert', {
          type: 'warning',
          text: `Unrecognized file type: ${file.name}.`,
        })
      }
      commit('SET_LOADING', false)
    },
    fileUploaded({ commit, dispatch, state, getters }, file) {
      if (file.name.endsWith('.save')) {
        commit('CLEAR_SUBFILES')
        commit('CLEAR_PLAYERS')
        commit('SET_SAVEFILENAME', file.name)

        // strips header - makes gamesssion the root of xml
        let parsedGamesession = xml2js(file.data['gamesession.xml'].toString('utf-8').substring(gsHeader.length))

        if (parsedGamesession.elements[0].name !== 'Gamesession') throw `Failed to parse gamesession.xml`

        fixOldSave(parsedGamesession)

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
              dispatch('showAlert', {
                type: 'error',
                text: `Failed to parse xml from ${filename} - file might be invalid.`,
              })
            }
          } else {
            console.warn(`Unrecognized file type: ${filename}`)
            dispatch('showAlert', {
              type: 'warning',
              text: `Unrecognized file type: ${filename}.`,
            })
          }
        }
      } else if (!state.savefileName) {
        dispatch('showAlert', {
          type: 'info',
          text: `No .save file loaded to attach additional files to.`,
        })
        console.warn(`No .save file to attach additional files to`)
      }
      // additional .sub file uploaded, or .raw transfer from submarine editor
      else if (file.name.endsWith('.sub') || file.name.endsWith('.raw')) {
        console.log(`received ${file.name}`)
        var subObject
        // raw js object
        if (file.name.endsWith('.raw')) {
          subObject = file.data
          file.name = file.name.slice(0, -4) // strip .raw extention
        }
        // normal .sub file
        else subObject = xml2js(DecompressSub(Buffer.from(file.data)))
        console.log(`final: ${file.name}`)

        if (!state.subfiles[file.name]) {
          // push submarine name to ownedsubmarines list
          let subName = subObject.elements[0].attributes.name
          let ownedSubs = state.gamesession.elements?.[0].elements.find((el) => el.name == 'ownedsubmarines').elements
          ownedSubs.push({ type: 'element', name: 'sub', attributes: { name: subName } })
          dispatch('showAlert', {
            type: 'success',
            text: `Added new owned submarine "${subName}" and attached "${file.name}" to the save file.`,
          })
        } else {
          dispatch('showAlert', {
            type: 'success',
            text: `Updated owned submarine file "${file.name}"`,
          })
        }
        commit('ADD_SUBFILE', { name: file.name, data: subObject })
      }
      // gamesession.xml
      else if (file.name === 'gamesession.xml') {
        // strips header - makes gamesssion the root of xml
        let parsedGamesession = xml2js(file.data.substring(gsHeader.length))

        if (parsedGamesession.elements?.[0]?.name !== 'Gamesession') throw `Failed to parse gamesession.xml`

        fixOldSave(parsedGamesession)

        commit('SET_GAMESESSION', parsedGamesession)
        dispatch('showAlert', {
          type: 'success',
          text: `Updated gamesession.xml file.`,
        })
      } else if (file.name.endsWith('CharacterData.xml')) {
        let dataObject = xml2js(file.data.substring(gsHeader.length))
        let characters = []
        let count = 0
        for (let chData of dataObject?.elements?.[0]?.elements) {
          // for some reason inventory and health in characterdata.xml are adjacent to <Character> instead of nested inside it
          let character = chData.elements.find((el) => el.name == 'Character')
          let inventory = chData.elements.find((el) => el.name == 'inventory')
          let health = chData.elements.find((el) => el.name == 'health')
          character.elements.push(inventory)
          character.elements.push(health)
          characters.push(character)
          count++

          state.playerCharacters.push(chData.attributes)
        }
        if (count === 0) {
          console.warn(`Character import failed - file might be invalid or empty`)
          dispatch('showAlert', {
            type: 'warning',
            text: `Character import failed - file might be invalid or empty.`,
          })
        } else {
          if (getters.isMultiPlayer) commit('ADD_BOTS', characters)
          else commit('ADD_CHARACTERS', characters)
          dispatch('showAlert', {
            type: 'success',
            text: `Succesfully imported ${count} characters.`,
          })
        }
      } else {
        console.warn(`Unrecognized file type: ${file.name}`)
        dispatch('showAlert', {
          type: 'warning',
          text: `Unrecognized file type: ${file.name}.`,
        })
      }
      commit('SET_LOADING', false)
    },
    convertSaveFile({ commit, dispatch, state, getters }) {
      // MP to SP convertion
      if (getters.isMultiPlayer) {
        // convert bots to crew
        let crew = getters.campaign.elements.find((el) => el.name == 'bots')
        crew.name = 'crew'
        if (crew.attributes.hasbots) delete crew.attributes.hasbots

        // rename campaign
        getters.campaign.name = 'SinglePlayerCampaign'

        // show alert
        dispatch('showAlert', {
          type: 'success',
          text: `Converted savefile to single-player format.`,
        })
      }
      // SP to MP conversion
      else {
        // convert crew to bots
        let bots = getters.campaign.elements.find((el) => el.name == 'crew')
        bots.name = 'bots'
        if (!bots.attributes) bots.attributes = {}
        bots.attributes.hasbots = 'true'

        // rename campaign
        getters.campaign.name = 'MultiPlayerCampaign'

        // set campaign id to random
        state.gamesession.elements[0].attributes.campaignid = _random(50, 100).toString()

        // show alert
        dispatch('showAlert', {
          type: 'success',
          text: `Converted savefile to multi-player format.`,
        })
      }
      commit('SET_LOADING', false)
    },
    setLoading({ commit, state }, value) {
      if (state.isLoading !== !!value) commit('SET_LOADING', !!value)
    },
  },
  modules: {},
})
