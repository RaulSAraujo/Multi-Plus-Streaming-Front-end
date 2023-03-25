<template>
  <div>
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-carousel
          v-model="modelCarousel"
          v-bind="props"
          cycle
          :height="isHovering ? '600' : '300'"
          hide-delimiter-background
          hide-delimiters
          show-arrows="hover"
          :interval="isHovering ? 50000 : 6000"
        >
          <v-carousel-item
            v-for="(movies, index) in moviesUpcoming"
            :key="index"
            :src="`https://image.tmdb.org/t/p/original${movies.backdrop_path}`"
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
                  >Saiba mais</v-btn
                >
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </template>
    </v-hover>

    <v-sheet class="mx-auto" elevation="8">
      <h1 class="ml-10 pt-5 mb-n5">Filmes mais votado</h1>
      <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-pink"
        center-active
        show-arrows
      >
        <v-slide-group-item
          v-for="(nowPlay, index) in moviesTopRated"
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
              {{ nowPlay.title }}
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

      <v-expand-transition style="transition-delay: 1s">
        <v-sheet v-if="model != null" class="px-10 pb-5">
          <v-card variant="outlined" rounded="xl">
            <v-row no-gutters>
              <v-col cols="12" sm="7" md="4" lg="3" xl="2">
                <v-img
                  :src="`https://image.tmdb.org/t/p/w300${moviesDetails.poster_path}`"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)"
                  cover
                >
                  <v-list-item
                    class="mb-3 text-white"
                    title="Assista agora"
                    subtitle="Stream, Alugar, Comprar"
                    @click="getWatchProviders()"
                  >
                    <template v-slot:prepend>
                      <v-icon icon="mdi-play-circle" size="40"></v-icon>
                    </template>
                  </v-list-item>
                </v-img>
              </v-col>
              <v-col cols="12" sm="5" md="8" lg="9" xl="10" class="px-2">
                <v-responsive height="20"></v-responsive>
                <v-card class="mt-4" height="100%">
                  <v-card-title class="text-h4">
                    <v-row no-gutters justify="space-between" align="center">
                      <v-col cols="10" sm="10" md="11" lg="11">
                        <span
                          class="text-sm-subtitle-1 text-md-h4 text-lg-h3 text-xl-h3"
                          >{{ moviesDetails.title }}</span
                        >
                      </v-col>
                      <v-col cols="2" sm="1" md="1" lg="1">
                        <v-avatar
                          color="green"
                          variant="outlined"
                          class="d-none d-md-flex text-body-1"
                        >
                          {{ moviesTopRated[model].vote_average }}
                        </v-avatar>

                        <v-avatar
                          color="green"
                          variant="outlined"
                          size="small"
                          class="d-flex d-md-none text-subtitle-2"
                        >
                          {{ moviesTopRated[model].vote_average }}
                        </v-avatar>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-subtitle class="mt-n3">
                    <v-row no-gutters>
                      <span>
                        Lançamento:
                        {{ formatDate(moviesDetails.release_date) }} *
                      </span>

                      <v-breadcrumbs
                        density="compact"
                        divider=","
                        class="py-0 px-1"
                      >
                        <v-breadcrumbs-item
                          v-for="(genres, index) in moviesDetails.genres"
                          :key="index"
                          class="px-0"
                        >
                          <span>{{ genres.name }}</span>
                          <span v-if="moviesDetails.genres.length - 1 > index"
                            >,</span
                          >
                        </v-breadcrumbs-item>
                      </v-breadcrumbs>

                      <span>* {{ formatRuntime(moviesDetails.runtime) }}m</span>
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
                      {{ moviesDetails.overview }}
                    </p>

                    <!-- <v-row no-gutters>
                        <v-col
                          v-for="buy in movieProviders.buy"
                          :key="buy"
                          cols="1"
                        >
                          <v-card>
                            <v-img
                              :src="`https://image.tmdb.org/t/p/w200${buy.logo_path}`"
                              width="55px"
                              aspect-ratio="0.9"
                              class="bg-grey-lighten-2 rounded-xl"
                              cover
                            ></v-img>
                            <v-card-title class="text-body-2">{{
                              buy.provider_name
                            }}</v-card-title>
                          </v-card>
                        </v-col>
                      </v-row> -->
                  </v-card-text>

                  <v-card-actions>
                    <v-row justify="space-between" align="center">
                      <v-col cols="12" sm="12" md="5" lg="3">
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
                          >Saiba mais</v-btn
                        >
                      </v-col>
                      <v-col cols="12" sm="12" md="4" lg="3">
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
    </v-sheet>
  </div>

  <v-dialog v-model="dialog" width="70vw" scrim="black">
    <v-card width="100%" rounded="xl" append-icon="">
      <template v-slot:title>
        <span class="text-h5">{{ moviesDetails.title }} </span>
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

      <v-card-text class="pa-5">
        <span class="text-h5">Stream</span>
        <v-row justify="start" no-gutters class="my-3">
          <v-col
            v-for="providers in movieProvider.flatrate"
            :key="providers"
            class="my-1"
            cols="3"
            sm="3"
            md="2"
            lg="1"
          >
            <v-avatar rounded="lg" size="65">
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${providers.logo_path}`"
                :alt="providers.provider_name"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>

        <span class="text-h5">Alugar</span>
        <v-row justify="start" no-gutters class="my-4">
          <v-col
            v-for="providers in movieProvider.rent"
            :key="providers"
            class="my-1"
            cols="3"
            sm="3"
            md="2"
            lg="1"
          >
            <v-avatar rounded="lg" size="65">
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${providers.logo_path}`"
                :alt="providers.provider_name"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>

        <span class="text-h5">Comprar</span>
        <v-row justify="start" no-gutters class="my-4">
          <v-col
            v-for="providers in movieProvider.buy"
            :key="providers"
            class="my-1"
            cols="3"
            sm="3"
            md="2"
            lg="1"
          >
            <v-avatar rounded="lg" size="65">
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${providers.logo_path}`"
                :alt="providers.provider_name"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useLoginStore } from "@/store/LoginStore";

export default {
  data() {
    return {
      loginStore: useLoginStore(),
      modelCarousel: 0,
      model: undefined,
      moviesUpcoming: [],
      moviesTopRated: [],
      moviesDetails: [],
      movieProviders: [],
      rating: 3,
      dialog: false,
    };
  },
  created() {
    this.getFilmesLancamentos();
    this.getFilmesMaisvotados();
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
    getFilmesMaisvotados() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("Mais votado", response);
          this.moviesTopRated = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetailsMovies() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${
            this.moviesTopRated[this.model].id
          }?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR`
        )
        .then((response) => {
          console.log("Detalhes", response);
          this.moviesDetails = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getWatchProviders() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${
            this.moviesTopRated[this.model].id
          }/watch/providers?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR`
        )
        .then((response) => {
          this.movieProvider = response.data.results.BR;
          this.dialog = true;
          console.log("Providers", response);
        })
        .catch((error) => {
          console.log(error);
        });
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

<style lang="scss" scoped>
</style>