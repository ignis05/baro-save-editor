<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Available Submarines </v-card-title>
    </v-card-header>
    <v-sheet class="mb-2">
      <AvalSubListElement
        v-for="sub of avalSubList.map((el) => el.attributes.name)"
        :key="sub"
        :subName="sub"
        @deleteSub="deleteSub"
      ></AvalSubListElement>
    </v-sheet>
    <v-sheet class="d-flex flex-row justify-space-between px-2">
      <input v-model="inputVal" @keyup="keyUpHandler" ref="subListInput" class="mr-2 pl-2" />
      <v-btn :disabled="!inputVal" @click="addSub" color="secondary">Add</v-btn>
    </v-sheet>
  </v-card>
</template>

<script>
import AvalSubListElement from './AvalSubListElement.vue'

export default {
  data() {
    return {
      inputVal: '',
    }
  },
  computed: {
    avalSubList() {
      return this.$store.getters.campaign.elements.find((el) => el.name === 'AvailableSubs').elements
    },
  },
  methods: {
    keyUpHandler(ev) {
      if (ev.key === 'Enter') this.addSub()
    },
    addSub() {
      if (!this.inputVal) return
      this.avalSubList.push({ type: 'element', name: 'Sub', attributes: { name: this.inputVal } })
      this.inputVal = ''
    },
    deleteSub(subName) {
      let index = this.avalSubList.findIndex((el) => el.attributes.name == subName)
      this.avalSubList.splice(index, 1)
    },
  },
  components: {
    AvalSubListElement,
  },
}
</script>

<style scoped>
input {
  border: 1px solid white;
  color: white;
}
</style>
