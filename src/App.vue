<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title class="text-h4 text-black" text>{{ pageName }}</v-app-bar-title>
      <v-spacer />
      <v-btn v-for="link in navLinks" :key="`navbar-link-${link.label}`" :to="link.url" class="mx-2">
        {{ link.label }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
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
  },
}
</script>

<style>
.v-app-bar-title {
  font-weight: bold;
}
</style>
