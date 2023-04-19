<template>
  <div>
    <v-img
      v-if="!useDisplay.xs"
      :src="imgUrlPoster(imgSelected)"
      :lazy-src="lazyImgUrlPoster(imgSelected)"
      height="70vh"
      cover
      class="align-end"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>

      <v-slide-group v-model="modelPosters" class="pa-4" show-arrows tag="div">
        <v-slide-group-item
          v-for="(poster, index) in posters"
          :key="index"
          v-slot="{ isSelected, toggle }"
        >
          <div class="d-flex align-end">
            <v-card
              color="black"
              class="card-transition ma-4"
              :height="isSelected ? '50vh' : '30vh'"
              :width="isSelected ? '17vw' : '9vw'"
              min-width="200px"
              rounded="lg"
            >
              <v-img
                :src="`https://image.tmdb.org/t/p/original${poster.poster_path}`"
                :lazy-src="`https://image.tmdb.org/t/p/w300${poster.poster_path}`"
                height="100%"
                cover
                :gradient="
                  isSelected
                    ? 'to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)'
                    : ''
                "
                class="align-end"
                style="cursor: pointer"
                @click="toggle"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular
                      color="grey-lighten-4"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </template>

                <v-row
                  v-if="isSelected"
                  no-gutters
                  class="mb-4"
                  justify="center"
                >
                  <v-btn
                    class="mt-4"
                    variant="outlined"
                    prepend-icon="mdi-information"
                    :to="{
                      name: 'Detalhes',
                      params: {
                        id: poster.id,
                        movieOrTv: poster.media_type,
                      },
                    }"
                    >Saiba mais</v-btn
                  >
                </v-row>
              </v-img>
            </v-card>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-img>

    <v-card class="mx-auto" color="black" elevation="0">
      <v-row v-if="!useDisplay.xs" no-gutters>
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
      <v-row v-if="useDisplay.xs" justify="center" class="pt-6 mb-n5">
        <h1>Tendências</h1>
      </v-row>
      <v-row v-if="useDisplay.xs" justify="center" class="mt-6 mb-n5">
        <v-btn-toggle
          v-model="tabsTendencias"
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
              :src="imgUrl(tend)"
              :lazy-src="lazyImgUrl(tend)"
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

    <v-card class="mx-auto" color="black" elevation="0">
      <v-row v-if="!useDisplay.xs" no-gutters>
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
      <v-row v-if="useDisplay.xs" justify="center" class="pt-5 mb-n5">
        <h1>Os Mais Populares</h1>
      </v-row>
      <v-row v-if="useDisplay.xs" justify="center" class="mt-6 mb-n5">
        <v-btn-toggle
          v-model="tabsPopulares"
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
              :src="imgUrl(pop)"
              :lazy-src="lazyImgUrl(pop)"
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

    <v-card class="mx-auto" color="black" elevation="0">
      <v-row v-if="!useDisplay.xs" no-gutters>
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
      <v-row v-if="useDisplay.xs" justify="center" class="pt-5 mb-n5">
        <h1>Grátis para Assistir</h1>
      </v-row>
      <v-row v-if="useDisplay.xs" justify="center" class="mt-6 mb-n5">
        <v-btn-toggle
          v-model="tabsMovieTvFree"
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
              :src="imgUrl(free)"
              :lazy-src="lazyImgUrl(free)"
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
      posters: [],
      modelPosters: 0,
      imgSelected: [],
    };
  },
  created() {
    this.getPoster();
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
    posters() {
      this.imgSelected = this.posters[this.modelPosters];
    },
    modelPosters() {
      this.imgSelected = this.posters[this.modelPosters];
    },
  },
  methods: {
    getTendencias() {
      this.loadingTendencias = true;
      let url = `${import.meta.env.VITE_BASE_URL}/trending/all/${
        this.tabsTendencias
      }?api_key=${import.meta.env.VITE_API_KEY}`;
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

        const apiKey = `${import.meta.env.VITE_API_KEY}`;
        const language = "pt-BR";
        const originalLanguage = "en";
        const watchRegion = "BR";
        const tabsPopulares = this.tabsPopulares;

        const movieUrl = `${
          import.meta.env.VITE_BASE_URL
        }/discover/movie?api_key=${apiKey}&language=${language}&sort_by=popularity.desc&with_original_language=${originalLanguage}&with_watch_monetization_types=${tabsPopulares}&watch_region=${watchRegion}`;

        const tvUrl = `${
          import.meta.env.VITE_BASE_URL
        }/discover/tv?api_key=${apiKey}&language=${language}&sort_by=popularity.desc&with_original_language=${originalLanguage}&with_watch_monetization_types=${tabsPopulares}&watch_region=${watchRegion}`;

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
      let url = `${import.meta.env.VITE_BASE_URL}/discover/${
        this.tabsMovieTvFree
      }?api_key=${import.meta.env.VITE_API_KEY}`;
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
    async getPoster() {
      try {
        const apiKey = `${import.meta.env.VITE_API_KEY}`;
        const language = "pt-BR";
        const originalLanguage = "en";
        const watchRegion = "BR";

        const movieUrl = `${
          import.meta.env.VITE_BASE_URL
        }/discover/movie?api_key=${apiKey}&language=${language}&sort_by=popularity.desc&with_original_language=${originalLanguage}&watch_region=${watchRegion}`;

        const tvUrl = `${
          import.meta.env.VITE_BASE_URL
        }/discover/tv?api_key=${apiKey}&language=${language}&sort_by=popularity.desc&with_original_language=${originalLanguage}&watch_region=${watchRegion}`;

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

        this.posters = movieData.concat(tvData);

        this.posters.sort((a, b) => b.popularity - a.popularity);
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(dateString) {
      const date = dateString != undefined ? new Date(dateString) : "";
      return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
        date
      );
    },
    imgUrlPoster(props) {
      let imgNotFound = new URL(
        `@/assets/img/image-not-found.png`,
        import.meta.url
      );
      if (props.backdrop_path != null)
        return `https://image.tmdb.org/t/p/original${props.backdrop_path}`;
      if (props.poster_path != null)
        return `https://image.tmdb.org/t/p/original${props.poster_path}`;
      else return imgNotFound.toString();
    },
    lazyImgUrlPoster(props) {
      let imgNotFound = new URL(
        `@/assets/img/image-not-found.png`,
        import.meta.url
      );
      if (props.backdrop_path != null)
        return `https://image.tmdb.org/t/p/w300${props.backdrop_path}`;
      if (props.poster_path != null)
        return `https://image.tmdb.org/t/p/w300${props.poster_path}`;
      else return imgNotFound.toString();
    },
    imgUrl(props) {
      let imgNotFound = new URL(
        `@/assets/img/image-not-found.png`,
        import.meta.url
      );
      if (props.poster_path != null)
        return `https://image.tmdb.org/t/p/original${props.poster_path}`;
      if (props.backdrop_path != null)
        return `https://image.tmdb.org/t/p/original${props.backdrop_path}`;
      else return imgNotFound.toString();
    },
    lazyImgUrl(props) {
      let imgNotFound = new URL(
        `@/assets/img/image-not-found.png`,
        import.meta.url
      );
      if (props.poster_path != null)
        return `https://image.tmdb.org/t/p/w300${props.poster_path}`;
      if (props.backdrop_path != null)
        return `https://image.tmdb.org/t/p/w300${props.backdrop_path}`;
      else return imgNotFound.toString();
    },
  },
};
</script>

<style scoped>
.styleTabs {
  border: 1px solid white;
  padding: 0px 20px 0px 20px;
}
.card-transition {
  transition: height 0.6s, width 0.9s;
}
</style>
