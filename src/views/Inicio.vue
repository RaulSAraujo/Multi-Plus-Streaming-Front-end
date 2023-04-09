<template>
  <div>
    <v-card class="mx-auto" elevation="0">
      <v-row no-gutters>
        <h1 class="ml-10 pt-5 mb-n5">Tendências</h1>

        <v-btn-toggle
          v-model="tabsTendencias"
          class="mt-6 mb-n5 ml-12"
          rounded="xl"
          color="primary"
          variant="outlined"
          density="compact"
          divided
        >
          <v-btn value="day">Hoje</v-btn>
          <v-btn value="week">Nesta semana </v-btn>
        </v-btn-toggle>
      </v-row>

      <v-row no-gutters class="mt-5 mb-n4">
        <v-progress-linear
          v-if="loadingTendencias"
          indeterminate
          color="primary"
        ></v-progress-linear>
      </v-row>

      <v-slide-group
        ref="slideTendencias"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        :show-arrows="useDisplay.xs ? false : true"
      >
        <v-slide-group-item v-for="(tend, index) in tendencias" :key="index">
          <v-card
            color="black/80"
            class="ma-2"
            height="220"
            width="150"
            :to="{
              name: 'Detalhes',
              params: {
                id: tend.id,
                movieOrTv: tend.media_type,
              },
            }"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/original${tend.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${tend.poster_path}`"
              height="220px"
              cover
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                  ></v-progress-circular>
                </div> </template
            ></v-img>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-card>

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
        ref="slideGroupPopulares"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        :show-arrows="useDisplay.xs ? false : true"
      >
        <v-slide-group-item v-for="(pop, index) in populares" :key="index">
          <v-card
            color="black/80"
            class="ma-2"
            height="220"
            width="150"
            :to="{
              name: 'Detalhes',
              params: {
                id: pop.id,
                movieOrTv: pop.media_type,
              },
            }"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/original${pop.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${pop.poster_path}`"
              height="220px"
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
            </v-img>
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
        ref="slideGroupFree"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        :show-arrows="useDisplay.xs ? false : true"
      >
        <v-slide-group-item v-for="(free, index) in movieTvFree" :key="index">
          <v-card
            color="black/80"
            class="ma-2"
            height="220"
            width="150"
            :to="{
              name: 'Detalhes',
              params: {
                id: free.id,
                movieOrTv: tabsMovieTvFree,
              },
            }"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/original${free.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${free.poster_path}`"
              height="220px"
              cover
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                  ></v-progress-circular>
                </div> </template
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
      tabsTendencias: "day",
      tendencias: [],
      loadingTendencias: false,
    };
  },
  created() {
    this.getMovieTvFree();
    this.getPopulares();
    this.getTendencias();
  },
  watch: {
    tabsMovieTvFree() {
      this.$refs.slideGroupFree.scrollOffset = 0;
      this.getMovieTvFree();
    },
    tabsPopulares() {
      this.$refs.slideGroupPopulares.scrollOffset = 0;
      this.getPopulares();
    },
    tabsTendencias() {
      this.$refs.slideTendencias.scrollOffset = 0;
      this.getTendencias();
    },
  },
  methods: {
    getTendencias() {
      this.loadingTendencias = true;
      let url = `https://api.themoviedb.org/3/trending/all/${this.tabsTendencias}?api_key=9f9a623c8918bc56839f26a94b5507aa`;
      url = `${url}&language=pt-BR`;
      url = `${url}&sort_by=popularity.desc`;
      url = `${url}&with_original_language=en`;
      url = `${url}&watch_region=BR`;

      axios
        .get(url)
        .then((response) => {
          console.log("Tendencias", response);
          this.tendencias = response.data.results;
          this.loadingTendencias = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getPopulares() {
      try {
        this.loadingPopulares = true;

        const apiKey = "9f9a623c8918bc56839f26a94b5507aa";
        const language = "pt-BR";
        const originalLanguage = "en";
        const watchRegion = "BR";
        const tabsPopulares = this.tabsPopulares;

        const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&sort_by=popularity.desc&with_original_language=${originalLanguage}&with_watch_monetization_types=${tabsPopulares}&watch_region=${watchRegion}`;

        const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=${language}&sort_by=popularity.desc&with_original_language=${originalLanguage}&with_watch_monetization_types=${tabsPopulares}&watch_region=${watchRegion}`;

        const [movieResponse, tvResponse] = await Promise.all([
          axios.get(movieUrl),
          axios.get(tvUrl),
        ]);

        const movieData = movieResponse.data.results;
        const tvData = tvResponse.data.results;

        movieData.forEach((element) => {
          element["media_type"] = "movie";
        });

        tvData.forEach((element) => {
          element["media_type"] = "tv";
        });

        this.populares = movieData.concat(tvData);

        this.populares.sort((a, b) => b.popularity - a.popularity);

        this.loadingPopulares = false;
      } catch (error) {
        console.error(error);
      }
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
