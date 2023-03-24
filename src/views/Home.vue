<template>
  <div>
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-carousel v-bind="props" cycle :height="isHovering ? '600' : '300'" hide-delimiter-background hide-delimiters
          show-arrows="hover" :interval="isHovering ? 50000 : 6000">
          <v-carousel-item v-for="movies in moviesPopular" :key="movies"
            :src="`https://image.tmdb.org/t/p/original${movies.backdrop_path}`" cover class="justify-center align-end">
            <v-responsive height="100vh" width="100vw" class="d-flex">
              <div style="
                                                width: 100vw;
                                                height: 100vh;
                                                position: absolute;
                                                background: rgb(0, 0, 0,0.4);
                                                filter: blur(0px);
                                              "></div>
            </v-responsive>

            <v-card :height="isHovering ? '230px' : '180px'" width="100%" elevation="0" color="rgb(0, 0, 0,0.4)"
              class="mx-auto" :title="movies.title">
              <v-card-text>
                <v-responsive width="80%">
                  {{ isHovering ? movies.overview : movies.overview.length > 200 ? `${movies.overview.substring(0,
                    200)}...` : movies.overview }}
                </v-responsive>
                <v-btn class="mt-4 mr-2" variant="outlined" prepend-icon="mdi-plus">Minha lista</v-btn>
                <v-btn class="mt-4" variant="outlined" prepend-icon="mdi-information">Saiba mais</v-btn>
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </template>
    </v-hover>


    <v-sheet class="mx-auto" elevation="8">
      <h1 class="ml-10 pt-5 mb-n5">Assista agora</h1>
      <v-slide-group v-model="model" class="pa-4" selected-class="bg-pink" center-active show-arrows>
        <v-slide-group-item v-for="nowPlay in nowPlaying" :key="nowPlay" v-slot="{ isSelected, toggle, selectedClass }">
          <v-card color="black/80" :class="['ma-4', selectedClass]" height="200" width="270" @click="toggle">
            <v-img :src="`https://image.tmdb.org/t/p/original${nowPlay.poster_path}`" height="120px" cover></v-img>

            <v-card-title>
              {{ nowPlay.title }}
            </v-card-title>

            <v-card-subtitle>
              {{ nowPlay.overview }}
            </v-card-subtitle>
            <!-- <div class="d-flex fill-height align-center justify-center">
              <v-scale-transition>
                <v-icon v-if="isSelected" color="white" size="48" icon="mdi-close-circle-outline"></v-icon>
              </v-scale-transition>
            </div> -->
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" height="70vh">
          <v-img class="d-flex fill-height align-center justify-center"
            :src="`https://image.tmdb.org/t/p/original${this.nowPlaying[model].poster_path}`">

            <span>testes</span>
          </v-img>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
  </div>
</template>

<script>
import axios from "axios";
import { useLoginStore } from "@/store/LoginStore";

export default {
  data() {
    return {
      loginStore: useLoginStore(),
      model: 2,
      moviesPopular: [],
      nowPlaying: [],
    };
  },
  created() {
    this.getFilmesCinema();
    this.getFilmesNowPlay();
  },
  methods: {
    getFilmesCinema() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR"
        )
        .then((response) => {
          console.log("Pupular", response);
          this.moviesPopular = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFilmesNowPlay() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR"
        )
        .then((response) => {
          console.log("nowPlay", response);
          this.nowPlaying = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>