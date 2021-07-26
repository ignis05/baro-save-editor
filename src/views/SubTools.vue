<template>
  <v-container>
    <!-- row 1 - file input-->
    <v-row>
      <v-col>
        <FileDropper :fromSubEditor="true"></FileDropper>
      </v-col>
    </v-row>
    <!-- row 2 - submarine info and download -->
    <v-row>
      <SubDataBar :blockDownload="!subLoaded"></SubDataBar>
    </v-row>

    <!-- row 3 - tools -->
    <v-row v-if="subLoaded">
      <v-col>
        <ShuttleExporter></ShuttleExporter>
      </v-col>
      <v-col></v-col>
      <v-col></v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import FileDropper from '../components/FileDropper.vue'
import ShuttleExporter from '../components/ShuttleExporter.vue'
import SubDataBar from '../components/SubDataBar.vue'

export default {
  name: 'SubTools',
  computed: {
    ...mapGetters(['subLoaded']),
  },
  components: {
    FileDropper,
    ShuttleExporter,
    SubDataBar,
  },
}
</script>
