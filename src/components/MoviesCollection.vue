<template>
  <v-dialog
    v-model="dialog"
    :height="!useDisplay.xs ? '80vh' : ''"
    :width="!useDisplay.xs ? '100vw' : ''"
    scrim="black"
    :fullscreen="useDisplay.xs"
    scrollable
  >
    <v-card v-if="!useDisplay.xs" :rounded="!useDisplay.xs ? 'xl' : ''">
      <v-card-title class="text-h5 py-4">
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
      <v-divider></v-divider>

      <v-list lines="two" class="ma-5">
        <v-list-item
          v-for="parts in collectionMovies.parts"
          :key="parts"
          :title="parts.title"
          :subtitle="parts.overview"
          border="sm"
          rounded="xl"
          class="mb-3"
        >
          <template v-slot:prepend>
            <v-avatar size="150" rounded="lg" color="grey-lighten-1">
              <v-img
                :src="`https://image.tmdb.org/t/p/original${parts.poster_path}`"
                :lazy-src="`https://image.tmdb.org/t/p/w300${parts.poster_path}`"
                cover
              ></v-img>
            </v-avatar>
          </template>

          <v-row class="mt-12" no-gutters justify="end">
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
        </v-list-item>
      </v-list>
    </v-card>

    <v-sheet v-else>
      <v-toolbar>
        <v-toolbar-title class="text-h5">
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
        </v-toolbar-title>
      </v-toolbar>
      <v-card v-for="parts in collectionMovies.parts" :key="parts" rounded="xl" class="ma-5">
        <v-img
          :src="`https://image.tmdb.org/t/p/original${parts.poster_path}`"
          :lazy-src="`https://image.tmdb.org/t/p/w300${parts.poster_path}`"
          gradient="to right, rgba(0,0,0,0.6),rgba(0,0,0,0.4),rgba(0,0,0,0.3),rgba(0,0,0,0)"
          cover
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>

          <v-card
            class="pa-4"
            height="100%"
            elevation="0"
            style="
              background: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.7)
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
          </v-card>

          <v-row class="mt-n15" justify="start" no-gutters>
            <v-list-item
              class="pr-3 pb-4"
              active-color="grey"
              width="100%"
              @click="dialog = false"
              :to="{
                name: 'Detalhes',
                params: { id: parts.id, movieOrTv: parts.media_type },
              }"
            >
              <v-list-item-title>Veja mais detalhes</v-list-item-title>
              <v-list-item-subtitle>Click aqui</v-list-item-subtitle>
            </v-list-item>
          </v-row>
        </v-img>
      </v-card>
    </v-sheet>
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
          `${import.meta.env.VITE_BASE_URL}/collection/${
            this.collectionId
          }?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`
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
