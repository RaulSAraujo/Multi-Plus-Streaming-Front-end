<template>
  <div>
    <v-carousel
      v-model="modelCarousel"
      cycle
      height="420"
      hide-delimiter-background
      hide-delimiters
      show-arrows="hover"
      :interval="isHovering ? 50000 : 10000"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <v-carousel-item
        v-for="(series, index) in seriesOnTheAir"
        :key="index"
        :src="`https://image.tmdb.org/t/p/original${
          series.backdrop_path != null
            ? series.backdrop_path
            : series.poster_path
        }`"
        :lazy-src="`https://image.tmdb.org/t/p/w300${
          series.backdrop_path != null
            ? series.backdrop_path
            : series.poster_path
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
          :title="series.name"
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
              {{ series.overview }}
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
              {{ series.overview }}
            </p>

            <v-btn class="mt-4 mr-2" variant="outlined" prepend-icon="mdi-plus"
              >Minha lista</v-btn
            >
            <v-btn
              class="mt-4"
              variant="outlined"
              prepend-icon="mdi-information"
              @click="eventMoreDetails(series.id)"
              >Saiba mais</v-btn
            >
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>

    <v-card class="mx-auto">
      <v-row v-if="!useDisplay.xs" no-gutters class="mt-2">
        <v-col>
          <h1 class="ml-10 pt-5 mb-n5">Populares</h1>
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
            hide-details
            single-line
            hide-selected
          ></v-select>
        </v-col>
      </v-row>

      <h1 v-else class="ml-10 pt-5 mb-n5">Populares</h1>

      <v-slide-group
        v-model="modelPopular"
        ref="slideGroupPopular"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        :show-arrows="useDisplay.xs ? false : true"
      >
        <v-slide-group-item
          v-for="(popular, index) in seriesPopular"
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
                </div>
              </template>
            </v-img>

            <v-card-title>
              {{ popular.name }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{
                    popular.first_air_date
                      ? formatDate(popular.first_air_date)
                      : ""
                  }}
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
        :tvOrMovie="'tv'"
        :model="modelPopular"
        :details="seriesDetails"
        @eventWatchProviders="
          eventWatchProviders(seriesDetails.id, seriesDetails.name)
        "
        @episodios="eventEpisodios(seriesDetails.id, seriesDetails.seasons)"
        @eventMoreDetails="eventMoreDetails(seriesDetails.id)"
      />
    </v-card>

    <v-card class="mx-auto">
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
          v-for="(topRated, index) in seriesTopRated"
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
                </div>
              </template>
            </v-img>

            <v-card-title>
              {{ topRated.name }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{
                    topRated.first_air_date
                      ? formatDate(topRated.first_air_date)
                      : ""
                  }}
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
              :lazy-src="`https://image.tmdb.org/t/p/w300${topRated.poster_path}`"
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
        :tvOrMovie="'tv'"
        :model="modelTopRated"
        :details="seriesDetails"
        @eventWatchProviders="
          eventWatchProviders(seriesDetails.id, seriesDetails.name)
        "
        @episodios="eventEpisodios(seriesDetails.id, seriesDetails.seasons)"
        @eventMoreDetails="eventMoreDetails(seriesDetails.id)"
      />
    </v-card>

    <v-card class="mx-auto">
      <h1 class="ml-10 pt-5 mb-n5">Minisérie</h1>
      <v-slide-group
        v-model="modelAiringToday"
        ref="slideGroupAiringToday"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        :show-arrows="useDisplay.xs ? false : true"
      >
        <v-slide-group-item
          v-for="(airingToday, index) in seriesAiringToday"
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
              :src="`https://image.tmdb.org/t/p/original${airingToday.backdrop_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${airingToday.backdrop_path}`"
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
              {{ airingToday.name }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{
                    airingToday.first_air_date
                      ? formatDate(airingToday.first_air_date)
                      : ""
                  }}
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
              :src="`https://image.tmdb.org/t/p/original${airingToday.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${airingToday.poster_path}`"
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
        :tvOrMovie="'tv'"
        :model="modelAiringToday"
        :details="seriesDetails"
        @eventWatchProviders="
          eventWatchProviders(seriesDetails.id, seriesDetails.name)
        "
        @episodios="eventEpisodios(seriesDetails.id, seriesDetails.seasons)"
        @eventMoreDetails="eventMoreDetails(seriesDetails.id)"
      />
    </v-card>

    <FilterMobile
      v-if="useDisplay.xs"
      ref="FilterMobile"
      :genres="genres"
      @eventChangeGenre="selectedGenre = $event"
    />
  </div>

  <WatchProviders
    ref="WatchProviders"
    :id="movieId"
    :title="movieTitle"
    :tvOrMovie="'tv'"
  />
  <MoreDetails
    ref="MoreDetails"
    :id="movieId"
    :tvOrMovie="'tv'"
    @episodios="eventEpisodios(seriesDetails.id, seriesDetails.seasons)"
  />

  <Episodios ref="Episodios" :serieId="serieId" :seasons="seasons" />
</template>

<script>
import axios from "axios";
import { useLoginStore } from "@/store/LoginStore";
import { useDisplay } from "vuetify";

import MoreDetails from "@/components/MoreDetails.vue";
import WatchProviders from "@/components/WatchProviders.vue";
import ExpandCardDetails from "@/components/ExpandCardDetails.vue";
import Episodios from "@/components/Episodios.vue";
import FilterMobile from "@/components/FilterMobile.vue";

export default {
  components: {
    MoreDetails,
    WatchProviders,
    ExpandCardDetails,
    Episodios,
    FilterMobile,
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
      serieId: 0,
      seasons: [],
      genres: [],
      selectedGenre: null,
    };
  },
  created() {
    this.getSeriesOnTheAir();
    this.getSeriesPopular();
    this.getSeriesTopRated();
    this.getSeriesAiringToday();
    this.getGenre();
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
    selectedGenre() {
      this.modelPopular = undefined;
      this.modelTopRated = undefined;
      this.modelAiringToday = undefined;
      this.$refs.slideGroupPopular.scrollOffset = 0;
      this.$refs.slideGroupTopRated.scrollOffset = 0;
      this.$refs.slideGroupAiringToday.scrollOffset = 0;
      this.getSeriesPopular();
      this.getSeriesTopRated();
      this.getSeriesAiringToday();
    },
  },
  methods: {
    getSeriesOnTheAir() {
      axios
        .get(
          "https://api.themoviedb.org/3/discover/tv?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&sort_by=popularity.desc&with_original_language=en&screened_theatrically=true"
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
      let url = `https://api.themoviedb.org/3/discover/tv?api_key=9f9a623c8918bc56839f26a94b5507aa`;
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
          this.seriesPopular = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSeriesTopRated() {
      let url = `https://api.themoviedb.org/3/discover/tv?api_key=9f9a623c8918bc56839f26a94b5507aa`;
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
          console.log("topRated", response);
          this.seriesTopRated = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSeriesAiringToday() {
      let url = `https://api.themoviedb.org/3/discover/tv?api_key=9f9a623c8918bc56839f26a94b5507aa`;
      url = `${url}&language=pt-BR`;
      url = `${url}&sort_by=popularity.desc`;
      url = `${url}&with_original_language=pt`;
      url = `${url}&watch_region=BR`;
      url = `${url}&with_type=2`;

      if (this.selectedGenre != null) {
        url = `${url}&with_genres=${this.selectedGenre.id}`;
      }

      axios
        .get(url)
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
    getGenre() {
      axios
        .get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR`
        )
        .then((response) => {
          console.log("genre", response);
          this.genres = response.data.genres;
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
    eventEpisodios(id, seasons) {
      this.serieId = id;
      this.seasons = seasons;
      this.$refs.Episodios.dialog = true;
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
