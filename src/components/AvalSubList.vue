<template>
  <v-card elevation="1">
    <v-card-header class="flex-column align-center">
      <v-card-title> Available Submarines </v-card-title>
    </v-card-header>
    <v-sheet class="flex-column">
      <AvalSubListElement
        v-for="sub of avalSubList.map((el) => el.attributes.name)"
        :key="sub"
        :subName="sub"
        @deleteSub="deleteSub"
      ></AvalSubListElement>
    </v-sheet>
    <input ref="subListInput" /><v-btn @click="addSub" color="secondary">Add</v-btn>
  </v-card>
</template>

<script>
import AvalSubListElement from './AvalSubListElement.vue'

export default {
  data() {
    return {}
  },
  computed: {
    avalSubList() {
      return this.$store.getters.campaign.elements.find((el) => el.name === 'AvailableSubs').elements
    },
  },
  methods: {
    addSub() {
      let subName = this.$refs.subListInput.value
      this.avalSubList.push({ type: 'element', name: 'Sub', attributes: { name: subName } })
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
