<template>
  <v-dialog
    v-model="dialog"
    scrollable
    :height="!useDisplay.xs ? '80vh' : ''"
    :width="!useDisplay.xs ? '100vw' : ''"
    scrim="black"
    :fullscreen="useDisplay.xs"
  >
    <v-card :rounded="!useDisplay.xs ? 'xl' : ''" border="sm" color="black">
      <v-card-title class="bg-surface text-h5 py-4">
        <v-row no-gutters>
          <span class="text-h5">Temporadas/Episodios</span>
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-item-group v-if="!useDisplay.xs" v-model="selection">
          <v-row>
            <v-col v-for="(season, i) in seasons" :key="i" cols="12">
              <v-item v-if="season.air_date" v-slot="{ isSelected, toggle }">
                <v-card
                  elevation="5"
                  border="sm"
                  rounded="xl"
                  height="250"
                  class="ma-3"
                  color="transparent"
                >
                  <v-img
                    v-if="season.poster_path"
                    :src="imgUrlCard(season)"
                    :lazy-src="lazyImgUrlCard(season)"
                    :alt="season.name"
                    gradient="to bottom, rgba(0,0,0,.9), rgba(0,0,0,.5)"
                    cover
                  >
                    <template v-slot:placeholder>
                      <div
                        class="d-flex align-center justify-center fill-height"
                      >
                        <v-progress-circular
                          color="grey-lighten-4"
                          indeterminate
                        ></v-progress-circular>
                      </div>
                    </template>
                    <v-card-title>{{ season.name }}</v-card-title>
                    <v-card-subtitle class="mt-n1">
                      {{
                        season.air_date != "" ? formatDate(season.air_date) : ""
                      }}
                    </v-card-subtitle>
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
                        {{ season.overview }}
                      </p>
                    </v-card-text>
                  </v-img>
                  <v-row class="mt-n12 mr-2" no-gutters justify="end">
                    <v-btn
                      variant="plain"
                      :icon="isSelected ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                      @click="toggle"
                    ></v-btn>
                  </v-row>
                </v-card>

                <v-expand-transition>
                  <div v-show="isSelected">
                    <v-slide-group
                      v-model="model"
                      class="pa-4"
                      selected-class="bg-success"
                    >
                      <v-slide-group-item
                        v-for="episodio in episodios"
                        :key="episodio"
                      >
                        <v-card
                          elevation="5"
                          width="410"
                          border="sm"
                          rounded="xl"
                          class="ma-3"
                          color="transparent"
                        >
                          <v-img
                            :src="imgUrl(episodio)"
                            :lazy-src="lazyImgUrl(episodio)"
                            gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.7)"
                            cover
                            height="100%"
                          >
                            <template v-slot:placeholder>
                              <div
                                class="d-flex align-center justify-center fill-height"
                              >
                                <v-progress-circular
                                  color="grey-lighten-4"
                                  indeterminate
                                ></v-progress-circular>
                              </div>
                            </template>

                            <v-card-title>
                              <v-row
                                no-gutters
                                justify="space-between"
                                align="center"
                              >
                                <v-col cols="10" sm="10" md="11" lg="11">
                                  <div class="text-h5 text-truncate">
                                    <v-avatar
                                      color="white"
                                      variant="outlined"
                                      class="text-body-2 mr-2 mt-n1"
                                      size="x-small"
                                    >
                                      {{ episodio.episode_number }}
                                    </v-avatar>
                                    <span>{{ episodio.name }}</span>
                                  </div>
                                </v-col>
                                <v-col cols="2" sm="1" md="1" lg="1">
                                  <v-avatar
                                    color="white"
                                    variant="outlined"
                                    class="text-body-2"
                                    size="small"
                                  >
                                    {{ formatAverage(episodio.vote_average) }}
                                  </v-avatar>
                                </v-col>
                              </v-row>
                            </v-card-title>
                            <v-card-subtitle class="mt-n1">
                              <v-icon icon="mdi-calendar-month" flat></v-icon>
                              <span>
                                {{ formatDate(episodio.air_date) }}
                              </span>
                              <v-icon
                                icon="mdi-timer-sand"
                                class="ml-1"
                                flat
                              ></v-icon>

                              <span
                                >{{
                                  episodio.runtime
                                    ? formatRuntime(episodio.runtime)
                                    : ""
                                }}m</span
                              >
                            </v-card-subtitle>
                            <v-card-text>{{ episodio.overview }}</v-card-text>
                          </v-img>
                          <v-row class="mt-n9" no-gutters justify="end">
                            <v-btn
                              variant="plain"
                              @click="
                                getEpisodiosCredits(episodio.episode_number)
                              "
                              >Participantes</v-btn
                            >
                          </v-row>
                        </v-card>
                      </v-slide-group-item>
                    </v-slide-group>
                  </div>
                </v-expand-transition>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>

        <div v-else>
          <v-select
            v-model="selectSeason"
            :items="seasons"
            item-title="name"
            item-value="season_number"
            color="primary"
            bg-color="grey-darken-4"
            return-object
          ></v-select>
          <v-row v-for="episodio in episodios" :key="episodio">
            <v-card
              elevation="5"
              width="410"
              border="sm"
              rounded="xl"
              class="ma-3"
              color="transparent"
            >
              <v-img
                :src="imgUrl(episodio)"
                :lazy-src="lazyImgUrl(episodio)"
                gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.7)"
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

                <v-card-title>
                  <v-row no-gutters justify="space-between" align="center">
                    <v-col cols="10" sm="10" md="11" lg="11">
                      <div class="text-h5 text-truncate">
                        <v-avatar
                          color="white"
                          variant="outlined"
                          class="text-body-2 mr-2 mt-n1"
                          size="x-small"
                        >
                          {{ episodio.episode_number }}
                        </v-avatar>
                        <span>{{ episodio.name }}</span>
                      </div>
                    </v-col>
                    <v-col cols="2" sm="1" md="1" lg="1">
                      <v-avatar
                        color="white"
                        variant="outlined"
                        class="text-body-2"
                        size="small"
                      >
                        {{ formatAverage(episodio.vote_average) }}
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-subtitle class="mt-n1">
                  <v-icon icon="mdi-calendar-month" flat></v-icon>
                  <span>
                    {{ formatDate(episodio.air_date) }}
                  </span>
                  <v-icon icon="mdi-timer-sand" class="ml-1" flat></v-icon>

                  <span
                    >{{
                      episodio.runtime ? formatRuntime(episodio.runtime) : ""
                    }}m</span
                  >
                </v-card-subtitle>
                <v-card-text>{{ episodio.overview }}</v-card-text>
              </v-img>
              <v-row class="mt-n9" no-gutters justify="end">
                <v-btn
                  variant="plain"
                  @click="getEpisodiosCredits(episodio.episode_number)"
                  >Participantes</v-btn
                >
              </v-row>
            </v-card>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="dialogCredit"
      scrollable
      :height="!useDisplay.xs ? '90vh' : ''"
      :width="!useDisplay.xs ? '40vw' : ''"
      scrim="black"
      :fullscreen="useDisplay.xs"
    >
      <v-card :rounded="!useDisplay.xs ? 'xl' : ''">
        <v-card-title>
          <v-row no-gutters>
            <span class="text-h5">Participantes</span>
            <v-spacer></v-spacer>
            <v-icon
              icon="mdi-close"
              size="small"
              color="grey"
              @click="dialogCredit = false"
            ></v-icon>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="guestStar in guestStars.cast"
              :key="guestStar"
              cols="6"
            >
              <v-card border="sm" rounded="xl">
                <v-img
                  :src="`https://image.tmdb.org/t/p/original${guestStar.profile_path}`"
                  height="250"
                  cover
                >
                </v-img>
                <v-card-title>{{ guestStar.name }}</v-card-title>
                <v-card-subtitle class="mt-n2 mb-4">{{
                  guestStar.character
                }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useDisplay } from "vuetify";
export default {
  props: {
    serieId: Number,
    seasons: Object,
  },
  data() {
    return {
      useDisplay: useDisplay(),
      dialog: false,
      episodios: [],
      selection: undefined,
      model: undefined,
      dialogCredit: false,
      guestStars: [],
      selectSeason: [],
    };
  },
  watch: {
    dialog(val) {
      if (val == false) {
        this.selection = undefined;
      } else {
        if (this.useDisplay.xs) {
          this.selectSeason = this.seasons[0];
        }
      }
    },
    selection(val) {
      if (val != undefined) {
        this.getEpisodios();
      }
    },
    selectSeason(val) {
      if (val.name.length > 0) {
        this.selection = val.season_number;
        this.getEpisodios();
      }
    },
  },
  methods: {
    getEpisodios() {
      let index = 0;
      if (this.seasons.length > 1) {
        index = this.selection;
      }

      axios
        .get(
          `${import.meta.env.VITE_BASE_URL}/tv/${this.serieId}/season/${
            this.seasons[index].season_number
          }?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`
        )
        .then((response) => {
          console.log("Episodios", response);
          this.episodios = response.data.episodes;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getEpisodiosCredits(epsodeNumber) {
      axios
        .get(
          `${import.meta.env.VITE_BASE_URL}/tv/${this.serieId}/season/${
            this.seasons[this.selection].season_number
          }/episode/${epsodeNumber}/credits?api_key=${
            import.meta.env.VITE_API_KEY
          }&language=pt-BR`
        )
        .then((response) => {
          console.log("Credit", response);
          this.guestStars = response.data;
          this.dialogCredit = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(dateString) {
      const date = dateString != undefined ? new Date(dateString) : "";
      return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
        date
      );
    },
    formatAverage(voteAverage) {
      if (voteAverage != undefined) {
        return voteAverage.toFixed(1);
      }
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
    imgUrlCard(props) {
      let imgNotFound = new URL(
        `@/assets/img/image-not-found.png`,
        import.meta.url
      );

      if (props.poster_path != null)
        return `https://image.tmdb.org/t/p/original${props.poster_path}`;
      if (props.still_path != null)
        return `https://image.tmdb.org/t/p/original${props.still_path}`;
      else return imgNotFound.toString();
    },
    lazyImgUrlCard(props) {
      let imgNotFound = new URL(
        `@/assets/img/image-not-found.png`,
        import.meta.url
      );
      if (props.poster_path != null)
        return `https://image.tmdb.org/t/p/w342${props.poster_path}`;
      if (props.still_path != null)
        return `https://image.tmdb.org/t/p/w300${props.still_path}`;
      else return imgNotFound.toString();
    },
    imgUrl(props) {
      let imgNotFound = new URL(
        `@/assets/img/image-not-found.png`,
        import.meta.url
      );
      if (props.still_path != null)
        return `https://image.tmdb.org/t/p/original${props.still_path}`;
      else return imgNotFound.toString();
    },
    lazyImgUrl(props) {
      let imgNotFound = new URL(
        `@/assets/img/image-not-found.png`,
        import.meta.url
      );
      if (props.still_path != null)
        return `https://image.tmdb.org/t/p/w300${props.still_path}`;
      else return imgNotFound.toString();
    },
  },
};
</script>

<style>
</style>
