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
      <SaveDataBar :blockDownload="!saveLoaded"></SaveDataBar>
    </v-row>
    <!-- row 3 - tools -->
    <v-row v-if="saveLoaded">
      <v-col>
        <!-- owned subs -->
      </v-col>
      <v-col v-if="isMultiPlayer">
        <AvalSubList></AvalSubList>
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
import { mapGetters } from 'vuex'

import AvalSubList from '../components/AvalSubList.vue'
import FileDropper from '../components/FileDropper.vue'
import SaveDataBar from '../components/SaveDataBar.vue'

export default {
  name: 'SaveTools',

  components: {
    AvalSubList,
    FileDropper,
    SaveDataBar,
  },
  computed: {
    ...mapGetters(['saveLoaded', 'isMultiPlayer']),
  },
}
</script>
