<template>
  <div class="d-flex flex-row justify-space-between px-4">
    <div class="subname">{{ subName }}</div>
    <v-icon color="red" class="deleteIcon" @click="emitDelete">mdi-delete-outline</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    subName: String,
  },
  methods: {
    emitDelete() {
      this.$emit('deleteSub', this.subName)
    },
  },
}
</script>

<style scoped>
.deleteIcon {
  cursor: pointer;
}
.subname {
  display: inline-block;
}
</style>
