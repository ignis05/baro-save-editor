export default {
  state: {},
  mutations: {},
  actions: {
    fileUploaded({ commit }, file) {
      console.log(commit)
      console.log(`Received file ${file.name}`)
    },
  },
  modules: {},
}
