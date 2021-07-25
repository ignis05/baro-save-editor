<template>
  <v-col>
    <v-card elevation="1">
      <v-btn color="secondary">Download</v-btn>
      <div class="float-right ma-1">
        Loaded file: <span class="text-primary">{{ filename }}</span> ,   modification date:
        <span class="text-primary">{{ modificationDate }}</span>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  computed: {
    filename() {
      return this.$store.state.savefileName || 'none'
    },
    modificationDate() {
      let timestamp = this.$store.state.gamesession.elements?.[0]?.attributes?.savetime
      if (!timestamp) return '-'
      let date = new Date(parseInt(timestamp) * 1000)
      return date.toLocaleString()
    },
  },
}
</script>

<style scoped></style>
