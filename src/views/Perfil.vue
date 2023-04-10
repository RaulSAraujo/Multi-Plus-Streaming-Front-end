<template>
  <v-card class="mx-auto" max-width="100vw" height="200" rounded="0">
    <v-img height="100%" cover src="@/assets/img/Backgroud.png">
      <v-card height="100%" color="rgb(0,0,0,0.5)" class="d-flex align-end">
        <v-row class="mb-3" justify="center" align="center">
          <v-avatar color="grey" size="150">
            <v-img
              cover
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
          <v-list-item
            class="text-white"
            title="Marcus Obrien"
            subtitle="Network Engineer"
          ></v-list-item>
        </v-row>
      </v-card>
    </v-img>
  </v-card>

  <v-card class="mx-auto" max-width="100vw">
    <v-list lines="two">
      <v-list-subheader inset>Minhas lista</v-list-subheader>

      <v-list-item
        v-for="list in myList"
        :key="list"
        :title="list.title"
        :subtitle="list.overview"
      >
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-img
              :src="`https://image.tmdb.org/t/p/original${list.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${list.poster_path}`"
              cover
            ></v-img>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>




    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      myList: [],
      loading: false,
    };
  },
  created() {
    this.getTendencias();
  },
  methods: {
    getTendencias() {
      this.loading = true;
      let url = `https://api.themoviedb.org/3/trending/all/day?api_key=9f9a623c8918bc56839f26a94b5507aa`;
      url = `${url}&language=pt-BR`;
      url = `${url}&sort_by=popularity.desc`;
      url = `${url}&with_original_language=en`;
      url = `${url}&watch_region=BR`;

      axios
        .get(url)
        .then((response) => {
          console.log("List", response);
          this.myList = response.data.results;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>