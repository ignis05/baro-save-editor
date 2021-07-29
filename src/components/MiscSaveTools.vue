<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Misc Tools </v-card-title>
    </v-card-header>
    <v-sheet class="d-flex flex-column align-center">
      <div class="d-flex flex-row justify-space-between px-2">
        <input
          size="10"
          v-model="money.inputVal.value"
          @keyup="money.keyUp"
          class="mr-2 pl-2"
          :class="{ 'text-secondary': money.isDifferent.value, 'text-white': !money.isDifferent.value }"
        />
        <v-btn @click="money.click" color="secondary">SET MONEY</v-btn>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const money = moneySetup()

    return { money }
  },
}
function moneySetup() {
  const store = useStore()

  const inputVal = ref(store.getters.campaign.attributes.money)
  const isDifferent = computed(() => {
    return inputVal.value !== store.getters.campaign.attributes.money
  })
  function click() {
    if (parseInt(inputVal.value) >= 0) store.getters.campaign.attributes.money = inputVal.value
  }
  function keyUp(ev) {
    if (ev.key === 'Enter') click()
  }
  return { inputVal, isDifferent, click, keyUp }
}
</script>

<style scoped>
input {
  border: 1px solid white;
}
</style>
