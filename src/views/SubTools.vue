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
      <v-col>
        <WireHider></WireHider>
      </v-col>
      <v-col>
        <ScriptRunner></ScriptRunner>
      </v-col>
      <v-col>
        <MiscSubTools></MiscSubTools>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import FileDropper from '../components/FileDropper.vue'
import MiscSubTools from '../components/MiscSubTools.vue'
import ScriptRunner from '../components/ScriptRunner.vue'
import ShuttleExporter from '../components/ShuttleExporter.vue'
import SubDataBar from '../components/SubDataBar.vue'
import WireHider from '../components/WireHider.vue'

export default {
  name: 'SubTools',
  computed: {
    ...mapGetters(['subLoaded']),
  },
  components: {
    FileDropper,
    MiscSubTools,
    ScriptRunner,
    ShuttleExporter,
    SubDataBar,
    WireHider,
  },
}
</script>
