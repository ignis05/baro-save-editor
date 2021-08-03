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
      <!-- compact submarine -->
      <h3 class="toolTitle">
        Compact sub
        <v-btn class="ml-2" @click.stop="compact.dialog.value = true" size="x-small" icon title="Info">
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-btn>
        <v-dialog class="subCompactor" v-model="compact.dialog.value">
          <v-card>
            <v-card-title>
              <span class="text-h5">"Compact" submarine tool</span>
              <v-spacer></v-spacer>
              <v-btn color="red" size="x-small" icon @click="compact.dialog.value = false">
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pl-8">
              This tool allows you to significantly reduce file size of your submarine by replacing its preview image
              with 4 black pixels. Example: removing preview image from one of my shuttles this was reduced its filesize
              from 71KB to 9KB.<br />
              <h5 class="text-h5">Compact Shuttles</h5>
              This will remove preview images of all shuttles attached to the submarine. Preview images of shuttles
              stored inside main submarine file aren't used anywhere in-game so stripping them has no downsides.
              <h5 class="text-h5">Compact Sub</h5>
              This will remove preview image of the loaded submarine, making its file smaller. If this is used on a main
              submarine (not used as a shuttle), the lack of image will be noticeable.
            </v-card-text>
          </v-card>
        </v-dialog>
      </h3>
      <div class="toolContent d-flex flex-row align-center px-2" style="width: 100%; justify-content: space-evenly">
        <v-btn
          variant="outlined"
          :disabled="compact.linkedSubs.value.length === 0"
          @click="compact.clickShuttles"
          color="secondary"
          :title="compact.linkedSubs.value.length === 0 ? 'No shuttles found' : 'Compact attached shuttles'"
        >
          Shuttles
        </v-btn>
        <v-btn
          variant="outlined"
          :disabled="compact.previewImage.value === ''"
          @click="compact.clickSub"
          color="secondary"
          :title="compact.previewImage.value === '' ? 'No preview image found' : 'Compact main submarine'"
        >
          Sub
        </v-btn>
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
    const compact = compactSetup()

    return { price, wallClean, compact }
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
function compactSetup() {
  const store = useStore()

  const dialog = ref(false)
  const linkedSubs = computed(() => {
    return store.getters.sub.elements.filter((el) => el.name === 'LinkedSubmarine')
  })

  const previewImage = computed(() => {
    return store.state.editorSubmarine.data.elements[0].attributes?.previewimage || ''
  })

  function clickShuttles() {
    let count = 0
    for (let shuttle of linkedSubs.value) {
      console.dir(shuttle)
      if (shuttle?.attributes?.previewimage) {
        shuttle.attributes.previewimage =
          'iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAE0lEQVR4nGNkYGD4D8QMTAxQAAAOKAEDRx/UrAAAAABJRU5ErkJggg=='
        count++
      }
    }
    if (count > 0) {
      store.dispatch('showAlert', {
        type: 'success',
        text: `Compacted ${count} shuttles.`,
      })
    } else
      store.dispatch('showAlert', {
        type: 'info',
        text: `No shuttles with preview images found.`,
      })
  }
  function clickSub() {
    store.state.editorSubmarine.data.elements[0].attributes.previewimage =
      'iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAE0lEQVR4nGNkYGD4D8QMTAxQAAAOKAEDRx/UrAAAAABJRU5ErkJggg=='
    store.dispatch('showAlert', {
      type: 'success',
      text: `Compacted main submarine.`,
    })
  }

  return { dialog, clickSub, clickShuttles, linkedSubs, previewImage }
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

<style>
.v-dialog.subCompactor .v-overlay__content {
  max-width: 820px !important;
  max-height: 650px !important;
}
</style>
