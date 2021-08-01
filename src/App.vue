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
        :class="{ 'text-secondary': link.url == $route.path }"
      >
        {{ link.label }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <AlertBox></AlertBox>
</template>

<script>
import { useDisplay } from 'vuetify/lib/composables/display'

import AlertBox from '@/components/AlertBox'

export default {
  name: 'App',
  data() {
    return {
      navLinks: [
        {
          label: 'Save Editor',
          url: '/',
        },
        {
          label: 'Submarine Editor',
          url: '/SubTools',
        },
        {
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
</style>
