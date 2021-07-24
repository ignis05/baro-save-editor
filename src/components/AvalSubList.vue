<template>
  <v-card elevation="1">
    <v-card-header class="flex-column align-center">
      <v-card-title> Available Submarines </v-card-title>
      <v-sheet class="flex-column">
        <AvalSubListElement v-for="sub of avalSubList" :key="sub" :subName="sub"></AvalSubListElement>
      </v-sheet>
    </v-card-header>
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
      let aSubs = this.$store.state.FileModule.gamesession.elements?.[0]?.elements
        ?.find((el) => el.name === 'MultiPlayerCampaign')
        .elements.find((el) => el.name === 'AvailableSubs')
      return aSubs.elements.map((el) => el.attributes.name)
    },
  },
  components: {
    AvalSubListElement,
  },
}
</script>

<style></style>
