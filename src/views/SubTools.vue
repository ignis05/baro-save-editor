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

import FileDropper from '@/components/FileDropper'
import MiscSubTools from '@/components/MiscSubTools'
import ScriptRunner from '@/components/ScriptRunner'
import ShuttleExporter from '@/components/ShuttleExporter'
import SubDataBar from '@/components/SubDataBar'
import WireHider from '@/components/WireHider'

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
