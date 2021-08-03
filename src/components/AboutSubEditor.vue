<template>
  <v-row>
    <v-col>
      <v-sheet elevation="1" class="buttonWrapper">
        <v-btn color="secondary" variant="outlined" class="mx-2" @click="selectedComp = 'export'">
          Export from file
        </v-btn>
        <v-btn color="secondary" variant="outlined" class="mx-2" @click="selectedComp = 'wirehider'">Wire Hider</v-btn>
        <v-btn color="secondary" variant="outlined" class="mx-2" @click="selectedComp = 'script'">Run Script</v-btn>
        <v-btn color="secondary" variant="outlined" class="mx-2" @click="selectedComp = 'misc'">Misc Tools</v-btn>
      </v-sheet>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <!-- export -->
      <v-card v-if="selectedComp === 'export'" elevation="1" class="aboutCard">
        <v-card-header>
          <v-card-title class="text-h4">Export from file</v-card-title>
        </v-card-header>
        <v-card-text>
          <span class="text-h6">Allows to export preview image or shuttles from the submarine file.</span><br /><br />
          Pressing <v-icon color="secondary">mdi-file-download-outline</v-icon> button triggers download.
        </v-card-text>
      </v-card>
      <!-- wire hider -->
      <v-card v-if="selectedComp === 'wirehider'" elevation="1" class="aboutCard">
        <v-card-header>
          <v-card-title class="text-h4">Wire hider</v-card-title>
        </v-card-header>
        <v-card-text>
          <span class="text-h6"> A tool to make mass wire hiding easy. </span>
          <br /><br />
          Just select desired wire color ("all" will affect all wires) and press buttons to hide or unhide them. This
          tool uses the "hidden in game" property so the wires will still be visible in the in-game submarine editor.
        </v-card-text>
      </v-card>
      <!-- script -->
      <v-card v-if="selectedComp === 'script'" elevation="1" class="aboutCard">
        <v-card-header>
          <v-card-title class="text-h4">Run script</v-card-title>
        </v-card-header>
        <v-card-text>
          <span class="text-h6"> Edit submarine directly with a script. </span>
          <br /><br />
          Work-in-progress tool. Allows to directly edit your submarine with javascript.
        </v-card-text>
      </v-card>
      <!-- misc -->
      <v-card v-if="selectedComp === 'misc'" elevation="1" class="aboutCard">
        <v-card-header>
          <v-card-title class="text-h4">Miscellaneous tools</v-card-title>
        </v-card-header>
        <v-card-text>
          <br /><span class="text-h6"> Change Price </span><br />
          Allows to change submarine price without any limits.
          <br /><br /><span class="text-h6"> Clean walls </span><br />
          Removes stains from background walls. Checkbox allows to also clean walls in shuttles.
          <br /><br /><span class="text-h6"> Compact submarine </span><br />
          Allows to massively reduce submarine file size by replacing preview images with 4 pixels.
          <ul class="pl-8">
            <li>
              <span class="text-secondary">SHUTTLES</span> button replaces preview images in all shuttles attached to
              the main submarine.
            </li>
            <li><span class="text-secondary">SUB</span> button replaces preview image of main submarine.</li>
          </ul>
          Note that the shuttle images aren't used anywhere so removing them reduces file size with no downsides.
          Removing the main submarine preview image will make it even lighter but it will deffinitely be notieable
          in-game.<br />
          If buttons are locked that means that there is no preview image or shuttles.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      selectedComp: '',
    }
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
.aboutCard {
  padding: 4px;
}
</style>
