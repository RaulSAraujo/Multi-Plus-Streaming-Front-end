<template>
  <v-expand-transition>
    <v-sheet v-if="model != null" class="px-10 pb-5">
      <v-card variant="outlined" rounded="xl">
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="3" lg="3" xl="2">
            <v-img
              :src="`https://image.tmdb.org/t/p/w300${details.poster_path}`"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)"
              cover
            >
              <v-list-item
                class="mb-3 text-white"
                title="Assista agora"
                subtitle="Stream, Alugar, Comprar"
                @click="eventEmitWatchProviders()"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-play-circle" size="40"></v-icon>
                </template>
              </v-list-item>
            </v-img>
          </v-col>
          <v-col cols="12" sm="12" md="9" lg="9" xl="10">
            <v-card class="pa-4" height="100%" elevation="0">
              <v-card-title class="text-h4">
                <v-row no-gutters justify="space-between" align="center">
                  <v-col cols="10" sm="10" md="11" lg="11">
                    <span
                      class="text-h6 text-sm-subtitle-1 text-md-h4 text-lg-h3 text-xl-h3"
                      >{{
                        tvOrMovie == "movie" ? details.title : details.name
                      }}</span
                    >
                  </v-col>
                  <v-col cols="2" sm="1" md="1" lg="1">
                    <v-avatar
                      color="green"
                      variant="outlined"
                      class="d-none d-md-flex text-body-1"
                    >
                      {{ formatAverage(details.vote_average) }}
                    </v-avatar>

                    <v-avatar
                      color="green"
                      variant="outlined"
                      size="small"
                      class="d-flex d-md-none text-subtitle-2"
                    >
                      {{ formatAverage(details.vote_average) }}
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-subtitle class="mt-n2">
                <v-row no-gutters>
                  <v-icon icon="mdi-calendar-month" flat></v-icon>

                  <span>
                    {{ formatDate(details.release_date) }}
                  </span>

                  <v-icon
                    icon="mdi-ticket-confirmation-outline"
                    class="ml-1"
                    flat
                  ></v-icon>

                  <v-breadcrumbs
                    density="compact"
                    divider=","
                    class="py-0 px-0"
                  >
                    <v-breadcrumbs-item
                      v-for="(genres, index) in details.genres"
                      :key="index"
                      class="px-0"
                    >
                      <span>{{ genres.name }}</span>
                      <span v-if="details.genres.length - 1 > index"></span>
                    </v-breadcrumbs-item>
                  </v-breadcrumbs>

                  <v-icon icon="mdi-timer-sand" class="ml-1" flat></v-icon>

                  <span v-if="tvOrMovie == 'movie'"
                    >{{
                      details.runtime ? formatRuntime(details.runtime) : ""
                    }}m</span
                  >
                  <span v-else
                    >{{
                      details.episode_run_time
                        ? formatRuntime(details.episode_run_time[0]) 
                        : ""
                    }}m</span
                  >
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
                  {{ details.overview }}
                </p>

                <v-card
                  v-if="tvOrMovie == 'movie' && details.belongs_to_collection"
                  class="mt-2"
                  rounded="lg"
                >
                  <v-img
                    :src="`https://image.tmdb.org/t/p/original${details.belongs_to_collection.backdrop_path}`"
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
                        <span class="text-h5">{{
                          details.belongs_to_collection.name
                        }}</span>

                        <v-spacer></v-spacer>
                        <v-btn
                          rounded="xl"
                          variant="outlined"
                          flat
                          @click="eventEmitWatchColection()"
                          >MOSTRAR A COLETÂNEA</v-btn
                        >
                      </v-row>
                    </v-card-title>
                  </v-img>
                </v-card>

                <v-card v-if="tvOrMovie == 'tv'" class="mt-2" rounded="lg">
                  <v-img
                    :src="`https://image.tmdb.org/t/p/original${details.backdrop_path}`"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    :height="
                      useDisplay.smAndDown
                        ? '50vw'
                        : useDisplay.md
                        ? '8vw'
                        : useDisplay.lg
                        ? '13vw'
                        : useDisplay.xl
                        ? '11vw'
                        : '10vw'
                    "
                    cover
                  >
                    <v-card
                      color="rgb(0,0,0,0.4)"
                      density="compact"
                      rounded="t-xl"
                      class="px-3"
                    >
                      <v-row no-gutters align="start" justify="space-between">
                        <v-col>
                          <span class="text-h6"
                            >Temporadas
                            {{ details.number_of_seasons }}
                          </span>
                        </v-col>
                      </v-row>
                      <v-row no-gutters align="start" justify="space-between">
                        <v-col>
                          <span class="text-caption text-grey">
                            {{ details.number_of_episodes }} episódios 
                            {{ details.in_production ? "/ Em produção" : "" }}
                          </span>
                        </v-col>
                        <v-col cols="4" sm="2" md="2" lg="2">
                          <v-btn variant="plain">Ver Episódios</v-btn>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-img>
                </v-card>

                <!-- <v-card
                  v-else
                  :height="
                    useDisplay.smAndDown
                      ? '20vw'
                      : useDisplay.md
                      ? '8vw'
                      : useDisplay.lg
                      ? '15vw'
                      : useDisplay.xl
                      ? '11vw'
                      : '10vw'
                  "
                  class="mt-2 mx-n5"
                  rounded="lg"
                  elevation="0"
                >
                  <v-card-title class="text-white">
                    <v-row v-if="review" no-gutters>
                      <p class="text-h6">Resenha de {{ review.author }}</p>
                      <v-spacer></v-spacer>
                      <v-card-subtitle>Veja mais...</v-card-subtitle>
                    </v-row>
                    <p v-else class="text-center text-h5 mt-6">
                      Infelizmente este filme não possui resenhas.
                    </p>
                  </v-card-title>

                  <v-card-text>
                    <p
                      v-if="review"
                      style="
                        display: -webkit-box;
                        max-width: 100vw;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                      "
                      :style="
                        useDisplay.smAndDown
                          ? '-webkit-line-clamp: 6;'
                          : useDisplay.md
                          ? '-webkit-line-clamp: 3;'
                          : useDisplay.lg
                          ? '-webkit-line-clamp: 7;'
                          : '-webkit-line-clamp: 7;'
                      "
                      class="text-body-2"
                    >
                      {{ review.content }}
                    </p>
                    <v-row v-else justify="center" class="mt-2">
                      <v-icon icon="mdi-emoticon-sad-outline" size="70">
                      </v-icon>
                    </v-row>
                  </v-card-text>
                </v-card> -->
              </v-card-text>

              <v-card-actions>
                <v-row justify="space-between" align="center">
                  <v-col cols="12" sm="7" md="6" lg="5" xl="4">
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
                      @click="eventEmitMoreDetails()"
                      >Saiba mais</v-btn
                    >
                  </v-col>
                  <v-col cols="12" sm="4" md="4" lg="4" xl="2">
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
</template>

<script>
import { useDisplay } from "vuetify";

export default {
  props: {
    tvOrMovie: String,
    model: undefined,
    details: Object,
  },
  data() {
    return {
      useDisplay: useDisplay(),
      rating: 3,
      review: [],
    };
  },
  watch: {
    details() {
      this.review = this.details.reviews.results[0];
    },
  },
  methods: {
    eventEmitWatchProviders() {
      this.$emit("eventWatchProviders");
    },
    eventEmitWatchColection() {
      this.$emit("eventWatchColection");
    },
    eventEmitMoreDetails() {
      this.$emit("eventMoreDetails");
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