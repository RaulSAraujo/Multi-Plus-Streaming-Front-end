<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :height="!useDisplay.xs ? '80vh' : ''"
    :width="!useDisplay.xs ? '100vw' : ''"
    scrim="black"
    :fullscreen="useDisplay.xs"
  >
    <v-card :rounded="!useDisplay.xs ? 'xl' : ''" color="black">
      <v-card-title style="background: rgb(0, 0, 0, 0.9)" class="text-h5 py-4 ">
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

      <v-card
        v-for="parts in collectionMovies.parts"
        :key="parts"
        elevation="0"
        color="rgba(0,0,0,0.1)"
        rounded="xl"
        :height="!useDisplay.xs ? '450' : '300'"
        class="my-3 mx-5"
      >
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="3" lg="3" xl="2">
            <v-img
              :src="`https://image.tmdb.org/t/p/original${parts.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${parts.poster_path}`"
              gradient="to right, rgba(0,0,0,0.6),rgba(0,0,0,0.4),rgba(0,0,0,0.3),rgba(0,0,0,0)"
              cover
              height="100%"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                  ></v-progress-circular>
                </div>
              </template>
            </v-img>
          </v-col>
          <v-col cols="12" sm="12" md="9" lg="9" xl="10">
            <v-card
              class="pa-4"
              height="100%"
              elevation="0"
              style="
                background: linear-gradient(
                  rgba(35, 35, 36, 0.6),
                  rgba(35, 35, 36, 0.8),
                  rgba(35, 35, 36, 0.8),
                  rgba(35, 35, 36, 0.6)
                );
              "
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
              <v-row no-gutters justify="end">
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
          </v-col>
        </v-row>
      </v-card>
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
