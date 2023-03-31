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
        cover
        class="justify-center align-end"
      >
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
          class="mx-auto pl-12"
          :title="movies.title"
        >
          <v-card-text>
            <p
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
      <h1 class="ml-10 pt-5 mb-n5">Em cartaz</h1>
      <v-slide-group
        v-model="modelNowPlaying"
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
            color="black/80"
            :class="['ma-4', selectedClass]"
            height="220"
            width="270"
            @click="toggle"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/w300${nowPlaying.backdrop_path}`"
              height="120px"
              cover
            ></v-img>

            <v-card-title>
              {{ nowPlaying.title }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{ nowPlaying.overview }}
                </div>
              </v-responsive>
            </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon icon="mdi-menu-down" color="grey" />
              <v-spacer></v-spacer>
            </v-card-actions>
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
            color="black/80"
            :class="['ma-4', selectedClass]"
            height="220"
            width="270"
            @click="toggle"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/w300${popular.backdrop_path}`"
              height="120px"
              cover
            ></v-img>

            <v-card-title>
              {{ popular.title }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{ popular.overview }}
                </div>
              </v-responsive>
            </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon icon="mdi-menu-down" color="grey" />
              <v-spacer></v-spacer>
            </v-card-actions>
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
            color="black/80"
            :class="['ma-4', selectedClass]"
            height="220"
            width="270"
            @click="toggle"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/w300${topRated.backdrop_path}`"
              height="120px"
              cover
            ></v-img>

            <v-card-title>
              {{ topRated.title }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{ topRated.overview }}
                </div>
              </v-responsive>
            </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon icon="mdi-menu-down" color="grey" />
              <v-spacer></v-spacer>
            </v-card-actions>
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

export default {
  components: {
    MoreDetails,
    WatchProviders,
    MoviesCollection,
    ExpandCardDetails,
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
      axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("Popular", response);
          this.moviesPopular = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFilmesTopRated() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("Top rated", response);
          this.moviesTopRated = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFilmesNowPlaying() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("Top rated", response);
          this.moviesNowPlaying = response.data.results;
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