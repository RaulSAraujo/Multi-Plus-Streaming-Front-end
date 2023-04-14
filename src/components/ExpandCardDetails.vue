<template>
  <v-expand-transition>
    <v-sheet
      v-if="model != null"
      color="black"
      :class="!useDisplay.xs ? 'mx-10 mb-5' : 'px-2 '"
    >
      <v-card rounded="xl" color="rgba(0,0,0,0.1)" elevation="0">
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="3" lg="3" xl="2">
            <v-img
              :src="`https://image.tmdb.org/t/p/original${details.poster_path}`"
              :lazy-src="`https://image.tmdb.org/t/p/w300${details.poster_path}`"
              class="align-end"
              gradient="to right, rgba(0,0,0,0.6),rgba(0,0,0,0.4),rgba(0,0,0,0.3),rgba(0,0,0,0)"
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

              <v-list-item
                class="pb-3 text-white"
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
            <v-card
              class="pa-4"
              height="100%"
              elevation="0"
              color="transparent"
              style="
                background: linear-gradient(
                  rgba(35, 35, 36, 0.6),
                  rgba(35, 35, 36, 0.8),
                  rgba(35, 35, 36, 0.8),
                  rgba(35, 35, 36, 0.6)
                );
              "
            >
              <v-card-title>
                <v-row no-gutters justify="space-between" align="center">
                  <v-col cols="10" sm="10" md="11" lg="11">
                    <v-responsive>
                      <div class="text-truncate mr-2">
                        <span
                          class="text-xs-subtitle-1 text-sm-h5 text-md-h4 text-lg-h3 text-xl-h3"
                          >{{
                            tvOrMovie == "movie" ? details.title : details.name
                          }}</span
                        >
                      </div>
                    </v-responsive>
                  </v-col>
                  <v-col cols="2" sm="1" md="1" lg="1">
                    <v-avatar
                      v-if="!useDisplay.xs"
                      color="green"
                      variant="outlined"
                      class="text-body-1"
                    >
                      {{ formatAverage(details.vote_average) }}
                    </v-avatar>

                    <v-avatar
                      v-else
                      color="green"
                      variant="outlined"
                      size="small"
                      class="text-body-2"
                    >
                      {{ formatAverage(details.vote_average) }}
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-subtitle class="mt-n2">
                <v-row v-if="!useDisplay.xs" no-gutters align="center">
                  <v-icon class="mr-1" icon="mdi-calendar-month" flat></v-icon>

                  <span>
                    {{
                      tvOrMovie == "movie"
                        ? details.release_date
                          ? formatDate(details.release_date)
                          : ""
                        : details.first_air_date
                        ? formatDate(details.first_air_date)
                        : ""
                    }}
                  </span>

                  <v-icon
                    icon="mdi-ticket-confirmation-outline"
                    class="mx-1"
                    flat
                  ></v-icon>

                  <span v-for="(genre, index) in details.genres" :key="index">
                    {{ genre.name }}
                    <span v-if="details.genres.length > index + 1">/</span>
                  </span>

                  <v-responsive v-if="tvOrMovie == 'movie'">
                    <v-icon icon="mdi-timer-sand" class="mx-1" flat></v-icon>
                    <span
                      >{{
                        details.runtime ? formatRuntime(details.runtime) : ""
                      }}m</span
                    >
                  </v-responsive>

                  <v-responsive v-else-if="details.episode_run_time">
                    <v-icon
                      v-if="details.episode_run_time[0]"
                      icon="mdi-timer-sand"
                      class="mx-1"
                      flat
                    ></v-icon>
                    <span v-if="details.episode_run_time[0]"
                      >{{
                        details.episode_run_time
                          ? formatRuntime(details.episode_run_time[0])
                          : ""
                      }}m</span
                    >
                  </v-responsive>
                </v-row>
                <v-row v-else no-gutters class="text-caption">
                  <v-col cols="12">
                    <v-icon
                      class="mr-1"
                      icon="mdi-calendar-month"
                      flat
                      size="15"
                    ></v-icon>

                    <span>
                      {{
                        tvOrMovie == "movie"
                          ? details.release_date
                            ? formatDate(details.release_date)
                            : ""
                          : details.first_air_date
                          ? formatDate(details.first_air_date)
                          : ""
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <v-row no-gutters align="center" justify="start">
                      <v-icon
                        icon="mdi-ticket-confirmation-outline"
                        class="mr-1"
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
                          <span v-if="details.genres.length - 1 > index"
                            >/</span
                          >
                        </v-breadcrumbs-item>
                      </v-breadcrumbs>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <v-row
                      v-if="tvOrMovie == 'movie'"
                      no-gutters
                      align="center"
                      justify="start"
                    >
                      <v-icon icon="mdi-timer-sand" class="mr-1" flat></v-icon>
                      <span
                        >{{
                          details.runtime ? formatRuntime(details.runtime) : ""
                        }}m</span
                      >
                    </v-row>

                    <v-row
                      v-else-if="details.episode_run_time"
                      no-gutters
                      align="center"
                      justify="start"
                    >
                      <v-icon
                        v-if="details.episode_run_time[0]"
                        icon="mdi-timer-sand"
                        class="mr-1"
                        flat
                      ></v-icon>
                      <span v-if="details.episode_run_time[0]"
                        >{{
                          details.episode_run_time
                            ? formatRuntime(details.episode_run_time[0])
                            : ""
                        }}m</span
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-subtitle>

              <v-card-text>
                <p
                  style="
                    display: -webkit-box;
                    max-width: 100vw;
                    min-height: 60px;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  "
                  class="'text-body-2'"
                >
                  {{ details.overview }}
                </p>

                <v-card
                  v-if="tvOrMovie == 'movie' && details.belongs_to_collection"
                  class="mt-2"
                  rounded="lg"
                  color="transparent"
                >
                  <v-img
                    :src="`https://image.tmdb.org/t/p/original${details.belongs_to_collection.backdrop_path}`"
                    :lazy-src="`https://image.tmdb.org/t/p/w300${details.belongs_to_collection.backdrop_path}`"
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
                    @click="useDisplay.xs ? eventEmitWatchColection() : null"
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

                    <v-card-title v-if="!useDisplay.xs" class="text-white">
                      <v-row no-gutters justify="space-between">
                        <span
                          :class="!useDisplay.xs ? 'text-h5' : 'text-body-2'"
                          >{{ details.belongs_to_collection.name }}</span
                        >

                        <v-btn
                          variant="plain"
                          flat
                          @click="eventEmitWatchColection()"
                          >VER COLETÂNEA</v-btn
                        >
                      </v-row>
                    </v-card-title>

                    <v-list-item v-else>
                      <v-list-item-title>{{
                        details.belongs_to_collection.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle
                        >Click aqui para ver a coleção.</v-list-item-subtitle
                      >
                    </v-list-item>
                  </v-img>
                </v-card>

                <v-card
                  v-if="
                    tvOrMovie == 'movie' &&
                    !details.belongs_to_collection &&
                    !useDisplay.xs
                  "
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
                  color="transparent"
                  rounded="lg"
                  elevation="0"
                >
                  <v-card-title class="text-white">
                    <v-row v-if="review" no-gutters>
                      <p class="text-h6">Resenha de {{ review.author }}</p>
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
                </v-card>

                <v-card v-if="tvOrMovie == 'tv'" class="mt-2" rounded="lg">
                  <v-img
                    :src="`https://image.tmdb.org/t/p/original${details.backdrop_path}`"
                    :lazy-src="`https://image.tmdb.org/t/p/w300${details.backdrop_path}`"
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

                    <v-card
                      color="rgb(0,0,0,0.4)"
                      density="compact"
                      rounded="t-xl"
                      class="px-3"

                    >
                      <v-row
                        v-if="!useDisplay.xs"
                        no-gutters
                        align="start"
                        justify="space-between"
                      >
                        <v-col>
                          <span :class="!useDisplay.xs ? 'text-h6' : ''"
                            >Temporadas
                            {{ details.number_of_seasons }}
                          </span>
                        </v-col>
                      </v-row>
                      <v-row
                        v-if="!useDisplay.xs"
                        no-gutters
                        align="start"
                        justify="space-between"
                      >
                        <v-col>
                          <span class="text-caption text-grey">
                            {{ details.number_of_episodes }} episódios
                            {{ details.in_production ? "/ Em produção" : "" }}
                          </span>
                        </v-col>
                        <v-col cols="4" sm="2" md="2" lg="2">
                          <v-btn
                            :size="!useDisplay.xs ? '' : 'small'"
                            variant="plain"
                            @click="eventEmitEpisodios()"
                            >Ver Episódios</v-btn
                          >
                        </v-col>
                      </v-row>
                      <v-list-item v-else @click="eventEmitEpisodios()">
                        <v-list-item-title>
                          Temporadas
                          {{ details.number_of_seasons }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          >Click aqui para ver os episodios.</v-list-item-subtitle
                        >
                      </v-list-item>
                    </v-card>
                  </v-img>
                </v-card>
              </v-card-text>

              <v-divider class="mb-2" v-if="useDisplay.xs"></v-divider>
              <v-row
                v-if="useDisplay.xs"
                align="center"
                justify="center"
                no-gutters
              >
                <span class="mr-2 text-h6">Avalie:</span>
                <span class="text-grey-lighten-2 text-body-2 mr-2">
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
              <v-divider class="mt-2" v-if="useDisplay.xs"></v-divider>

              <v-card-actions v-if="!useDisplay.xs">
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

              <v-card-actions v-else>
                <v-row justify="center" align="center">
                  <v-btn
                    class="mt-4 mr-2"
                    variant="plain"
                    prepend-icon="mdi-plus"
                    >Minha lista</v-btn
                  >
                  <v-btn
                    class="mt-4"
                    variant="plain"
                    prepend-icon="mdi-information"
                    @click="eventEmitMoreDetails()"
                    >Saiba mais</v-btn
                  >
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
  emits: [
    "eventWatchProviders",
    "eventWatchColection",
    "eventMoreDetails",
    "episodios",
  ],
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
    eventEmitEpisodios() {
      this.$emit("episodios");
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
