<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Available Submarines </v-card-title>
    </v-card-header>
    <div v-if="isMultiPlayer">
      <v-sheet class="mb-2">
        <AvailSubListElement
          v-for="sub of availSubList.map((el) => el.attributes.name)"
          :key="sub"
          :subName="sub"
          @deleteSub="deleteSub"
        ></AvailSubListElement>
      </v-sheet>
      <v-sheet class="d-flex flex-row justify-space-between px-2">
        <input v-model="inputVal" @keyup="keyUpHandler" ref="subListInput" class="mr-2 pl-2" />
        <v-btn :disabled="!inputVal" @click="addSub" color="secondary">Add</v-btn>
      </v-sheet>
    </div>
    <div v-else class="text-center text-grey">Only used for multiplayer saves</div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import AvailSubListElement from '@/components/AvailSubListElement'

export default {
  data() {
    return {
      inputVal: '',
    }
  },
  computed: {
    ...mapGetters(['isMultiPlayer']),
    availSubList() {
      return this.$store.getters.campaign.elements.find((el) => el.name === 'AvailableSubs').elements
    },
  },
  methods: {
    keyUpHandler(ev) {
      if (ev.key === 'Enter') this.addSub()
    },
    addSub() {
      if (!this.inputVal) return
      this.availSubList.push({ type: 'element', name: 'Sub', attributes: { name: this.inputVal } })
      this.$store.dispatch('showAlert', {
        type: 'success',
        text: `Added ${this.inputVal} to the available submarines.`,
      })
      this.inputVal = ''
    },
    deleteSub(subName) {
      let index = this.availSubList.findIndex((el) => el.attributes.name == subName)
      this.availSubList.splice(index, 1)
      this.$store.dispatch('showAlert', {
        type: 'success',
        text: `Removed ${subName} from the available submarines.`,
      })
    },
  },
  components: {
    AvailSubListElement,
  },
}
</script>

<style scoped>
input {
  border: 1px solid white;
  color: white;
  width: 100%;
}
</style>
