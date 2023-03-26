<template>
  <v-dialog
    v-model="dialog"
    width="90vw"
    height="90vh"
    scrim="black"
    scrollable
  >
    <v-row v-if="loading" justify="center" align="center">
      <v-sheet width="200" height="200" rounded="xl" border="sm" elevation="6">
        <v-row class="mt-7" align="center" justify="center" no-gutters>
          <v-progress-circular
            size="100"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
        <v-row class="mt-5" align="center" justify="center" no-gutters>
          <span>Carregando...</span>
        </v-row>
      </v-sheet>
    </v-row>

    <v-sheet v-else rounded="xl" elevation="0">
      <v-img
        class="mb-5"
        :src="`https://image.tmdb.org/t/p/original${movieBackdropPath}`"
        height="320px"
        cover
      >
        <v-card
          class="pa-4"
          height="100%"
          elevation="0"
          color="rgb(0, 0, 0, 0.8)"
        >
          <v-card-title class="text-h4">
            <v-row no-gutters justify="space-between" align="center">
              <v-col cols="10" sm="10" md="11" lg="11">
                <span
                  class="text-h6 text-sm-subtitle-1 text-md-h4 text-lg-h3 text-xl-h3"
                  >{{ movieNameTitle }}</span
                >
              </v-col>
              <v-col cols="2" sm="1" md="1" lg="1">
                <v-avatar
                  color="green"
                  variant="outlined"
                  class="d-none d-md-flex text-body-1"
                >
                  {{ movieVoteAverage }}
                </v-avatar>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle class="mt-n1 text-white">
            <v-row no-gutters>
              <v-icon icon="mdi-calendar-month" flat></v-icon>

              <span>
                {{ movieReleaseDate != "" ? formatDate(movieReleaseDate) : "" }}
              </span>

              <v-icon
                icon="mdi-ticket-confirmation-outline"
                class="ml-1"
                flat
              ></v-icon>

              <v-breadcrumbs density="compact" divider="," class="py-0 px-0">
                <v-breadcrumbs-item
                  v-for="(genres, index) in movieGenres"
                  :key="index"
                  class="px-0"
                >
                  <span>{{ genres.name }}</span>
                  <span v-if="movieGenres.length - 1 > index">,</span>
                </v-breadcrumbs-item>
              </v-breadcrumbs>

              <v-icon icon="mdi-timer-sand" class="ml-1" flat></v-icon>

              <span>{{ formatRuntime(movieRuntime) }}m</span>
            </v-row>
          </v-card-subtitle>

          <v-card-text>
            <v-responsive height="10vh">
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
                {{ movieOverview }}
              </p>
            </v-responsive>
          </v-card-text>

          <v-card-actions>
            <v-btn
              class="mt-4 mr-2"
              variant="plain"
              prepend-icon="mdi-play-circle"
              @click="eventWatchProviders()"
              >Assista agora</v-btn
            >
            <v-btn class="mt-4 mr-2" variant="plain" prepend-icon="mdi-plus"
              >Minha lista</v-btn
            >

            <v-row align="center" justify="end" no-gutters>
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
          </v-card-actions>
        </v-card>
      </v-img>

      <span class="ml-12 text-h5">Midia</span>
      <v-card elevation="0">
        <v-tabs v-model="tab" class="mx-9">
          <v-tab value="Imagens">Imagens</v-tab>
          <v-tab value="Videos">Videos</v-tab>
          <v-tab value="Pôsteres">Pôsteres</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="Imagens">
              <v-sheet elevation="0" max-width="100%">
                <v-slide-group
                  v-model="modelBackDrops"
                  selected-class="bg-success"
                  show-arrows
                >
                  <v-slide-group-item
                    v-for="backdrops in moviesBackDrops"
                    :key="backdrops"
                  >
                    <v-card
                      color="grey-lighten-3"
                      class="ma-4"
                      height="250"
                      width="400"
                    >
                      <v-img
                        :src="`https://image.tmdb.org/t/p/w500${backdrops.file_path}`"
                        height="100%"
                        cover
                      ></v-img>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </v-window-item>
            <v-window-item value="Videos">
              <v-sheet elevation="0" max-width="100%">
                <v-slide-group
                  v-model="modelVideos"
                  selected-class="bg-success"
                  show-arrows
                >
                  <v-slide-group-item
                    v-for="video in moviesVideos"
                    :key="video"
                  >
                    <v-card
                      color="grey-lighten-3"
                      class="ma-4"
                      width="450"
                      height="250"
                    >
                      <iframe
                        width="450"
                        height="250"
                        :src="`https://www.youtube-nocookie.com/embed/${video.key}`"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                      ></iframe>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </v-window-item>
            <v-window-item value="Pôsteres">
              <v-sheet elevation="0" max-width="100%">
                <v-slide-group
                  v-model="modelPostes"
                  selected-class="bg-success"
                  show-arrows
                >
                  <v-slide-group-item
                    v-for="postes in moviesPostes"
                    :key="postes"
                  >
                    <v-card
                      color="grey-lighten-3"
                      class="ma-4"
                      height="250"
                      width="150"
                    >
                      <v-img
                        :src="`https://image.tmdb.org/t/p/w300${postes.file_path}`"
                        height="100%"
                        cover
                      ></v-img>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>

      <span class="ml-12 text-h5">Elenco principal</span>
      <v-sheet class="mx-auto" elevation="0" max-width="100%">
        <v-slide-group
          v-model="modelMainCast"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="cast in movieMainCast"
            :key="cast"
            v-slot="{ toggle, selectedClass }"
          >
            <v-card
              color="grey-lighten-3"
              :class="['ma-4', selectedClass]"
              height="200"
              width="170"
              @click="toggle"
            >
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${cast.profile_path}`"
                height="130px"
                cover
              ></v-img>
              <v-card-title>{{ cast.name }}</v-card-title>
              <v-card-subtitle class="mt-n3">{{
                cast.character
              }}</v-card-subtitle>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>

      <span class="ml-12 mt-5 text-h5">Reviews</span>
      <v-sheet elevation="0" max-width="100% ">
        <v-slide-group
          v-model="modelReviews"
          v-if="movieReviews.length > 0"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item v-for="review in movieReviews" :key="review">
            <v-card
              elevation="12"
              width="1150"
              border="sm"
              rounded="xl"
              class="ma-5"
            >
              <v-card-title class="text-white">
                <v-row v-if="review" no-gutters>
                  <p class="text-h6">Resenha de {{ review.author }}</p>
                </v-row>
              </v-card-title>

              <v-card-text>
                <p class="text-body-2">
                  {{ review.content }}
                </p>
              </v-card-text>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
        <v-card v-else elevation="0" class="ml-8">
          <v-card-title class="text-body-1"
            >Infelizmente este filme não possui resenhas.</v-card-title
          >
        </v-card>
      </v-sheet>

      <v-card v-if="movieBelongsCollection" class="my-5">
        <v-img
          :src="`https://image.tmdb.org/t/p/original${movieBelongsCollection.backdrop_path}`"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          :height="
            useDisplay.smAndDown
              ? '50vw'
              : useDisplay.md
              ? '8vw'
              : useDisplay.lg
              ? '15vw'
              : useDisplay.xl
              ? '11vw'
              : '10vw'
          "
          cover
        >
          <v-card-title class="text-white">
            <v-row no-gutters>
              <span class="text-h5">{{ movieBelongsCollection.name }}</span>

              <v-spacer></v-spacer>
              <v-btn
                rounded="xl"
                variant="outlined"
                flat
                @click="eventWatchColection(movieBelongsCollection.id)"
                >MOSTRAR A COLETÂNEA</v-btn
              >
            </v-row>
          </v-card-title>
        </v-img>
      </v-card>

      <span class="ml-12 text-h5">Recomendações</span>
      <v-sheet elevation="0" max-width="100%">
        <v-slide-group
          v-if="moviesRecommendations.length > 0"
          v-model="modelRecommendations"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="recommendation in moviesRecommendations"
            :key="recommendation"
          >
            <v-card
              color="grey-lighten-3"
              class="ma-4"
              height="190"
              width="270"
            >
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${recommendation.backdrop_path}`"
                height="120px"
                cover
              ></v-img>

              <v-card-title>
                {{ recommendation.title }}
              </v-card-title>

              <v-card-subtitle class="mt-n3">
                <v-responsive height="20px" width="100%">
                  <div class="text-truncate">
                    {{ recommendation.overview }}
                  </div>
                </v-responsive>
              </v-card-subtitle>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
        <v-card v-else elevation="0" class="ml-8">
          <v-card-title class="text-body-1"
            >Não possuimos recomendações no momento</v-card-title
          >
        </v-card>
      </v-sheet>
    </v-sheet>

    <MoviesProviders ref="MoviesProviders" :id="id" :title="movieNameTitle" />
    <MoviesCollection ref="MoviesCollection" :collectionId="collectionId" />
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useDisplay } from "vuetify";
import MoviesProviders from "@/components/MoviesProviders.vue";
import MoviesCollection from "@/components/MoviesCollection.vue";

export default {
  props: {
    id: Number,
  },
  components: {
    MoviesProviders,
    MoviesCollection,
  },
  data() {
    return {
      dialog: false,
      useDisplay: useDisplay(),
      loading: false,
      rating: 3,
      modelRecommendations: undefined,
      modelReviews: undefined,
      modelVideos: undefined,
      modelPostes: undefined,
      modelBackDrops: undefined,
      modelMainCast: undefined,
      movieNameTitle: "",
      movieVoteAverage: "",
      movieBackdropPath: "",
      movieGenres: [],
      movieReleaseDate: "",
      movieRuntime: 0,
      movieOverview: "",
      movieBelongsCollection: [],
      movieMainCast: [],
      movieTechnicalTeam: [],
      movieReviews: [],
      moviesRecommendations: [],
      tab: null,
      moviesBackDrops: [],
      moviesLogos: [],
      moviesPostes: [],
      moviesVideos: [],
      collectionId: 0,
    };
  },
  watch: {
    dialog(val) {
      if (val == true) {
        this.getMoreDetails();
      }
    },
  },
  methods: {
    getMoreDetails() {
      this.loading = true;
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.id}?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&append_to_response=images,videos,similar,recommendations,reviews,credits&include_image_language=en,null&include_video_language=pt-BR`
        )
        .then((response) => {
          console.log("MoreDetails", response);
          this.movieNameTitle = response.data.title;
          this.movieVoteAverage = response.data.vote_average.toFixed(1);
          this.movieBackdropPath = response.data.backdrop_path;
          this.movieGenres = response.data.genres;
          this.movieReleaseDate = response.data.release_date;
          this.movieRuntime = response.data.runtime;
          this.movieOverview = response.data.overview;
          this.movieBelongsCollection = response.data.belongs_to_collection;
          this.movieMainCast = response.data.credits.cast;
          this.movieTechnicalTeam = response.data.credits.crew;
          this.movieReviews = response.data.reviews.results;
          this.moviesRecommendations = response.data.recommendations.results;
          this.moviesBackDrops = response.data.images.backdrops;
          this.moviesLogos = response.data.images.logos;
          this.moviesPostes = response.data.images.posters;
          this.moviesVideos = response.data.videos.results;
          this.loading = false;
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
    eventWatchProviders() {
      this.$refs.MoviesProviders.dialog = true;
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
};
</script>

<style>
</style>