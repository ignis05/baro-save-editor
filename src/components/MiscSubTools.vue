<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Misc Tools </v-card-title>
    </v-card-header>
    <v-sheet class="d-flex flex-column align-center">
      <!-- set price -->
      <h3 class="toolTitle">Change Price</h3>
      <div class="d-flex flex-row justify-space-between px-2">
        <input
          type="number"
          v-model="price.inputVal.value"
          @keyup="price.keyUp"
          class="mr-2 pl-2"
          :class="{ 'text-secondary': price.isDifferent.value, 'text-white': !price.isDifferent.value }"
        />
        <v-btn :disabled="!price.isDifferent.value" @click="price.click" color="secondary">SET</v-btn>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const price = priceSetup()

    return { price }
  },
}
function priceSetup() {
  const store = useStore()

  const priceGetter = computed(() => store.getters.sub.attributes.price)

  const inputVal = ref(priceGetter.value)
  const isDifferent = computed(() => {
    return inputVal.value !== priceGetter.value
  })
  function click() {
    if (parseInt(inputVal.value) >= 0) store.getters.sub.attributes.price = inputVal.value
  }
  function keyUp(ev) {
    if (ev.key === 'Enter') click()
  }

  watch(priceGetter, () => {
    inputVal.value = priceGetter.value
  })

  return { inputVal, isDifferent, click, keyUp }
}
</script>

<style scoped>
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
</style>
