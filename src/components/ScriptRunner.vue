<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Run Script </v-card-title>
    </v-card-header>
    <v-sheet class="mb-2 d-flex flex-column justify-center align-center px-4">
      <textarea v-model="areaText" spellcheck="false" class="textArea px-2 mx-0"></textarea>
      <v-btn class="mt-4" color="secondary" variant="outlined" @click="run" :disabled="areaText == ''">Run</v-btn>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      areaText: '//check console\nconsole.dir(submarine)',
    }
  },
  methods: {
    run() {
      var submarine = this.$store.getters.sub
      submarine.toString() // dummy call to prevent transpiler from removing unused variable
      eval(this.areaText)
      this.$store.dispatch('showAlert', {
        type: 'success',
        text: `Succesfully executed script`,
      })
    },
  },
}
</script>

<style>
.textArea {
  background: white;
  color: black;
  width: 100%;
  min-height: 80px;
}
</style>
