export default {
  state: {},
  mutations: {},
  actions: {
    fileUploaded({ commit }, file) {
      console.log(`Received file ${file.name}`)
    },
  },
  modules: {},
}
