<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title text class="text-black" style="font-size: 2em">{{ pageName }}</v-app-bar-title>
      <v-btn
        v-for="link in navLinks"
        :key="`navbar-link-${link.label}`"
        :to="link.url"
        class="mx-2 navbar-button"
        :class="{ 'text-secondary': link.name == $route.name }"
      >
        {{ link.label }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <v-dialog persistent v-model="isLoading" class="loader">
    <v-progress-circular indeterminate></v-progress-circular>
  </v-dialog>
  <AlertBox></AlertBox>
</template>

<script>
import { useDisplay } from 'vuetify'

import AlertBox from '@/components/AlertBox.vue'

export default {
  name: 'App',
  data() {
    return {
      navLinks: [
        {
          name: 'SaveTools',
          label: 'Save Editor',
          url: '/',
        },
        {
          name: 'SubTools',
          label: 'Submarine Editor',
          url: '/SubTools',
        },
        {
          name: 'Decompressor',
          label: 'Save Decompressor',
          url: '/Decompressor',
        },
        {
          name: 'About',
          label: 'About',
          url: '/About',
        },
      ],
    }
  },
  computed: {
    pageName() {
      return this.$route.meta.title
    },
    titleVisible() {
      return useDisplay().lgAndUp.value
    },
    isLoading() {
      return this.$store.state.isLoading
    },
  },
  components: {
    AlertBox,
  },
}
</script>

<style>
.v-app-bar-title {
  font-weight: bold;
}
.v-dialog.loader .v-overlay__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.navbar-button {
  background-color: rgb(var(--v-theme-surface)) !important;
  color: rgb(var(--v-theme-on-surface)) !important;
}
</style>
