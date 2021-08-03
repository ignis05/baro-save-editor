<template>
  <v-row>
    <v-col>
      <v-sheet elevation="1" class="buttonWrapper">
        <v-btn color="secondary" variant="outlined" class="mx-2" @click="selectedComp = 'ownedSubs'">
          Owned Submarines
        </v-btn>
        <v-btn color="secondary" variant="outlined" class="mx-2" @click="selectedComp = 'availSubs'">
          Available Submarines
        </v-btn>
        <v-btn color="secondary" variant="outlined" class="mx-2" @click="selectedComp = 'crew'"> Crew </v-btn>
        <v-btn color="secondary" variant="outlined" class="mx-2" @click="selectedComp = 'misc'"> Misc Tools </v-btn>
      </v-sheet>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <!-- owned submarines -->
      <v-card v-if="selectedComp === 'ownedSubs'" elevation="1" class="aboutCard">
        <v-card-header>
          <v-card-title class="text-h4">Owned Submarines</v-card-title>
        </v-card-header>
        <v-card-text>
          <span class="text-h6">Displays a list of currently owned submarines.</span><br /><br />
          Each submarine on the list has 3 buttons:
          <ul class="pl-8">
            <li>
              <v-icon color="secondary">mdi-file-download-outline</v-icon> - extracts submarine file from the save and
              downloads it
            </li>
            <li>
              <v-icon color="secondary">mdi-clipboard-arrow-right-outline</v-icon> - loads submarine file in the
              submarine editor
            </li>
            <li>
              <v-icon color="red">mdi-delete-outline</v-icon> - removes submarine from the "owned submarines" list and
              deletes its file
            </li>
          </ul>
          Loading .sub file when the save is loaded will add it to that list and attach it to the savefile (or update
          existing submarine file with the same name).
        </v-card-text>
      </v-card>
      <!-- available submarines -->
      <v-card v-if="selectedComp === 'availSubs'" elevation="1" class="aboutCard">
        <v-card-header>
          <v-card-title class="text-h4">Available Submarines</v-card-title>
        </v-card-header>
        <v-card-text>
          <span class="text-h6">
            Displays a list of submarines available for purchase (not used in single-player saves).
          </span>
          <br /><br />
          This list consists of only submarine names.
          <ul class="pl-8">
            <li><v-icon color="red">mdi-delete-outline</v-icon> - removes submarine name from the list</li>
            <li>
              Additional names can be added to the list by typing them in the input at the bottom and presing
              <span class="text-secondary">ADD</span>.
            </li>
          </ul>
        </v-card-text>
      </v-card>
      <!-- crew -->
      <v-card v-if="selectedComp === 'crew'" elevation="1" class="aboutCard">
        <v-card-header>
          <v-card-title class="text-h4">Crew / Bots</v-card-title>
        </v-card-header>
        <v-card-text>
          <span class="text-h6">
            Displays a list of current single-player crew or bots hired in multi-player campaign.
          </span>
          <br /><br />
          Each character on the list has 2 buttons:
          <ul class="pl-8">
            <li><v-icon color="secondary">mdi-file-edit-outline</v-icon> - opens character editing tools (WIP)</li>
            <li><v-icon color="red">mdi-delete-outline</v-icon> - deletes the character</li>
          </ul>
          Loading CharacterData.xml file will import characters from it and add them to the list.
        </v-card-text>
      </v-card>
      <!-- misc -->
      <v-card v-if="selectedComp === 'misc'" elevation="1" class="aboutCard">
        <v-card-header>
          <v-card-title class="text-h4">Miscellaneous tools</v-card-title>
        </v-card-header>
        <v-card-text>
          <span class="text-h6"> Gamesession.xml tools </span>
          <br />
          Four buttons allowing to directly edit gamesession.xml file:
          <ul class="pl-8">
            <li>
              <v-icon color="secondary">mdi-clipboard-arrow-down-outline</v-icon> - copies contents of gamesession.xml
              to the clipboard
            </li>
            <li>
              <v-icon color="secondary">mdi-clipboard-arrow-up-outline</v-icon> - replaces gamesession.xml file with the
              contents of the clipboard
            </li>
            <li><v-icon color="secondary">mdi-file-download-outline</v-icon> - downloads gamesession.xml file</li>
            <li>
              <v-icon color="secondary">mdi-file-edit-outline</v-icon> - opens gamesession.xml content in one large
              textarea
            </li>
          </ul>
          Loading gamesession.xml file will replace the current one.
          <br /><br /><span class="text-h6"> Save conversion </span><br />
          Allows to convert savefile between single-player and multi-player formats.<br />
          Important notes:
          <ul class="pl-8">
            <li>
              When converting MP->SP only bots will be turned into the crew. Any human-controlled characters need to be
              imported by loading CharacterData.xml file.
            </li>
            <li>
              When converting SP->MP random capaign id will be generted. Make sure its unique from your other MP
              savefiles. Also submarines available for purchase will be limited to what's in the "available submarines"
              list.
            </li>
          </ul>
          <br /><span class="text-h6"> Campaign ID (MP saves only) </span><br />
          Allows to set campaign id property.
          <br /><br /><span class="text-h6"> Current Money </span><br />
          Allows to set current money.
          <br /><br /><span class="text-h6"> Max Missions </span><br />
          Allows to set how many missions can be selected at the same time.
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
