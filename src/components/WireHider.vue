<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title> Wire Hider </v-card-title>
    </v-card-header>
    <v-sheet class="mb-2 px-4 d-flex flex-row justify-center">
      <select v-model="selectedWireType" class="px-2">
        <option value="all">all</option>
        <option value="whitewire">white</option>
        <option value="redwire">red</option>
        <option value="bluewire">blue</option>
        <option value="yellowwire">yellow</option>
        <option value="greenwire">green</option>
        <option value="blackwire">black</option>
        <option value="brownall">brown</option>
      </select>
      <v-btn @click="hideWires" variant="outlined" color="secondary" class="mx-2">Hide</v-btn>
      <v-btn @click="unhideWires" variant="outlined" color="secondary">Unhide</v-btn>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selectedWireType: 'all',
    }
  },
  methods: {
    hideWires(setToBool = true) {
      var setTo = setToBool ? 'True' : 'False'
      var count = 0
      for (let wire of this.$store.getters.sub.elements.filter((el) => this.matchWireType(el.attributes.identifier))) {
        if (wire.attributes.hiddeningame != setTo) {
          wire.attributes.hiddeningame = setTo
          count++
        }
      }
      if (count > 0)
        this.$store.dispatch('showAlert', {
          type: 'success',
          text: `Set ${count} wires to ${setToBool ? 'hidden' : 'visible'}`,
        })
      else
        this.$store.dispatch('showAlert', {
          type: 'info',
          text: `All wires of that type were already set to ${setToBool ? 'hidden' : 'visible'}`,
        })
    },
    unhideWires() {
      this.hideWires(false)
    },
    matchWireType(identifier) {
      if (this.selectedWireType === 'all') return /^.*wire$/.test(identifier)
      return identifier === this.selectedWireType
    },
  },
}
</script>

<style scoped>
select {
  border: 1px solid white;
  color: white;
  cursor: pointer;
}
option {
  background: #212121;
}
</style>
