<template>
  <div>
    <v-card class="mx-auto" elevation="0">
      <v-row no-gutters>
        <h1 class="ml-10 pt-5 mb-n5">Os Mais Populares</h1>

        <v-btn-toggle
          v-model="tabsPopulares"
          class="mt-6 mb-n5 ml-12"
          rounded="xl"
          color="primary"
          variant="outlined"
          density="compact"
        >
          <v-btn value="flatrate">Streaming</v-btn>
          <v-btn value="rent"> Para alugar </v-btn>
          <v-btn value="buy"> Comprar </v-btn>
        </v-btn-toggle>
      </v-row>

      <v-row no-gutters class="mt-5 mb-n4">
        <v-progress-linear
          v-if="loadingPopulares"
          indeterminate
          color="primary"
        ></v-progress-linear>
      </v-row>

      <v-slide-group
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        :show-arrows="useDisplay.xs ? false : true"
      >
        <v-slide-group-item v-for="(pop, index) in populares" :key="index">
          <v-card color="black/80" class="ma-2" height="220" width="150">
            <v-img
              :src="`https://image.tmdb.org/t/p/original${pop.poster_path}`"
              height="220px"
              cover
            ></v-img>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-card>

    <v-card class="mx-auto" elevation="0">
      <v-row no-gutters>
        <h1 class="ml-10 pt-5 mb-n5">Grátis para Assistir</h1>

        <v-btn-toggle
          v-model="tabsMovieTvFree"
          class="mt-6 mb-n5 ml-12"
          rounded="xl"
          color="primary"
          variant="outlined"
          density="compact"
          divided
        >
          <v-btn value="movie">Filmes</v-btn>
          <v-btn value="tv"> Series </v-btn>
        </v-btn-toggle>
      </v-row>

      <v-row no-gutters class="mt-5 mb-n4">
        <v-progress-linear
          v-if="loadingMovieTvFree"
          indeterminate
          color="primary"
        ></v-progress-linear>
      </v-row>

      <v-slide-group
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        :show-arrows="useDisplay.xs ? false : true"
      >
        <v-slide-group-item v-for="(free, index) in movieTvFree" :key="index">
          <v-card color="black/80" class="ma-2" height="220" width="150">
            <v-img
              :src="`https://image.tmdb.org/t/p/original${free.poster_path}`"
              height="220px"
              cover
            ></v-img>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { useDisplay } from "vuetify";

export default {
  data() {
    return {
      useDisplay: useDisplay(),
      tabsMovieTvFree: "movie",
      movieTvFree: [],
      loadingMovieTvFree: false,
      tabsPopulares: "flatrate",
      populares: [],
      loadingPopulares: false,
    };
  },
  created() {
    this.getMovieTvFree();
    this.getPopulares();
  },
  watch: {
    tabsMovieTvFree() {
      this.getMovieTvFree();
    },
    tabsPopulares() {
      this.getPopulares();
    },
  },
  methods: {
    getPopulares() {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=9f9a623c8918bc56839f26a94b5507aa`;
      url = `${url}&language=pt-BR`;
      url = `${url}&sort_by=popularity.desc`;
      url = `${url}&with_original_language=en`;
      url = `${url}&with_watch_monetization_types=${this.tabsPopulares}`;
      url = `${url}&watch_region=BR`;

      axios
        .get(url)
        .then((response1) => {
          console.log("PopularesMovie", response1);
          const data1 = response1.data.results;

          let url2 = `https://api.themoviedb.org/3/discover/tv?api_key=9f9a623c8918bc56839f26a94b5507aa`;
          url2 = `${url2}&language=pt-BR`;
          url2 = `${url2}&sort_by=popularity.desc`;
          url2 = `${url2}&with_original_language=en`;
          url2 = `${url2}&with_watch_monetization_types=${this.tabsPopulares}`;
          url2 = `${url2}&watch_region=BR`;

          axios
            .get(url2)
            .then((response2) => {
              console.log("PopularesTv", response2);
              const data2 = response2.data.results;

              const mergedData = data1.concat(data2);

              this.populares = mergedData.filter(
                (item) => item.popularity > 700
              );
              this.populares.sort((a, b) => b.popularity - a.popularity);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMovieTvFree() {
      this.loadingMovieTvFree = true;
      let url = `https://api.themoviedb.org/3/discover/${this.tabsMovieTvFree}?api_key=9f9a623c8918bc56839f26a94b5507aa`;
      url = `${url}&language=pt-BR`;
      url = `${url}&sort_by=popularity.desc`;
      url = `${url}&with_original_language=en`;
      url = `${url}&with_watch_monetization_types=free`;
      url = `${url}&watch_region=BR`;

      axios
        .get(url)
        .then((response) => {
          console.log("Free", response);
          this.movieTvFree = response.data.results;
          this.loadingMovieTvFree = false;
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

<style scoped>
.styleTabs {
  border: 1px solid white;
  padding: 0px 20px 0px 20px;
}
</style>
