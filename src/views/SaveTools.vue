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
        <OwnedSubList></OwnedSubList>
      </v-col>
      <v-col v-if="isMultiPlayer">
        <AvalSubList></AvalSubList>
      </v-col>
      <v-col>
        <CrewList></CrewList>
      </v-col>
      <v-col>
        <MiscSaveTools></MiscSaveTools>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import AvalSubList from '@/components/AvalSubList'
import CrewList from '@/components/CrewList'
import FileDropper from '@/components/FileDropper'
import MiscSaveTools from '@/components/MiscSaveTools'
import OwnedSubList from '@/components/OwnedSubList'
import SaveDataBar from '@/components/SaveDataBar'

export default {
  name: 'SaveTools',

  components: {
    AvalSubList,
    CrewList,
    FileDropper,
    MiscSaveTools,
    OwnedSubList,
    SaveDataBar,
  },
  computed: {
    ...mapGetters(['saveLoaded', 'isMultiPlayer']),
  },
}
</script>
