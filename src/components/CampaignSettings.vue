<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Campaign Settings </v-card-title>
    </v-card-header>
    <v-sheet class="d-flex flex-column align-center">
      <!-- set max missions -->
      <div class="toolContent d-flex flex-row justify-space-between align-center px-2">
        <v-text-field
          hide-details="true"
          density="comfortable"
          label="Max Missions"
          variant="outlined"
          style="color: white; min-width: 140px"
          v-model="maxmissions.inputVal.value"
          @keyup="maxmissions.keyUp"
          class="mr-2 mb-0"
          :class="{ 'text-secondary': maxmissions.isDifferent.value, 'text-white': !maxmissions.isDifferent.value }"
        />
        <v-btn
          variant="outlined"
          :disabled="!maxmissions.isDifferent.value"
          @click="maxmissions.click"
          color="secondary"
          class="py-5"
        >
          SET
        </v-btn>
      </div>
      <!-- toggle radiation -->
      <h3 class="toolTitle">Radiation</h3>
      <div class="toolContent d-flex flex-row justify-space-between px-2">
        <v-btn
          variant="outlined"
          :disabled="!radiation.isEnabled.value"
          @click="radiation.toggle"
          :color="radiation.isEnabled.value ? 'secondary' : 'grey'"
        >
          {{ !radiation.isEnabled.value ? 'Disabled' : 'Disable' }}
        </v-btn>
        <v-btn
          variant="outlined"
          :disabled="radiation.isEnabled.value"
          @click="radiation.toggle"
          :color="!radiation.isEnabled.value ? 'secondary' : 'grey'"
        >
          {{ radiation.isEnabled.value ? 'Enabled' : 'Enable' }}
        </v-btn>
      </div>
      <!-- difficulty tweaker -->
      <h3 class="toolTitle">Difficulty</h3>
      <div class="toolContent d-flex flex-column px-2">
        <div class="mb-2">
          Current average difficuly: <span class="text-secondary">{{ difficulty.avgDiff }}</span>
        </div>
        <div class="d-flex flex-row justify-space-between align-center">
          <v-text-field
            hide-details="true"
            density="comfortable"
            label="New difficulty"
            variant="outlined"
            style="color: white; min-width: 140px"
            v-model="difficulty.inputVal.value"
            @keyup="difficulty.keyUp"
            class="mr-2 mb-0 text-white"
          />
          <v-btn variant="outlined" @click="difficulty.click" color="secondary" class="py-5"> SET </v-btn>
        </div>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import _round from 'lodash/round'
import _clamp from 'lodash/clamp'

export default {
  setup() {
    const maxmissions = maxmissionsSetup()
    const radiation = radiationSetup()
    const difficulty = difficultySetup()

    return { maxmissions, radiation, difficulty }
  },
}
function maxmissionsSetup() {
  const store = useStore()

  const maxmsGetter = computed(() => store.getters.campaignSettings.attributes.MaxMissionCount)

  const inputVal = ref(maxmsGetter.value)
  const isDifferent = computed(() => {
    return inputVal.value !== maxmsGetter.value
  })
  function click() {
    if (parseInt(inputVal.value) >= 0) {
      store.getters.campaignSettings.attributes.MaxMissionCount = inputVal.value
      store.dispatch('showAlert', {
        type: 'success',
        text: `Set max missions to "${inputVal.value}".`,
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

  // reset input value when campaign data changes (like when another save gets loaded)
  watch(maxmsGetter, (newVal) => {
    inputVal.value = newVal
  })

  return { inputVal, isDifferent, click, keyUp }
}
function radiationSetup() {
  const store = useStore()

  const isEnabled = computed(() => store.getters.campaignSettings.attributes.RadiationEnabled == 'True')

  function toggle() {
    let map = store.getters.campaign.elements.find((el) => el.name === 'map')
    let radiation = map.elements.find((el) => el.name === 'Radiation')
    // on -> off
    if (isEnabled.value) {
      store.getters.campaignSettings.attributes.RadiationEnabled = 'False'
      radiation.attributes.Enabled = 'False'
      radiation.attributes.Amount = '-200'
      // reset locations that haven't been abandoned
      for (let location of map.elements.filter((el) => el.name == 'location')) {
        location.attributes.turnsinradiation = '0'
      }
    }
    // off -> on
    else {
      store.getters.campaignSettings.attributes.RadiationEnabled = 'True'
      radiation.attributes.Enabled = 'True'
    }
  }

  return { isEnabled, toggle }
}
function difficultySetup() {
  const store = useStore()

  // calculates average difficulty
  const avgDiff = computed(() => {
    let map = store.getters.campaign.elements.find((el) => el.name == 'map')
    let count = 0
    let sum = 0
    for (let element of map.elements) {
      // count connections
      if (element.name == 'connection') {
        sum += parseFloat(element.attributes.difficulty)
        count++
      }
      // count levels inside connections or locations
      if (element.name == 'connection' || element.name == 'location') {
        if (!location.elements) continue
        for (let level of location.elements) {
          if (level.name !== 'Level') continue
          sum += parseFloat(level.attributes.difficulty)
          count++
        }
      }
    }

    return _round(sum / count, 2)
  })

  const inputVal = ref('current * 2')

  // makes necessary checks and updates difficulty value in element
  function updateVal(element) {
    let current = parseFloat(element.attributes?.difficulty)
    if (isNaN(current)) return false
    let newDiff = undefined
    try {
      newDiff = eval(inputVal.value)
    } catch (err) {
      return false
    }
    if (isNaN(newDiff)) return false
    element.attributes.difficulty = _clamp(newDiff, 0, 100).toString()
    return true
  }

  function click() {
    // mock update try to check if value is correct
    let current = 10
    if (isNaN(current)) return // this has to stay here so current is not unused
    let newDiff = undefined
    try {
      newDiff = eval(inputVal.value)
    } catch (err) {
      return store.dispatch('showAlert', {
        type: 'error',
        text: `Invalid input: "${err}".`,
      })
    }
    if (isNaN(newDiff))
      return store.dispatch('showAlert', {
        type: 'error',
        text: `Invalid input: resulting value is NaN.`,
      })

    let updatedCount = 0
    for (let element of store.getters.campaign.elements.find((el) => el.name == 'map').elements) {
      // update connections
      if (element.name == 'connection') {
        if (updateVal(element)) updatedCount++
      }
      // update levels inside connections or locations
      if (element.name == 'connection' || element.name == 'location') {
        for (let level of element.elements) {
          if (level.name !== 'Level') continue
          if (updateVal(level)) updatedCount++
        }
      }
    }
    store.dispatch('showAlert', {
      type: 'success',
      text: `Updated difficulty in ${updatedCount} levels.`,
    })
  }
  function keyUp(ev) {
    if (ev.key === 'Enter') click()
  }

  return { inputVal, avgDiff, click, keyUp }
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

<style></style>
