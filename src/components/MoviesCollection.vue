<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :height="!useDisplay.xs ? '70vh' : ''"
    :width="!useDisplay.xs ? '80vw' : ''"
    scrim="black"
    :fullscreen="useDisplay.xs"
  >
    <v-card :rounded="!useDisplay.xs ? 'xl' : ''" border="sm" color="black">
      <v-card-title style="background: rgb(0, 0, 0, 0.9)" class="text-h5 py-4">
        <v-row no-gutters>
          <span :class="!useDisplay.xs ? 'text-h4' : ''">
            {{ collectionMovies.name }}</span
          >
          <v-spacer></v-spacer>
          <v-icon
            icon="mdi-close"
            size="small"
            color="grey"
            @click="dialog = false"
          ></v-icon>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-card
          v-for="parts in collectionMovies.parts"
          :key="parts"
          elevation="5"
          border="sm"
          rounded="xl"
          :height="!useDisplay.xs ? '250' : '300'"
          class="ma-3"
        >
          <v-img
            :src="`https://image.tmdb.org/t/p/original${parts.poster_path}`"
            gradient="to bottom, rgba(0,0,0,.9), rgba(0,0,0,.5)"
            cover
          >
            <v-card-title>{{ parts.title }}</v-card-title>
            <v-card-subtitle class="mt-n1">
              {{
                parts.release_date != "" ? formatDate(parts.release_date) : ""
              }}</v-card-subtitle
            >
            <v-card-text>
              <p
                style="
                  display: -webkit-box;
                  max-width: 100vw;
                  -webkit-line-clamp: 5;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                "
                class="text-body-2"
              >
                {{ parts.overview }}
              </p>
            </v-card-text>
          </v-img>
          <v-row class="mt-n9" no-gutters justify="end">
            <v-btn
              variant="plain"
              @click="dialog = false"
              :to="{
                name: 'Detalhes',
                params: { id: parts.id, movieOrTv: parts.media_type },
              }"
              >Ver mais</v-btn
            >
          </v-row>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useDisplay } from "vuetify";
export default {
  props: {
    collectionId: Number,
  },
  data() {
    return {
      dialog: false,
      collectionMovies: [],
      useDisplay: useDisplay(),
    };
  },
  watch: {
    dialog(val) {
      if (val == true) {
        this.getWatchColection();
      }
    },
  },
  methods: {
    getWatchColection() {
      axios
        .get(
          `https://api.themoviedb.org/3/collection/${this.collectionId}?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR`
        )
        .then((response) => {
          console.log("Collections", response);
          this.collectionMovies = response.data;
          this.dialog = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(dateString) {
      const date = dateString != undefined ? new Date(dateString) : "";
      return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
        date
      );
    },
  },
};
</script>

<style>
</style>
