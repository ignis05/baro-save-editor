<template>
  <v-container>
    <!-- row 1 - file input-->
    <v-row>
      <v-col>
        <FileDropper></FileDropper>
      </v-col>
    </v-row>
    <!-- row 2 - save info and download -->
     <v-row>
      
    </v-row>
    <!-- row 3 - tools -->
     <v-row>
      <v-col>
        <!-- owned subs -->
      </v-col>
      <v-col>
        <!-- aval subs -->
      </v-col>
      <v-col>
        <!-- crew -->
      </v-col>
      <v-col>
        <!-- other -->
      </v-col>
    </v-row>
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
