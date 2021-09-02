<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title v-if="titleVisible" class="text-h4 text-black" text>{{ pageName }}</v-app-bar-title>
      <v-spacer v-if="titleVisible" />
      <v-btn
        v-for="link in navLinks"
        :key="`navbar-link-${link.label}`"
        :to="link.url"
        class="mx-2"
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
import { useDisplay } from 'vuetify/composables'

import AlertBox from '@/components/AlertBox'

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
      return useDisplay().mdAndUp.value
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
</style>
