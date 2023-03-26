<template>
  <v-app-bar
    elevation="2"
    height="70"
    scroll-off-screen
    scroll-target="#scrolling-techniques"
  >
    <v-app-bar-title>
      <v-row no-gutters>
        <v-img
          class="ml-12"
          src="@/assets/img/logo.png"
          max-width="80px"
          min-width="80px"
        ></v-img>

        <v-btn flat variant="plain" size="x-large" class="text-h5 ml-3"
          >Inicio</v-btn
        >
        <v-btn flat variant="plain" size="x-large" class="text-h5 mx-1"
          >Filmes</v-btn
        >
        <v-btn flat variant="plain" size="x-large" class="text-h5 mx-1"
          >Séries</v-btn
        >
        <v-btn flat variant="plain" size="x-large" class="text-h5 mx-1"
          >Livros</v-btn
        >
        <v-spacer></v-spacer>

        <v-responsive width="0px" class="my-auto ml-12 pl-12 mr-2">
          <v-text-field
            v-model="search"
            density="compact"
            variant="solo"
            single-line
            hide-details
            color="black"
            bg-color="white"
            clear-icon="mdi-close-circle"
            clearable
            append-icon="mdi-magnify"
            label="Pesquisar"
            type="text"
            @click:append="searchMovie"
            @keypress.enter="searchMovie"
          ></v-text-field>
        </v-responsive>

        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="mx-4">
              <v-avatar color="grey" size="large" icon="mdi-account">
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar
                  color="grey"
                  size="large"
                  icon="mdi-account"
                  class="mb-2"
                >
                </v-avatar>
                <h3>Raul Silva Araujo</h3>
                <p class="text-caption mt-1">raul.araujo.2000@hotmail.com</p>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text"> Editar conta </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text"> Desconectar </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-row>
    </v-app-bar-title>
  </v-app-bar>

  <v-dialog
    v-model="dialog"
    scrollable
    height="70vh"
    width="80vw"
    scrim="black"
  >
    <v-card rounded="xl" border="sm" color="black">
      <v-card-title class="bg-surface text-h5 py-4">
        <v-row no-gutters>
          <span class="text-h5">
            Sua pesquisa retornou: {{ totalResults }}</span
          >
          <v-spacer></v-spacer>
          <v-icon
            icon="mdi-close"
            size="small"
            color="white"
            @click="dialog = false"
          ></v-icon>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-banner
          v-for="movies in resultSearch"
          :key="movies"
          class="my-4"
          rounded="xl"
          elevation="8"
          border="sm"
          style="background: rgb(0, 0, 0, 0.9)"
        >
          <template v-slot:prepend>
            <v-avatar size="130">
              <v-img
                v-if="movies.poster_path"
                :src="`https://image.tmdb.org/t/p/w200${movies.poster_path}`"
                :alt="movies.title"
                cover
              ></v-img>
              <v-icon v-else icon="mdi-cancel" size="80"></v-icon>
            </v-avatar>
          </template>

          <v-banner-text>
            <p class="text-h6">{{ movies.title }}</p>
            <p class="text-caption-2">
              {{
                movies.release_date != "" ? formatDate(movies.release_date) : ""
              }}
            </p>
            <span class="text-body-1">{{ movies.overview }}</span>
          </v-banner-text>

          <template v-slot:actions>
            <v-btn color="primary" variant="plain">Veja mais</v-btn>
          </template>
        </v-banner>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      search: "",
      page: 1,
      resultSearch: [],
      totalResults: 0,
    };
  },
  methods: {
    searchMovie() {
      if (this.search != "") {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&page=${this.page}&query=${this.search}`
          )
          .then((response) => {
            console.log("Search", response);
            this.resultSearch = response.data.results;
            this.totalResults = response.data.total_results;
            this.dialog = true;
          })
          .catch((error) => {
            console.log(error);
          });
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