<template>
  <v-app-bar
    elevation="2"
    height="70"
    scroll-off-screen
    scroll-target="#scrolling-techniques"
    color="black"
    border="b-sm"
  >
    <v-app-bar-title>
      <v-row v-if="!useDisplay.smAndDown" no-gutters align="center">
        <v-img
          class="ml-12"
          src="@/assets/img/logo.png"
          max-width="80px"
          min-width="80px"
        ></v-img>

        <v-btn
          flat
          variant="plain"
          size="x-large"
          class="text-h5 ml-3"
          to="/Inicio"
          >Inicio</v-btn
        >
        <v-btn
          flat
          variant="plain"
          size="x-large"
          class="text-h5 mx-1"
          to="/Filmes"
          >Filmes</v-btn
        >
        <v-btn
          flat
          variant="plain"
          size="x-large"
          class="text-h5 mx-1"
          to="/Series"
          >Séries</v-btn
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
            @click:append="searchMulti"
            @keypress.enter="searchMulti"
          ></v-text-field>
        </v-responsive>

        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="mx-4">
              <v-avatar color="black" size="large">
                <v-img src="@/assets/img/avatar.png" cover></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="black" size="large" class="mb-2">
                  <v-img src="@/assets/img/avatar.png" cover></v-img>
                </v-avatar>
                <h3>{{name}}</h3>
                <p class="text-caption mt-1">{{email}}</p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  variant="text"
                  :to="{
                    name: 'Perfil',
                  }"
                >
                  Editar conta
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text" to="/"> Desconectar </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-row>

      <v-row v-else no-gutters align="center">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-img
          class="ml-12"
          src="@/assets/img/logo.png"
          max-width="80px"
          min-width="80px"
        ></v-img>
        <v-spacer></v-spacer>

        <v-menu
          v-model="menuSearch"
          location="bottom"
          :width="useDisplay.xs ? '100%' : '50%'"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ props }">
            <v-icon icon="mdi-magnify" color="primary" v-bind="props"></v-icon>
          </template>
          <v-card>
            <v-card-text>
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
                @click:append="searchMulti"
                @keypress.enter="searchMulti"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-menu>

        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="mx-4">
              <v-avatar color="black" size="large">
                <v-img src="@/assets/img/avatar.png" cover></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar
                  color="black"
                  size="large"
                  icon="mdi-account"
                  class="mb-2"
                  image="@/assets/img/avatar.png"
                >
                </v-avatar>
                <h3>Raul Silva Araujo</h3>
                <p class="text-caption mt-1">raul.araujo.2000@hotmail.com</p>
                <v-divider class="my-3"></v-divider>
                <v-btn
                  rounded
                  variant="text"
                  :to="{
                    name: 'Perfil',
                  }"
                >
                  Editar conta
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text" to="/"> Desconectar </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-row>
    </v-app-bar-title>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list nav>
      <v-list-item to="/Inicio">
        <template v-slot:prepend>
          <v-icon icon="mdi-home"></v-icon>
        </template>
        <v-list-item-title>Inicio</v-list-item-title>
      </v-list-item>
      <v-list-item to="/Filmes">
        <template v-slot:prepend>
          <v-icon icon="mdi-movie-open-outline"></v-icon>
        </template>
        <v-list-item-title>Filmes</v-list-item-title>
      </v-list-item>
      <v-list-item to="/Series">
        <template v-slot:prepend>
          <v-icon icon="mdi-youtube-tv"></v-icon>
        </template>
        <v-list-item-title>Series</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-dialog
    v-model="dialog"
    scrollable
    :width="!useDisplay.xs ? '95vw' : ''"
    :height="!useDisplay.xs ? '95vh' : ''"
    scrim="black"
    :fullscreen="useDisplay.xs"
  >
    <v-card :rounded="!useDisplay.xs ? 'xl' : ''" border="sm" color="black">
      <v-card-title class="bg-surface text-h5 py-4">
        <v-row no-gutters>
          <span :class="!useDisplay.xs ? 'text-h5' : ''">
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
        <v-card
          v-for="movies in resultSearch"
          :key="movies"
          elevation="5"
          border="sm"
          rounded="xl"
          height="250"
          class="ma-3"
        >
          <v-img
            :src="`https://image.tmdb.org/t/p/original${movies.poster_path}`"
            :lazy-src="`https://image.tmdb.org/t/p/w300${movies.poster_path}`"
            gradient="to bottom, rgba(0,0,0,.9), rgba(0,0,0,.5)"
            cover
            height="100%"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                ></v-progress-circular>
              </div>
            </template>

            <v-card-title>{{
              movies.title != undefined ? movies.title : movies.name
            }}</v-card-title>
            <v-card-subtitle class="mt-n1">
              {{
                movies.release_date != "" ? formatDate(movies.release_date) : ""
              }}</v-card-subtitle
            >
            <v-card-text>
              <p
                style="
                  display: -webkit-box;
                  max-width: 100vw;
                  -webkit-line-clamp: 5;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                "
                class="text-body-2"
              >
                {{ movies.overview }}
              </p>
            </v-card-text>
          </v-img>
          <v-row class="mt-n9" no-gutters justify="end">
            <v-btn
              variant="plain"
              @click.native="dialog = false"
              :to="{
                name: 'Detalhes',
                params: {
                  id: movies.id,
                  movieOrTv: movies.media_type,
                },
              }"
              >Ver mais</v-btn
            >
          </v-row>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { useDisplay } from "vuetify";
import axios from "axios";
export default {
  data() {
    return {
      useDisplay: useDisplay(),
      dialog: false,
      menuSearch: false,
      search: "",
      page: 1,
      resultSearch: [],
      totalResults: 0,
      drawer: false,
      name: "",
      email: "",
    };
  },
  mounted() {
    this.name = localStorage.getItem('name')
    this.email = localStorage.getItem('email')
  },
  methods: {
    searchMulti() {
      if (this.search != "") {
        axios
          .get(
            `${import.meta.env.VITE_BASE_URL}/search/multi?api_key=${
              import.meta.env.VITE_API_KEY
            }&language=pt-BR&region=BR&page=${this.page}&query=${this.search}`
          )
          .then((response) => {
            console.log("Search", response);
            this.resultSearch = response.data.results;
            this.totalResults = response.data.total_results;
            this.search = "";
            this.menuSearch = false;
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
