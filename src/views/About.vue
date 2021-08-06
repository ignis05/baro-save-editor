<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet elevation="1" class="buttonWrapper">
          <v-btn :class="{ 'text-black': !subEditor }" color="secondary" class="mx-2" @click="subEditor = false">
            About Save Editor
          </v-btn>
          <v-btn :class="{ 'text-black': subEditor }" color="secondary" class="mx-2" @click="subEditor = true">
            About Submarine Editor
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet elevation="1" class="pa-2" style="text-align: center">
          <b>
            Note: Always back up the original file before replacing it with the downloaded one.<br />
            Even if something had worked for you before, there is always a risk that a game update breaks some stuff.
          </b>
        </v-sheet>
      </v-col>
    </v-row>
    <AboutSubEditor v-if="subEditor"></AboutSubEditor>
    <AboutSaveEditor v-else></AboutSaveEditor>
    <v-col>
      <v-sheet elevation="1" class="pa-2" style="text-align: center">
        If the editor freezes, crashes or outputs corrupted file feel free to create a
        <a style="color: rgb(var(--v-theme-secondary))" href="https://github.com/ignis05/baro-save-editor/issues">
          github issue
        </a>
        attaching original file(s) and providing steps for reproduction.
      </v-sheet>
    </v-col>
  </v-container>
</template>

<script>
import AboutSaveEditor from '@/components/AboutSaveEditor'
import AboutSubEditor from '@/components/AboutSubEditor'

export default {
  data() {
    return {
      subEditor: false,
    }
  },
  components: {
    AboutSaveEditor,
    AboutSubEditor,
  },
}
</script>

<style scoped>
.buttonWrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
}
</style>
