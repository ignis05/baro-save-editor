<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Misc Tools </v-card-title>
    </v-card-header>
    <v-sheet class="d-flex flex-column align-center">
      <!-- gamesession.xml edit / download -->
      <div class="d-flex flex-row justify-space-between pr-2 toolContent mb-8" style="width: 100%; max-width: 320px">
        <h3 class="toolTitle d-block">Gamesession.xml</h3>
        <v-spacer></v-spacer>
        <v-icon title="Copy to clipboard" color="secondary" class="iconButton" @click="gameses.copy()">
          mdi-clipboard-arrow-down-outline
        </v-icon>
        <v-icon title="Paste from clipboard" color="secondary" class="iconButton" @click="gameses.paste()">
          mdi-clipboard-arrow-up-outline
        </v-icon>
        <v-icon title="Download" color="secondary" class="iconButton" @click="gameses.download()">
          mdi-file-download-outline
        </v-icon>
        <v-icon title="Edit xml" color="secondary" class="iconButton" @click.stop="gameses.edit()">
          mdi-file-edit-outline
        </v-icon>
        <v-dialog class="fullscreen" v-model="gameses.dialog.value" fullscreen>
          <v-card class="d-flex flex-column" style="width: 100%; height: 100%">
            <v-card-title>
              <span class="text-h5">Manualy edit gamesession.xml</span>
            </v-card-title>
            <v-card-text class="d-flex flex-grow-1">
              <textarea
                v-model="gameses.xmlString.value"
                spellcheck="false"
                class="textArea d-flex px-2 flex-grow-1"
              ></textarea>
            </v-card-text>
            <v-card-actions style="flex: 0 1 auto">
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="gameses.closeDialog()"> Cancel </v-btn>
              <v-btn color="green darken-1" text @click="gameses.saveChanges()"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <!-- convert format -->
      <h3 class="toolTitle">Save conversion</h3>
      <div class="toolContent d-flex flex-row justify-space-between align-center px-2 mb-8">
        <div class="text">
          Convert to a <span class="text-primary">{{ isMP ? 'single' : 'multi' }}-player</span> format:
        </div>
        <v-spacer></v-spacer>
        <v-btn title="Convert" @click="convert.click" size="x-small" icon>
          <v-icon color="secondary">mdi-file-sync-outline</v-icon>
        </v-btn>
        <v-btn @click.stop="convert.dialog.value = true" size="x-small" icon>
          <v-icon>mdi-help-circle-outline</v-icon>
          <v-tooltip anchor="bottom" activator="parent">Savefile format convertion info</v-tooltip>
        </v-btn>
        <!-- info dialog -->
        <v-dialog class="convertInfo" v-model="convert.dialog.value">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{
                isMP ? 'Multi-player to single-player convertion' : 'Single-player to multi-player convertion'
              }}</span>
              <v-spacer></v-spacer>
              <v-btn color="red" size="x-small" icon @click="convert.dialog.value = false">
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <!-- MP to SP -->
            <v-card-text class="px-2" v-if="isMP">
              <div class="text">
                - Hired bots will be turned into crew members<br />
                <br />
                Please note that the player-controlled characters are not saved inside the .save file.<br />If you wish
                to have them in single-player, you need to import them by loading
                <span class="text-primary">(...)_CharacterData.xml"</span> file.
              </div>
            </v-card-text>
            <!-- SP to MP -->
            <v-card-text class="px-2" v-else>
              <div class="text">
                - Submarines you can purchase at the shipyard well be limited to a specific list. If you want to
                purchase non-vanilla submarine, make sure to add its name to that list.<br />
                - Current crew will be turned into bots.<br />
                - Random campaign id will be generated. Make sure it's not conflicting with any of your other
                multiplayer saves.<br />
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <!-- set campaign id -->
      <div v-if="isMP" class="toolContent d-flex flex-row justify-space-between align-center px-2">
        <v-text-field
          hide-details="true"
          density="comfortable"
          label="Campaign ID"
          variant="outlined"
          style="color: white; min-width: 140px"
          v-model="campaignId.inputVal.value"
          @keyup="campaignId.keyUp"
          class="mr-2 mb-0"
          :class="{ 'text-secondary': campaignId.isDifferent.value, 'text-white': !campaignId.isDifferent.value }"
        />
        <v-btn
          variant="outlined"
          :disabled="!campaignId.isDifferent.value"
          @click="campaignId.click"
          color="secondary"
          class="py-5"
        >
          SET
        </v-btn>
      </div>
      <!-- set money -->
      <div class="toolContent d-flex flex-row justify-space-between align-center px-2">
        <v-text-field
          hide-details="true"
          density="comfortable"
          label="Current Money"
          variant="outlined"
          style="color: white; min-width: 140px"
          v-model="money.inputVal.value"
          @keyup="money.keyUp"
          class="mr-2 mb-0"
          :class="{ 'text-secondary': money.isDifferent.value, 'text-white': !money.isDifferent.value }"
        />
        <v-btn
          variant="outlined"
          :disabled="!money.isDifferent.value"
          @click="money.click"
          color="secondary"
          class="py-5"
        >
          SET
        </v-btn>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { xml2js } from 'xml-js'

import { desanitized_js2xml, gsHeader } from '@/helpers/CompressionHelpers.js'

export default {
  setup() {
    const store = useStore()

    const isMP = computed(() => store.getters.isMultiPlayer)

    const campaignId = campaignIdSetup()
    const convert = convertSetup()
    const gameses = gamesesSetup()
    const money = moneySetup()

    return { isMP, campaignId, convert, gameses, money }
  },
}
function moneySetup() {
  const store = useStore()

  const moneyGetter = computed(() => store.getters.campaign.attributes.money)

  const inputVal = ref(moneyGetter.value)
  const isDifferent = computed(() => {
    return inputVal.value !== moneyGetter.value
  })
  function click() {
    if (parseInt(inputVal.value) >= 0) {
      store.getters.campaign.attributes.money = inputVal.value
      store.dispatch('showAlert', {
        type: 'success',
        text: `Set current money to "${inputVal.value}".`,
      })
    } else
      store.dispatch('showAlert', {
        type: 'info',
        text: `Value must be a positive number.`,
      })
  }
  function keyUp(ev) {
    if (ev.key === 'Enter') click()
  }

  watch(moneyGetter, () => {
    inputVal.value = moneyGetter.value
  })

  return { inputVal, isDifferent, click, keyUp }
}
function campaignIdSetup() {
  const store = useStore()

  const cpIdGetter = computed(() => store.state.gamesession.elements?.[0]?.attributes?.campaignid || '-1')

  const inputVal = ref(cpIdGetter.value)
  const isDifferent = computed(() => {
    return inputVal.value !== cpIdGetter.value
  })
  function click() {
    if (inputVal.value != '') {
      store.state.gamesession.elements[0].attributes.campaignid = inputVal.value
      store.dispatch('showAlert', {
        type: 'success',
        text: `Set campaign ID to "${inputVal.value}".`,
      })
    } else
      store.dispatch('showAlert', {
        type: 'info',
        text: `ID can't be empty.`,
      })
  }
  function keyUp(ev) {
    if (ev.key === 'Enter') click()
  }

  watch(cpIdGetter, () => {
    inputVal.value = cpIdGetter.value
  })

  return { inputVal, isDifferent, click, keyUp }
}
function gamesesSetup() {
  const store = useStore()

  const dialog = ref(false)
  const xmlString = ref('')

  function download() {
    let xmlString = gsHeader + desanitized_js2xml(store.state.gamesession)

    // trigger download
    let a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([xmlString], { type: 'application/xml' }))
    a.download = 'gamesession.xml'
    a.click()
  }

  function edit() {
    dialog.value = true
    xmlString.value = gsHeader + desanitized_js2xml(store.state.gamesession, { spaces: 4 })
  }

  function saveChanges() {
    let newGameses
    try {
      newGameses = xml2js(xmlString.value.substring(gsHeader.length))
    } catch (err) {
      console.warn(err)
      store.dispatch('showAlert', {
        type: 'error',
        text: `XML parser fail: ${err.message}`,
      })
      return
    }
    var campaign = newGameses.elements?.[0]?.elements?.find(
      (el) => el.name === 'MultiPlayerCampaign' || el.name === 'SinglePlayerCampaign',
    )
    if (campaign) {
      store.commit('SET_GAMESESSION', newGameses)
      store.dispatch('showAlert', {
        type: 'success',
        text: `Updated "gamesession.xml".`,
      })
    } else {
      console.warn(`Failed to find campaign element in new gamesession - aborting`)
      store.dispatch('showAlert', {
        type: 'error',
        text: `Campaign data not found in the gamesession - make sure the xml is correct. Changes were not saved.`,
      })
    }
  }

  function closeDialog() {
    dialog.value = false
    xmlString.value = ''
  }

  async function copy() {
    let xmlString = gsHeader + desanitized_js2xml(store.state.gamesession, { spaces: 4 })
    await navigator.clipboard.writeText(xmlString)
    store.dispatch('showAlert', {
      type: 'success',
      text: `Copied gamesession.xml to system clipboard.`,
    })
  }

  async function paste() {
    let xmlString = await navigator.clipboard.readText()
    let newGameses
    try {
      newGameses = xml2js(xmlString.substring(gsHeader.length))
    } catch (err) {
      console.warn(err)
      store.dispatch('showAlert', {
        type: 'error',
        text: `XML parser fail: ${err.message}`,
      })
      return
    }
    var campaign = newGameses.elements?.[0]?.elements?.find(
      (el) => el.name === 'MultiPlayerCampaign' || el.name === 'SinglePlayerCampaign',
    )
    if (campaign) {
      store.commit('SET_GAMESESSION', newGameses)
      dialog.value = false
      store.dispatch('showAlert', {
        type: 'success',
        text: `Pasted "gamesession.xml" from clipboard.`,
      })
    } else {
      console.warn(`Failed to find campaign element in new gamesession - aborting`)
      store.dispatch('showAlert', {
        type: 'error',
        text: `Campaign data not found in the gamesession - make sure the xml is correct.`,
      })
    }
  }

  return { download, edit, dialog, xmlString, saveChanges, closeDialog, copy, paste }
}
function convertSetup() {
  const store = useStore()

  const dialog = ref(false)

  async function click() {
    await store.dispatch('setLoading', true)
    // give vue time to update component before synchronous operation
    await new Promise((r) => setTimeout(r, 50))
    store.dispatch('convertSaveFile')
  }

  return { dialog, click }
}
</script>

<style scoped>
.iconButton {
  cursor: pointer;
}
input {
  border: 1px solid white;
  width: 100%;
}
.toolTitle {
  font-weight: normal;
  font-size: 1.1em;
  align-self: center;
  margin-left: 12px;
}
.toolContent:not(:last-child) {
  margin-bottom: 16px;
}
.textArea {
  background: white;
  color: black;
}
</style>
