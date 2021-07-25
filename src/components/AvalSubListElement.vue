<template>
  <div class="flex-row">
    <span class="mr-4">{{ subName }}</span>
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
</style>
