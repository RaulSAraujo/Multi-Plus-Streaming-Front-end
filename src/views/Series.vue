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
        v-for="(movies, index) in seriesOnTheAir"
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
          :title="movies.name"
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

    <v-card class="mx-auto">
      <h1 class="ml-10 pt-5 mb-n5">Populares</h1>
      <v-slide-group
        v-model="modelPopular"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        show-arrows
      >
        <v-slide-group-item
          v-for="(popular, index) in seriesPopular"
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
              {{ popular.name }}
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
        :tvOrMovie="'tv'"
        :model="modelPopular"
        :details="seriesDetails"
        @eventWatchProviders="
          eventWatchProviders(seriesDetails.id, seriesDetails.name)
        "
        @eventMoreDetails="eventMoreDetails(seriesDetails.id)"
      />
    </v-card>

    <v-card class="mx-auto">
      <h1 class="ml-10 pt-5 mb-n5">Mais votados</h1>
      <v-slide-group
        v-model="modelTopRated"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        show-arrows
      >
        <v-slide-group-item
          v-for="(topRated, index) in seriesTopRated"
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
              {{ topRated.name }}
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
        :tvOrMovie="'tv'"
        :model="modelTopRated"
        :details="seriesDetails"
        @eventWatchProviders="
          eventWatchProviders(seriesDetails.id, seriesDetails.name)
        "
        @eventMoreDetails="eventMoreDetails(seriesDetails.id)"
      />
    </v-card>

    <v-card class="mx-auto">
      <h1 class="ml-10 pt-5 mb-n5">No ar</h1>
      <v-slide-group
        v-model="modelAiringToday"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        show-arrows
      >
        <v-slide-group-item
          v-for="(airingToday, index) in seriesAiringToday"
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
              :src="`https://image.tmdb.org/t/p/w300${airingToday.backdrop_path}`"
              height="120px"
              cover
            ></v-img>

            <v-card-title>
              {{ airingToday.name }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{ airingToday.overview }}
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
        :tvOrMovie="'tv'"
        :model="modelAiringToday"
        :details="seriesDetails"
        @eventWatchProviders="
          eventWatchProviders(seriesDetails.id, seriesDetails.name)
        "
        @eventMoreDetails="eventMoreDetails(seriesDetails.id)"
      />
    </v-card>
  </div>

  <WatchProviders
    ref="WatchProviders"
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
import WatchProviders from "@/components/WatchProviders.vue";
import ExpandCardDetails from "@/components/ExpandCardDetails.vue";

export default {
  components: {
    MoreDetails,
    WatchProviders,
    ExpandCardDetails,
  },
  data() {
    return {
      useDisplay: useDisplay(),
      loginStore: useLoginStore(),
      modelCarousel: 0,
      seriesOnTheAir: [],
      seriesPopular: [],
      modelPopular: undefined,
      seriesTopRated: [],
      modelTopRated: undefined,
      seriesAiringToday: [],
      modelAiringToday: undefined,
      seriesDetails: [],
      rating: 3,
      movieId: 0,
      movieTitle: "",
      collectionId: 0,
      isHovering: false,
    };
  },
  created() {
    this.getSeriesOnTheAir();
    this.getSeriesPopular();
    this.getSeriesTopRated();
    this.getSeriesAiringToday();
  },
  watch: {
    modelPopular(val) {
      if (val != undefined) {
        this.modelTopRated = undefined;
        this.modelAiringToday = undefined;
        this.getDetailsSeries(this.seriesPopular[this.modelPopular].id);
      }
    },
    modelTopRated(val) {
      if (val != undefined) {
        this.modelPopular = undefined;
        this.modelAiringToday = undefined;
        this.getDetailsSeries(this.seriesTopRated[this.modelTopRated].id);
      }
    },
    modelAiringToday(val) {
      if (val != undefined) {
        this.modelPopular = undefined;
        this.modelTopRated = undefined;
        this.getDetailsSeries(this.seriesAiringToday[this.modelAiringToday].id);
      }
    },
  },
  methods: {
    getSeriesOnTheAir() {
      axios
        .get(
          "https://api.themoviedb.org/3/tv/on_the_air?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("No ar", response);
          this.seriesOnTheAir = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSeriesPopular() {
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
    getSeriesTopRated() {
      axios
        .get(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("topRated", response);
          this.seriesTopRated = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSeriesAiringToday() {
      axios
        .get(
          "https://api.themoviedb.org/3/tv/airing_today?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("AiringToday", response);
          this.seriesAiringToday = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetailsSeries(id) {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&append_to_response=reviews`
        )
        .then((response) => {
          console.log("Detalhes", response);
          this.seriesDetails = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
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
    formatDateMin(dateString) {
      const date = dateString != undefined ? new Date(dateString) : "";
      return new Intl.DateTimeFormat("pt-Br").format(date);
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