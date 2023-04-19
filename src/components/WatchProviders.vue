<template>
  <v-dialog
    v-model="dialog"
    :width="!useDisplay.xs ? '70vw' : ''"
    :fullscreen="useDisplay.xs"
    scrim="black"
  >
    <v-card width="100%" :rounded="!useDisplay.xs ? 'xl' : ''">
      <template v-slot:title>
        <span :class="!useDisplay.xs ? 'text-h5' : ''">{{ this.title }} </span>
      </template>

      <template v-slot:subtitle>
        <span
          >está atualmente disponível para ver em Stream ou alugue. Descubra
          onde você pode assistir legalmente seus filmes e séries online.</span
        >
      </template>

      <template v-slot:append>
        <v-btn icon="mdi-close" flat @click="dialog = false"></v-btn>
      </template>

      <v-divider class="my-2"></v-divider>

      <v-card-text v-if="movieProviders" class="pa-5">
        <span class="text-h5">Stream</span>
        <v-row justify="start" no-gutters class="my-3">
          <v-col
            v-for="providers in movieProviders.flatrate"
            :key="providers"
            class="my-1"
            cols="3"
            sm="3"
            md="2"
            lg="1"
          >
            <v-avatar rounded="lg" :size="!useDisplay.xs ? '65' : '50'">
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${providers.logo_path}`"
                :alt="providers.provider_name"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>

        <span class="text-h5">Alugar</span>
        <v-row
          v-if="movieProviders.rent"
          justify="start"
          no-gutters
          class="my-4"
        >
          <v-col
            v-for="providers in movieProviders.rent"
            :key="providers"
            class="my-1"
            cols="3"
            sm="3"
            md="2"
            lg="1"
          >
            <v-avatar rounded="lg" :size="!useDisplay.xs ? '65' : '50'">
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${providers.logo_path}`"
                :alt="providers.provider_name"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <p v-else>
          Infelizmente
          {{ this.tvOrMovie == "movie" ? "este filme" : "esta serie" }} não esta
          disponivel para alugar.
        </p>

        <span class="text-h5">Comprar</span>
        <v-row
          v-if="movieProviders.buy"
          justify="start"
          no-gutters
          class="my-4"
        >
          <v-col
            v-for="providers in movieProviders.buy"
            :key="providers"
            class="my-1"
            cols="3"
            sm="3"
            md="2"
            lg="1"
          >
            <v-avatar rounded="lg" :size="!useDisplay.xs ? '65' : '50'">
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${providers.logo_path}`"
                :alt="providers.provider_name"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <p v-else>
          Infelizmente
          {{ this.tvOrMovie == "movie" ? "este filme" : "esta serie" }} não esta
          disponivel para compra.
        </p>
      </v-card-text>

      <v-card-text v-else>
        <div class="d-flex flex-column justify-center align-center mb-5">
          <v-icon icon="mdi-alert-circle" size="50"></v-icon>
          <p :class="!useDisplay.xs ? 'text-h6' : 'text-center'">
            Infelizmente
            {{ this.tvOrMovie == "movie" ? "este filme" : "esta serie" }} não
            esta disponivel no momento.
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useDisplay } from "vuetify";
export default {
  props: {
    id: Number,
    title: String,
    tvOrMovie: String,
  },
  data() {
    return {
      dialog: false,
      movieProviders: [],
      useDisplay: useDisplay(),
    };
  },
  watch: {
    dialog(val) {
      if (val == true) {
        this.getWatchProviders();
      }
    },
  },
  methods: {
    getWatchProviders() {
      axios
        .get(
          `${import.meta.env.VITE_BASE_URL}/${this.tvOrMovie}/${this.id}/watch/providers?api_key=${import.meta.env.VITE_API_KEY}`
        )
        .then((response) => {
          this.movieProviders = response.data.results.BR;
          this.dialog = true;
          console.log("Providers", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>
