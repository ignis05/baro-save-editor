<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Misc Tools </v-card-title>
    </v-card-header>
    <v-sheet class="d-flex flex-column align-center">
      <!-- set price -->
      <h3 class="toolTitle">Change Price</h3>
      <div class="toolContent d-flex flex-row justify-space-between px-2">
        <input
          type="number"
          v-model="price.inputVal.value"
          @keyup="price.keyUp"
          class="mr-2 pl-2"
          :class="{ 'text-secondary': price.isDifferent.value, 'text-white': !price.isDifferent.value }"
        />
        <v-btn variant="outlined" :disabled="!price.isDifferent.value" @click="price.click" color="secondary">
          SET
        </v-btn>
      </div>
      <!-- clean walls -->
      <h3 class="toolTitle">Clean walls</h3>
      <div class="toolContent d-flex flex-row justify-flex-start align-center px-2" style="width: 100%">
        <input style="width: auto" type="checkbox" v-model="wallClean.checkBoxVal.value" />
        <div class="mx-2">Include shuttles</div>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" @click="wallClean.click" color="secondary"> CLEAN </v-btn>
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
    const wallClean = wallCleanSetup()

    return { price, wallClean }
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
    if (parseInt(inputVal.value) >= 0) {
      store.getters.sub.attributes.price = inputVal.value
      store.dispatch('showAlert', {
        type: 'success',
        text: `Set submarine price to "${inputVal.value}"`,
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

  watch(priceGetter, () => {
    inputVal.value = priceGetter.value
  })

  return { inputVal, isDifferent, click, keyUp }
}
function wallCleanSetup() {
  const store = useStore()

  const checkBoxVal = ref(true)

  function click() {
    let cleanedCount = 0
    for (let hull of store.getters.sub.elements.filter((el) => el.name === 'Hull')) {
      if (hull.attributes.backgroundsections && hull.attributes.backgroundsections !== '') {
        hull.attributes.backgroundsections = ''
        cleanedCount++
      }
    }
    // also clean linked submarines
    if (checkBoxVal.value) {
      for (let linkedSub of store.getters.sub.elements.filter((el) => el.name === 'LinkedSubmarine')) {
        for (let hull of linkedSub.elements.filter((el) => el.name === 'Hull')) {
          if (hull.attributes.backgroundsections && hull.attributes.backgroundsections !== '') {
            hull.attributes.backgroundsections = ''
            cleanedCount++
          }
        }
      }
    }
    if (cleanedCount > 0) {
      store.dispatch('showAlert', {
        type: 'success',
        text: `Cleaned stains from ${cleanedCount} walls.`,
      })
    } else
      store.dispatch('showAlert', {
        type: 'info',
        text: `No stained walls found.`,
      })
  }

  return { checkBoxVal, click }
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
  align-self: center;
  margin-left: 12px;
}
.toolContent:not(:last-child) {
  margin-bottom: 16px;
}
</style>
