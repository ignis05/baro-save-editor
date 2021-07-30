<template>
  <v-card elevation="1" class="pb-2">
    <v-card-header class="flex-column align-center">
      <v-card-title>{{ isMultiPlayer ? 'Hired Bots' : 'Current Crew' }}</v-card-title>
    </v-card-header>
    <v-sheet class="mb-2">
      <v-sheet
        v-for="el of crewList.elements"
        :key="hashWrapper(el.attributes)"
        :class="`d-flex flex-row justify-center px-4 ${el.elements.find((e) => e.name == 'job').attributes.identifier}`"
      >
        <div class="name">{{ el.attributes.name }}</div>
        <v-spacer></v-spacer>
        <v-icon title="edit" color="secondary" class="iconButton" @click="editChar(el)"> mdi-file-edit-outline </v-icon>
        <v-icon title="delete" color="red" class="iconButton" @click="deleteChar(el)">mdi-delete-outline</v-icon>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import sum from 'hash-sum'

export default {
  data() {
    return {
      color: {
        captain: '#718fb7',
        engineer: '#d7ac60',
        mechanic: '#60c9d0',
        securityofficer: '#8d776a',
        medicaldoctor: '#b9472b',
        assistant: '#f8f8f8',
      },
    }
  },
  computed: {
    ...mapGetters(['isMultiPlayer']),
    crewList() {
      return this.$store.getters.campaign.elements.find((el) =>
        this.isMultiPlayer ? el.name == 'bots' : el.name == 'crew',
      )
    },
  },
  methods: {
    hashWrapper(object) {
      return sum(object)
    },
    editChar(el) {
      console.log(el)
    },
    deleteChar(el) {
      console.log(el)
    },
  },
}
</script>

<style scoped>
.iconButton {
  cursor: pointer;
}

.captain {
  color: #718fb7;
}

.engineer {
  color: #d7ac60;
}

.mechanic {
  color: #60c9d0;
}

.securityofficer {
  color: #8d776a;
}

.medicaldoctor {
  color: #b9472b;
}

.assistant {
  color: #f8f8f8;
}
</style>
