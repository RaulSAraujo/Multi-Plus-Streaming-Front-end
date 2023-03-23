<template>
  <div>
    <v-hover close-delay="200">
      <template v-slot:default="{ isHovering, props }">
        <v-carousel v-bind="props" cycle :height="isHovering ? '600' : '300'" hide-delimiter-background hide-delimiters
          show-arrows="hover" :interval="isHovering ? 50000 : 50000">
          <v-carousel-item v-for="movies in moviesPopular" :key="movies" style="opacity: 0.3;"
            :src="`https://image.tmdb.org/t/p/original${movies.backdrop_path}`" cover class="justify-center align-end">
            <v-card height="150px" width="100%" elevation="0" rounded="t-lg" :title="movies.title">
              <v-card-text>
                <v-responsive width="40%" height="100px">
                  <div class="text-truncate">
                    {{ `${movies.overview}` }}
                  </div>
                </v-responsive>
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </template>
    </v-hover>

    <v-sheet class="mx-auto" elevation="8">
      <v-slide-group v-model="model" class="pa-4" selected-class="bg-primary" center-active show-arrows>
        <v-slide-group-item v-for="n in 15" :key="n" v-slot="{ isSelected, toggle, selectedClass }">
          <v-card color="grey-lighten-1" :class="['ma-4', selectedClass]" height="200" width="270" @click="toggle">
            <div class="d-flex fill-height align-center justify-center">
              <v-scale-transition>
                <v-icon v-if="isSelected" color="white" size="48" icon="mdi-close-circle-outline"></v-icon>
              </v-scale-transition>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" height="200">
          <div class="d-flex fill-height align-center justify-center">
            <h3 class="text-h6">Selected {{ model }}</h3>
          </div>
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
    };
  },
  created() {
    this.getFilmesCinema();
  },
  methods: {
    getFilmesCinema() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR"
        )
        .then((response) => {
          console.log("Filmes", response);
          this.moviesPopular = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>