<template>
  <v-dialog
    v-model="dialog"
    scrollable
    height="70vh"
    width="80vw"
    scrim="black"
  >
    <v-card
      rounded="xl"
      border="sm"
      :image="`https://image.tmdb.org/t/p/original${collectionMovies.backdrop_path}`"
    >
      <v-card-title style="background: rgb(0, 0, 0, 0.9)" class="text-h5 py-4">
        <v-row no-gutters>
          <span class="text-h4"> {{ collectionMovies.name }}</span>
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
        <v-banner
          v-for="parts in collectionMovies.parts"
          :key="parts"
          class="my-4"
          rounded="xl"
          elevation="8"
          border="sm"
          style="background: rgb(0, 0, 0, 0.9)"
        >
          <template v-slot:prepend>
            <v-avatar size="130">
              <v-img
                v-if="parts.poster_path"
                :src="`https://image.tmdb.org/t/p/w200${parts.poster_path}`"
                :alt="parts.title"
                cover
              ></v-img>
              <v-icon v-else icon="mdi-cancel" size="80"></v-icon>
            </v-avatar>
          </template>

          <v-banner-text>
            <p class="text-h6">{{ parts.title }}</p>

            <p class="text-caption-2">
              {{
                parts.release_date != "" ? formatDate(parts.release_date) : ""
              }}
            </p>
            <span class="text-body-1">{{ parts.overview }}</span>
          </v-banner-text>

          <template v-slot:actions>
            <v-btn color="primary" variant="plain">Veja mais</v-btn>
          </template>
        </v-banner>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    collectionId: Number,
  },
  data() {
    return {
      dialog: false,
      collectionMovies: [],
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