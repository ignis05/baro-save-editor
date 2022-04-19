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
      <v-col>
        <CampaignSettings></CampaignSettings>
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

import CampaignSettings from '@/components/CampaignSettings.vue'
import CrewList from '@/components/CrewList.vue'
import FileDropper from '@/components/FileDropper.vue'
import MiscSaveTools from '@/components/MiscSaveTools.vue'
import OwnedSubList from '@/components/OwnedSubList.vue'
import SaveDataBar from '@/components/SaveDataBar.vue'

export default {
  name: 'SaveTools',

  components: {
    CampaignSettings,
    CrewList,
    FileDropper,
    MiscSaveTools,
    OwnedSubList,
    SaveDataBar,
  },
  computed: {
    ...mapGetters(['saveLoaded']),
  },
}
</script>
