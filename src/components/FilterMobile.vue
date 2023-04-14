<template>
  <v-btn
    id="btnFloating"
    icon="mdi-filter-variant"
    color="primary"
    @click="dialog = true"
  ></v-btn>

  <v-dialog v-model="dialog" scrim="black" scrollable fullscreen>
    <v-sheet>
      <v-toolbar color="grey-darken-3" density="compact">
        <v-toolbar-title> Generos </v-toolbar-title>
        <v-toolbar-items>
          <v-btn
            icon="mdi-close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-list active-color="primary" >
        <v-list-item
          v-for="genre in genres"
          :key="genre.id"
          :title="genre.name"
          :value="genre.id"
          color="primary"
          @click="changeGenreList(genre)"
        >
          <!-- <template v-slot:prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
            </v-list-item-action>
          </template> -->
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  props: {
    genres: Array
  },
  emits: ["eventChangeGenre"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    changeGenreList(genre) {
      this.$emit("eventChangeGenre", genre);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
#btnFloating {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
</style>
