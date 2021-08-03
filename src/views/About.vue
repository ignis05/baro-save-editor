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
    <AboutSubEditor v-if="subEditor"></AboutSubEditor>
    <AboutSaveEditor v-else></AboutSaveEditor>
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
