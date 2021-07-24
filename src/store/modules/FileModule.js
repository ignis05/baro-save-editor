import { xml2js } from 'xml-js'

export default {
  state: {
    gamesession: {},
    savefileName: null,
    subfiles: {},
  },
  mutations: {
    SET_SAVEFILENAME(state, newName) {
      state.savefileName = newName
    },
    SET_GAMESESSION(state, newData) {
      state.gamesession = newData
    },
  },
  actions: {
    fileUploaded({ commit }, file) {
      console.log(`Received file ${file.name}`)

      if (file.name.endsWith('.save')) {
        commit('SET_SAVEFILENAME', file.name)

        // strips header - makes gamesssion the root of xml
        const stripSize = `<?xml version="1.0" encoding="utf-8"?>\n`.length
        var parsedGamesession = xml2js(file.data['gamesession.xml'].toString('utf-8').substring(stripSize))

        if (parsedGamesession.elements[0].name !== 'Gamesession') throw `Failed to parse gamesession.xml`

        console.dir(parsedGamesession)

        commit('SET_GAMESESSION', parsedGamesession)
      }
    },
  },
  modules: {},
}
