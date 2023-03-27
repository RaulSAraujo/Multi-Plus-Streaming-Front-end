<template>
  <div>
    <v-carousel
      v-model="modelCarousel"
      cycle
      :height="isHovering ? '600' : '300'"
      hide-delimiter-background
      hide-delimiters
      show-arrows="hover"
      :interval="isHovering ? 50000 : 6000"
      @click="isHovering = true"
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
          :height="isHovering ? '230px' : '180px'"
          width="100%"
          elevation="0"
          color="rgb(0, 0, 0,0.4)"
          class="mx-auto"
          :title="movies.title"
        >
          <v-card-text>
            <p v-if="isHovering" class="text-body-2">
              {{ movies.overview }}
            </p>
            <p
              v-else
              style="
                display: -webkit-box;
                max-width: 100vw;
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

    <v-card class="mx-auto" elevation="8">
      <h1 class="ml-10 pt-5 mb-n5">Series populares</h1>
      <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        show-arrows
      >
        <v-slide-group-item
          v-for="(nowPlay, index) in seriesPopular"
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
              :src="`https://image.tmdb.org/t/p/w300${nowPlay.backdrop_path}`"
              height="120px"
              cover
            ></v-img>

            <v-card-title>
              {{ nowPlay.name }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{ nowPlay.overview }}
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

      <v-expand-transition>
        <v-sheet v-if="model != null" class="px-10 pb-5">
          <v-card variant="outlined" rounded="xl">
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="3" lg="3" xl="2">
                <v-img
                  :src="`https://image.tmdb.org/t/p/w300${seriesDetails.poster_path}`"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)"
                  cover
                >
                  <v-list-item
                    class="mb-3 text-white"
                    title="Assista agora"
                    subtitle="Stream, Alugar, Comprar"
                    @click="
                      eventWatchProviders(
                        this.seriesPopular[this.model].id,
                        this.seriesPopular[this.model].name
                      )
                    "
                  >
                    <template v-slot:prepend>
                      <v-icon icon="mdi-play-circle" size="40"></v-icon>
                    </template>
                  </v-list-item>
                </v-img>
              </v-col>
              <v-col cols="12" sm="12" md="9" lg="9" xl="10">
                <v-card class="pa-4" height="100%" elevation="0">
                  <v-card-title class="text-h4">
                    <v-row no-gutters justify="space-between" align="center">
                      <v-col cols="10" sm="10" md="11" lg="11">
                        <span
                          class="text-h6 text-sm-subtitle-1 text-md-h4 text-lg-h3 text-xl-h3"
                          >{{ seriesDetails.name }}</span
                        >
                      </v-col>
                      <v-col cols="2" sm="1" md="1" lg="1">
                        <v-avatar
                          color="green"
                          variant="outlined"
                          class="d-none d-md-flex text-body-1"
                        >
                          {{ seriesPopular[model].vote_average }}
                        </v-avatar>

                        <v-avatar
                          color="green"
                          variant="outlined"
                          size="small"
                          class="d-flex d-md-none text-subtitle-2"
                        >
                          {{ seriesPopular[model].vote_average }}
                        </v-avatar>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-subtitle class="mt-n2">
                    <v-row no-gutters>
                      <v-icon icon="mdi-calendar-month" flat></v-icon>

                      <span>
                        {{ formatDate(seriesDetails.release_date) }}
                      </span>

                      <v-icon
                        icon="mdi-ticket-confirmation-outline"
                        class="ml-1"
                        flat
                      ></v-icon>

                      <v-breadcrumbs
                        density="compact"
                        divider=","
                        class="py-0 px-0"
                      >
                        <v-breadcrumbs-item
                          v-for="(genres, index) in seriesDetails.genres"
                          :key="index"
                          class="px-0"
                        >
                          <span>{{ genres.name }}</span>
                          <span
                            v-if="seriesDetails.genres.length - 1 > index"
                          ></span>
                        </v-breadcrumbs-item>
                      </v-breadcrumbs>

                      <v-icon icon="mdi-timer-sand" class="ml-1" flat></v-icon>

                      <span>{{ seriesDetails.in_production }}</span>
                    </v-row>
                  </v-card-subtitle>

                  <v-card-text>
                    <p
                      style="
                        display: -webkit-box;
                        max-width: 100vw;
                        -webkit-line-clamp: 4;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                      "
                      class="text-body-2"
                    >
                      {{ seriesDetails.overview }}
                    </p>

                    <v-card
                      :height="
                        useDisplay.smAndDown
                          ? '20vw'
                          : useDisplay.md
                          ? '8vw'
                          : useDisplay.lg
                          ? '15vw'
                          : useDisplay.xl
                          ? '11vw'
                          : '10vw'
                      "
                      class="mt-2 mx-n5"
                      rounded="lg"
                      elevation="0"
                    >
                    </v-card>
                  </v-card-text>

                  <v-card-actions>
                    <v-row justify="space-between" align="center">
                      <v-col cols="12" sm="7" md="6" lg="5" xl="4">
                        <v-btn
                          class="mt-4 mr-2"
                          variant="outlined"
                          prepend-icon="mdi-plus"
                          >Minha lista</v-btn
                        >
                        <v-btn
                          class="mt-4"
                          variant="outlined"
                          prepend-icon="mdi-information"
                          @click="
                            eventMoreDetails(this.seriesPopular[this.model].id)
                          "
                          >Saiba mais</v-btn
                        >
                      </v-col>
                      <v-col cols="12" sm="4" md="4" lg="4" xl="2">
                        <v-row align="center" no-gutters>
                          <span class="mr-2">Avalie:</span>
                          <span class="text-grey-lighten-2 text-caption mr-2">
                            ({{ rating }})
                          </span>
                          <v-rating
                            v-model="rating"
                            color="white"
                            active-color="yellow-accent-4"
                            half-increments
                            hover
                            density="compact"
                          ></v-rating>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-sheet>
      </v-expand-transition>
    </v-card>
  </div>

  <MoviesProviders
    ref="MoviesProviders"
    :id="movieId"
    :title="movieTitle"
    :tvOrMovie="'tv'"
  />
  <MoreDetails ref="MoreDetails" :id="movieId" :tvOrMovie="'tv'" />
</template>

<script>
import axios from "axios";
import { useLoginStore } from "@/store/LoginStore";
import { useDisplay } from "vuetify";

import MoreDetails from "@/components/MoreDetails.vue";
import MoviesProviders from "@/components/MoviesProviders.vue";

export default {
  components: {
    MoreDetails,
    MoviesProviders,
  },
  data() {
    return {
      useDisplay: useDisplay(),
      loginStore: useLoginStore(),
      modelCarousel: 0,
      model: undefined,
      moviesUpcoming: [],
      seriesPopular: [],
      seriesDetails: [],
      movieReview: [],
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
  },
  watch: {
    model(val) {
      if (val != undefined) {
        this.getDetailsMovies();
      }
    },
  },
  methods: {
    getFilmesLancamentos() {
      axios
        .get(
          "https://api.themoviedb.org/3/tv/on_the_air?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
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
          "https://api.themoviedb.org/3/tv/popular?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("Popular", response);
          this.seriesPopular = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetailsMovies() {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${
            this.seriesPopular[this.model].id
          }?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&append_to_response=reviews`
        )
        .then((response) => {
          console.log("Detalhes", response);
          this.seriesDetails = response.data;
          this.movieReview = response.data.reviews.results[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eventWatchProviders(id, title) {
      this.movieId = id;
      this.movieTitle = title;
      setTimeout(() => {
        this.$refs.MoviesProviders.dialog = true;
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