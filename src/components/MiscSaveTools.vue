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
        <v-icon title="edit" color="secondary" class="iconButton" @click="gameses.edit()">
          mdi-file-edit-outline
        </v-icon>
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
        <v-btn :disabled="!campaignId.isDifferent.value" @click="campaignId.click" color="secondary">SET</v-btn>
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
        <v-btn :disabled="!money.isDifferent.value" @click="money.click" color="secondary">SET</v-btn>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

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
    if (parseInt(inputVal.value) >= 0) store.getters.campaign.attributes.money = inputVal.value
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
    if (inputVal.value != '') store.state.gamesession.elements[0].attributes.campaignid = inputVal.value
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

  function download() {
    let xmlString = gsHeader + desanitized_js2xml(store.state.gamesession)

    // trigger download
    let a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([xmlString], { type: 'application/xml' }))
    a.download = 'gamesession.xml'
    a.click()
  }

  function edit() {
    // todo: edit code
  }

  return { download, edit }
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
</style>
