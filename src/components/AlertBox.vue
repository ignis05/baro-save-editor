<template>
  <div elevation="0" class="d-flex flex-column justify-start align-center alertDisplayDiv">
    <v-alert :type="alertData.type" closable v-model="showAlert" elevation="1" class="mb-4">
      {{ alertData.text }}
    </v-alert>
  </div>
</template>

<script>
export default {
  computed: {
    showAlert: {
      get() {
        return !!this.$store.state.alert
      },
      set(value) {
        this.$store.dispatch('showAlert', value)
      },
    },
    alertData() {
      return this.$store.state.alert
    },
  },
}
</script>

<style>
div .alertDisplayDiv {
  position: absolute;
  bottom: 0;
  width: 100%;
  pointer-events: none;
}
div .alertDisplayDiv * {
  pointer-events: auto;
}
</style>
