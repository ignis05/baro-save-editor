<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Misc Tools </v-card-title>
    </v-card-header>
    <v-sheet class="d-flex flex-column align-center">
      <!-- set campaign id -->
      <h3 v-if="isMP">Campaign ID</h3>
      <div v-if="isMP" class="d-flex flex-row justify-space-between px-2 mb-4">
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
      <h3>Current Money</h3>
      <div class="d-flex flex-row justify-space-between px-2">
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

export default {
  setup() {
    const store = useStore()

    const isMP = computed(() => store.getters.isMultiPlayer)

    const money = moneySetup()
    const campaignId = campaignIdSetup()

    return { isMP, money, campaignId }
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
</script>

<style scoped>
input {
  border: 1px solid white;
  width: 100%;
}
</style>
