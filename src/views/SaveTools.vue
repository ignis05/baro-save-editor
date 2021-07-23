<template>
  <v-container>
    <!-- row 1 -->
    <v-row>
      <v-col>
        <FileDropper></FileDropper>
      </v-col>
    </v-row>
    <!-- row 2 -->
  </v-container>
</template>

<script>
import FileDropper from '../components/FileDropper.vue'

export default {
  name: 'SaveTools',

  components: {
    FileDropper,
  },
}
</script>
