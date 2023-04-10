<template>
  <div>
    <v-carousel
      v-model="modelCarousel"
      cycle
      height="420"
      hide-delimiter-background
      hide-delimiters
      show-arrows="hover"
      :interval="isHovering ? 50000 : 6000"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <v-carousel-item
        v-for="(movies, index) in moviesUpcoming"
        :key="index"
        :src="`https://image.tmdb.org/t/p/original${
          movies.backdrop_path != null
            ? movies.backdrop_path
            : movies.poster_path
        }`"
        :lazy-src="`https://image.tmdb.org/t/p/w300${
          movies.backdrop_path != null
            ? movies.backdrop_path
            : movies.poster_path
        }`"
        cover
        class="justify-center align-end"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>

        <v-responsive height="100vh" width="100vw" class="d-flex">
          <div
            style="
              width: 100vw;
              height: 100vh;
              position: absolute;
              background: rgb(0, 0, 0, 0.4);
              filter: blur(0px);
            "
          ></div>
        </v-responsive>

        <v-card
          height="180px"
          width="100%"
          elevation="0"
          color="rgb(0, 0, 0,0.4)"
          :class="!useDisplay.xs ? 'mx-auto pl-12' : ''"
          :title="movies.title"
        >
          <v-card-text>
            <p
              v-if="!useDisplay.xs"
              style="
                display: -webkit-box;
                max-width: 50vw;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              "
              class="text-body-2"
            >
              {{ movies.overview }}
            </p>

            <p
              v-else
              style="
                display: -webkit-box;
                max-width: 100vw;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
              "
              class="text-body-2"
            >
              {{ movies.overview }}
            </p>

            <v-btn class="mt-4 mr-2" variant="outlined" prepend-icon="mdi-plus"
              >Minha lista</v-btn
            >
            <v-btn
              class="mt-4"
              variant="outlined"
              prepend-icon="mdi-information"
              @click="eventMoreDetails(movies.id)"
              >Saiba mais</v-btn
            >
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>

    <v-card class="mx-auto" elevation="0">
      <v-row v-if="!useDisplay.xs" no-gutters class="mt-2">
        <v-col>
          <h1 class="ml-10 pt-5 mb-n5">Lançamentos</h1>
        </v-col>
        <v-col cols="5" sm="4" md="3" lg="2" xl="2">
          <v-select
            class="pt-3 mr-7"
            v-model="selectedGenre"
            label="Generos"
            color="primary"
            density="compact"
            :items="genres"
            item-title="name"
            item-value="id"
            return-object
            clearable
            persistent-clear
            hide-details
            single-line
            hide-selected
          ></v-select>
        </v-col>
      </v-row>

      <h1 v-else class="ml-10 pt-5 mb-n5">Lançamentos</h1>

      <v-slide-group
        v-model="modelNowPlaying"
        ref="slideGroupNowPlaying"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        :show-arrows="useDisplay.xs ? false : true"
      >
        <v-slide-group-item
          v-for="(nowPlaying, index) in moviesNowPlaying"
          :key="index"
          v-slot="{ toggle, selectedClass }"
        >
          <v-card
            v-if="!useDisplay.xs"
            color="black/80"
            :class="['ma-4', selectedClass]"
            height="220"
            width="270"
            @click="toggle"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/original${nowPlaying.backdrop_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${nowPlaying.backdrop_path}`"
              height="120px"
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

            <v-card-title>
              {{ nowPlaying.title }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{ formatDate(nowPlaying.release_date) }}
                </div>
              </v-responsive>
            </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon icon="mdi-menu-down" color="grey" />
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>

          <v-card
            v-else
            color="black/80"
            :class="['ma-2', selectedClass]"
            height="220"
            width="150"
            @click="toggle"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/original${nowPlaying.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${nowPlaying.poster_path}`"
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

      <ExpandCardDetails
        :tvOrMovie="'movie'"
        :model="modelNowPlaying"
        :details="moviesDetails"
        @eventWatchProviders="
          eventWatchProviders(moviesDetails.id, moviesDetails.title)
        "
        @eventWatchColection="
          eventWatchColection(moviesDetails.belongs_to_collection.id)
        "
        @eventMoreDetails="eventMoreDetails(moviesDetails.id)"
      />
    </v-card>

    <v-card class="mx-auto" elevation="0">
      <h1 class="ml-10 pt-5 mb-n5">Populares</h1>
      <v-slide-group
        v-model="modelPopular"
        ref="slideGroupPopular"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        :show-arrows="useDisplay.xs ? false : true"
      >
        <v-slide-group-item
          v-for="(popular, index) in moviesPopular"
          :key="index"
          v-slot="{ toggle, selectedClass }"
        >
          <v-card
            v-if="!useDisplay.xs"
            color="black/80"
            :class="['ma-4', selectedClass]"
            height="220"
            width="270"
            @click="toggle"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/original${popular.backdrop_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${popular.backdrop_path}`"
              height="120px"
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

            <v-card-title>
              {{ popular.title }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{ formatDate(popular.release_date) }}
                </div>
              </v-responsive>
            </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon icon="mdi-menu-down" color="grey" />
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>

          <v-card
            v-else
            color="black/80"
            :class="['ma-2', selectedClass]"
            height="220"
            width="150"
            @click="toggle"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/original${popular.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${popular.poster_path}`"
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

      <ExpandCardDetails
        :tvOrMovie="'movie'"
        :model="modelPopular"
        :details="moviesDetails"
        @eventWatchProviders="
          eventWatchProviders(moviesDetails.id, moviesDetails.title)
        "
        @eventWatchColection="
          eventWatchColection(moviesDetails.belongs_to_collection.id)
        "
        @eventMoreDetails="eventMoreDetails(moviesDetails.id)"
      />
    </v-card>

    <v-card class="mx-auto" elevation="0">
      <h1 class="ml-10 pt-5 mb-n5">Mais votados</h1>
      <v-slide-group
        v-model="modelTopRated"
        ref="slideGroupTopRated"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        :show-arrows="useDisplay.xs ? false : true"
      >
        <v-slide-group-item
          v-for="(topRated, index) in moviesTopRated"
          :key="index"
          v-slot="{ toggle, selectedClass }"
        >
          <v-card
            v-if="!useDisplay.xs"
            color="black/80"
            :class="['ma-4', selectedClass]"
            height="220"
            width="270"
            @click="toggle"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/original${topRated.backdrop_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${topRated.backdrop_path}`"
              height="120px"
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

            <v-card-title>
              {{ topRated.title }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{ formatDate(topRated.release_date) }}
                </div>
              </v-responsive>
            </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon icon="mdi-menu-down" color="grey" />
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>

          <v-card
            v-else
            color="black/80"
            :class="['ma-2', selectedClass]"
            height="220"
            width="150"
            @click="toggle"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/original${topRated.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${topRated.backdrop_path}`"
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

      <ExpandCardDetails
        :tvOrMovie="'movie'"
        :model="modelTopRated"
        :details="moviesDetails"
        @eventWatchProviders="
          eventWatchProviders(moviesDetails.id, moviesDetails.title)
        "
        @eventWatchColection="
          eventWatchColection(moviesDetails.belongs_to_collection.id)
        "
        @eventMoreDetails="eventMoreDetails(moviesDetails.id)"
      />
    </v-card>

    <FilterMobile
      v-if="useDisplay.xs"
      ref="FilterMobile"
      :genres="genres"
      @eventChangeGenre="selectedGenre = $event"
    />
  </div>

  <MoviesCollection ref="MoviesCollection" :collectionId="collectionId" />
  <WatchProviders
    ref="WatchProviders"
    :id="movieId"
    :title="movieTitle"
    :tvOrMovie="'movie'"
  />
  <MoreDetails ref="MoreDetails" :id="movieId" :tvOrMovie="'movie'" />
</template>

<script>
import axios from "axios";
import { useLoginStore } from "@/store/LoginStore";
import { useDisplay } from "vuetify";

import MoreDetails from "@/components/MoreDetails.vue";
import WatchProviders from "@/components/WatchProviders.vue";
import MoviesCollection from "@/components/MoviesCollection.vue";
import ExpandCardDetails from "@/components/ExpandCardDetails.vue";
import FilterMobile from "@/components/FilterMobile.vue";

export default {
  components: {
    MoreDetails,
    WatchProviders,
    MoviesCollection,
    ExpandCardDetails,
    FilterMobile,
  },
  data() {
    return {
      useDisplay: useDisplay(),
      loginStore: useLoginStore(),
      modelCarousel: 0,
      moviesUpcoming: [],
      moviesPopular: [],
      modelPopular: undefined,
      moviesTopRated: [],
      modelTopRated: undefined,
      moviesNowPlaying: [],
      modelNowPlaying: undefined,
      moviesDetails: [],
      genres: [],
      selectedGenre: null,
      rating: 3,
      movieId: 0,
      movieTitle: "",
      collectionId: 0,
      isHovering: false,
    };
  },
  created() {
    this.getFilmesLancamentos();
    this.getFilmesPopular();
    this.getFilmesTopRated();
    this.getFilmesNowPlaying();
    this.getGenre();
  },
  watch: {
    modelPopular(val) {
      if (val != undefined) {
        this.modelTopRated = undefined;
        this.modelNowPlaying = undefined;
        this.getDetailsMovies(this.moviesPopular[this.modelPopular].id);
      }
    },
    modelTopRated(val) {
      if (val != undefined) {
        this.modelPopular = undefined;
        this.modelNowPlaying = undefined;
        this.getDetailsMovies(this.moviesTopRated[this.modelTopRated].id);
      }
    },
    modelNowPlaying(val) {
      if (val != undefined) {
        this.modelPopular = undefined;
        this.modelTopRated = undefined;
        this.getDetailsMovies(this.moviesNowPlaying[this.modelNowPlaying].id);
      }
    },
    selectedGenre() {
      this.modelPopular = undefined;
      this.modelTopRated = undefined;
      this.modelNowPlaying = undefined;
      this.$refs.slideGroupPopular.scrollOffset = 0;
      this.$refs.slideGroupTopRated.scrollOffset = 0;
      this.$refs.slideGroupNowPlaying.scrollOffset = 0;
      this.getFilmesPopular();
      this.getFilmesTopRated();
      this.getFilmesNowPlaying();
    },
  },
  methods: {
    getFilmesLancamentos() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("Lancamentos", response);
          this.moviesUpcoming = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFilmesPopular() {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=9f9a623c8918bc56839f26a94b5507aa`;
      url = `${url}&language=pt-BR`;
      url = `${url}&sort_by=popularity.desc`;
      url = `${url}&with_original_language=en`;
      url = `${url}&watch_region=BR`;

      if (this.selectedGenre != null) {
        url = `${url}&with_genres=${this.selectedGenre.id}`;
      }

      axios
        .get(url)
        .then((response) => {
          console.log("Popular", response);
          this.moviesPopular = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFilmesTopRated() {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=9f9a623c8918bc56839f26a94b5507aa`;
      url = `${url}&language=pt-BR`;
      url = `${url}&sort_by=vote_average.desc`;
      url = `${url}&vote_count.gte=200`;
      url = `${url}&watch_region=BR`;

      if (this.selectedGenre != null) {
        url = `${url}&with_genres=${this.selectedGenre.id}`;
      }

      axios
        .get(url)
        .then((response) => {
          console.log("Top rated", response);
          this.moviesTopRated = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFilmesNowPlaying() {
      var data = new Date();
      var ano = data.getFullYear();
      var mes = ("0" + (data.getMonth() + 1)).slice(-2);
      var dia = ("0" + data.getDate()).slice(-2);
      var dataFormatada = ano + "-" + mes + "-" + dia;

      var duasSemanasEmMilissegundos = 30 * 24 * 60 * 60 * 1000;
      var dataSubtraida = new Date(data - duasSemanasEmMilissegundos);
      var ano2 = dataSubtraida.getFullYear();
      var mes2 = ("0" + (dataSubtraida.getMonth() + 1)).slice(-2);
      var dia2 = ("0" + dataSubtraida.getDate()).slice(-2);
      var dataFormatada2 = ano2 + "-" + mes2 + "-" + dia2;

      let url = `https://api.themoviedb.org/3/discover/movie?api_key=9f9a623c8918bc56839f26a94b5507aa`;
      url = `${url}&language=pt-BR`;
      url = `${url}&sort_by=popularity.desc`;
      url = `${url}&primary_release_date.gte=${dataFormatada2}&primary_release_date.lte=${dataFormatada}`;
      url = `${url}&year=2023`;
      url = `${url}&watch_region=BR`;

      // url = `${url}&with_release_type=3|2`;

      if (this.selectedGenre != null) {
        url = `${url}&with_genres=${this.selectedGenre.id}`;
      }

      axios
        .get(url)
        .then((response) => {
          console.log("Now playing", response);
          this.moviesNowPlaying = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGenre() {
      axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR`
        )
        .then((response) => {
          console.log("genre", response);
          this.genres = response.data.genres;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetailsMovies(id) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&append_to_response=reviews`
        )
        .then((response) => {
          console.log("Detalhes", response);
          this.moviesDetails = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eventWatchColection(collectionId) {
      this.collectionId = collectionId;
      setTimeout(() => {
        this.$refs.MoviesCollection.dialog = true;
      }, 100);
    },
    eventWatchProviders(id, title) {
      this.movieId = id;
      this.movieTitle = title;
      setTimeout(() => {
        this.$refs.WatchProviders.dialog = true;
      }, 100);
    },
    eventMoreDetails(id) {
      this.movieId = id;
      setTimeout(() => {
        this.$refs.MoreDetails.dialog = true;
      }, 100);
    },
    formatRuntime(runtime) {
      if (runtime != undefined) {
        const horas = Math.floor(runtime / 60);
        const min = runtime % 60;
        const textoHoras = `00${horas}`.slice(-2);
        const textoMinutos = `00${min}`.slice(-2);

        return `${textoHoras}:${textoMinutos}`;
      }
    },
    formatDate(dateString) {
      const date = dateString != undefined ? new Date(dateString) : "";
      return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
        date
      );
    },
  },
  computed: {
    formattedDate() {
      return this.formatDate(this.date);
    },
  },
};
</script>

<style scoped>
</style>
