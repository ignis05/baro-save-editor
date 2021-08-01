<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Misc Tools </v-card-title>
    </v-card-header>
    <v-sheet class="d-flex flex-column align-center">
      <!-- gamesession.xml edit / download -->
      <div class="d-flex flex-row justify-space-between pr-2 toolContent" style="width: 100%">
        <h3 class="toolTitle d-block">Gamesession.xml</h3>
        <v-spacer></v-spacer>
        <v-icon title="edit" color="secondary" class="iconButton" @click.stop="gameses.edit()">
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
              <v-btn color="red darken-1" text @click="gameses.dialog.value = false"> Cancel </v-btn>
              <v-btn color="green darken-1" text @click="gameses.saveChanges"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-icon title="download" color="secondary" class="iconButton" @click="gameses.download()">
          mdi-file-download-outline
        </v-icon>
      </div>
      <!-- set campaign id -->
      <h3 class="toolTitle" v-if="isMP">Campaign ID</h3>
      <div v-if="isMP" class="toolContent d-flex flex-row justify-space-between px-2">
        <input
          type="number"
          v-model="campaignId.inputVal.value"
          @keyup="campaignId.keyUp"
          class="mr-2 pl-2"
          :class="{ 'text-secondary': campaignId.isDifferent.value, 'text-white': !campaignId.isDifferent.value }"
        />
        <v-btn variant="outlined" :disabled="!campaignId.isDifferent.value" @click="campaignId.click" color="secondary">
          SET
        </v-btn>
      </div>
      <!-- set money -->
      <h3 class="toolTitle">Current Money</h3>
      <div class="toolContent d-flex flex-row justify-space-between px-2">
        <input
          type="number"
          v-model="money.inputVal.value"
          @keyup="money.keyUp"
          class="mr-2 pl-2"
          :class="{ 'text-secondary': money.isDifferent.value, 'text-white': !money.isDifferent.value }"
        />
        <v-btn variant="outlined" :disabled="!money.isDifferent.value" @click="money.click" color="secondary">
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

import { desanitized_js2xml, gsHeader } from '@/helpers/CompressionHelpers'

export default {
  setup() {
    const store = useStore()

    const isMP = computed(() => store.getters.isMultiPlayer)

    const money = moneySetup()
    const campaignId = campaignIdSetup()
    const gameses = gamesesSetup()

    return { isMP, money, campaignId, gameses }
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
      dialog.value = false
      store.dispatch('showAlert', {
        type: 'success',
        text: `Updated "gamesession.xml".`,
      })
    } else {
      console.warn(`Failed to find campaign element in new gamesession - aborting`)
      store.dispatch('showAlert', {
        type: 'error',
        text: `Campaign data not found in the savefile - make sure the xml is correct. Changes were not saved.`,
      })
    }
  }

  return { download, edit, dialog, xmlString, saveChanges }
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
  align-self: flex-start;
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

<style>
/* temp hack untill fullscreen prop gets properly implemented */
.v-dialog.fullscreen .v-overlay__content {
  width: 100%;
  height: 100%;
  max-width: none !important;
  max-height: none !important;
  min-width: none !important;
  min-height: none !important;
}
</style>
