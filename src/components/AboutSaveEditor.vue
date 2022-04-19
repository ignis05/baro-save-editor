<template>
  <v-row>
    <v-col>
      <v-sheet elevation="1" class="buttonWrapper">
        <v-btn color="secondary" variant="outlined" class="mx-2" @click="selectedComp = 'ownedSubs'">
          Owned Submarines
        </v-btn>
        <v-btn color="secondary" variant="outlined" class="mx-2" @click="selectedComp = 'campSettings'">
          Campaign Settings
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
          There is also a radiobutton on the left of each submarine which allows to set currently selected sub.
          <br />
          Loading .sub file when the save is loaded will add it to that list and attach it to the savefile (or update
          existing submarine file with the same name).
        </v-card-text>
      </v-card>
      <!-- campaign settings -->
      <v-card v-if="selectedComp === 'campSettings'" elevation="1" class="aboutCard">
        <v-card-header>
          <v-card-title class="text-h4">Campaign Settings</v-card-title>
        </v-card-header>
        <v-card-text>
          <span class="text-h6"> Max Missions </span><br />
          Allows to set how many missions can be selected at the same time.
          <br /><br /><span class="text-h6"> Radiation </span><br />
          Allows to toggle radiation.<br />
          Off -> On - will turn on the radiation<br />
          On -> Off - will turn off the radiation and reset its progress on the map and outposts. Outposts that have
          already been abandoned due to its effects will stay that way.
          <br /><br /><span class="text-h6"> Difficulty </span><br />
          Allows to mass-update difficulties across all generated levels.<br />
          The input can take any value, with "current" being the current difficuly for any given level.<br />
          Example uses:
          <ul class="pl-8">
            <li><span class="text-secondary">current * 2</span> - will double the difficulty in each level</li>
            <li><span class="text-secondary">current + 10</span> - will increase the difficuly by 10 in each level</li>
            <li><span class="text-secondary">85</span> - will set the difficuly to 85 in each level</li>
          </ul>
          It won't let you set any difficuly higher than 100 or lower than 0 as that might break some things.
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
          Each character on the list has 3 buttons:
          <ul class="pl-8">
            <li><v-icon color="secondary">mdi-drag-horizontal-variant</v-icon> - can be grabbed to reorder crew</li>
            <li>
              <v-icon color="secondary">mdi-file-edit-outline</v-icon> - opens character editing menu where you can edit
              name, job, skills or copy/edit raw .xml
            </li>
            <li><v-icon color="red">mdi-delete-outline</v-icon> - deletes the character</li>
          </ul>
          To add characters you can:
          <ul class="pl-8">
            <li>
              Load <span class="text-secondary">CharacterData.xml</span> file - to import all multiplayer characters as
              bots.
            </li>
            <li>
              <v-icon color="secondary">mdi-account-plus-outline</v-icon> - to add a new assistant (inventory will be
              empty because i don't know how to make it auto fill and don't want to risk item id conflicts)
            </li>
            <li>
              <v-icon color="secondary">mdi-account-edit-outline</v-icon> - to add a new character from xml textfield
            </li>
            <li>
              <v-icon color="secondary">mdi-clipboard-arrow-up-outline</v-icon> - to add a new character from xml in the
              clipboard
            </li>
          </ul>
          After loading <span class="text-secondary">CharacterData.xml</span> file,
          <v-icon color="secondary">mdi-file-download-outline</v-icon> icon will be available, which allows you to
          export player characters back as <span class="text-secondary">CharacterData.xml</span> file.<br />
          This has some limitations though, the save editor temporarily keeps a list of steam data mapped to character
          names and uses it when exporting player characters. This means that changing the "originalname" of the
          character won't allow it to be exported properly. Also, there is no way to safely store this list in the save
          file, so it won't be stored there, meaning the export option will disappear after downloading the modified
          save and loading it again.
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
              savefiles.
            </li>
          </ul>
          <br /><span class="text-h6"> Campaign ID (MP saves only) </span><br />
          Allows to set campaign id property.
          <br /><br /><span class="text-h6"> Current Money </span><br />
          Allows to set current money.
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
