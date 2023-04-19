<template>
  <v-app v-if="loading">
    <v-row justify="center" align="center">
      <v-sheet width="200" height="200" rounded="xl" border="sm" elevation="6">
        <v-row class="mt-7" align="center" justify="center" no-gutters>
          <v-progress-circular
            size="100"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
        <v-row class="mt-5" align="center" justify="center" no-gutters>
          <span>Carregando...</span>
        </v-row>
      </v-sheet>
    </v-row>
  </v-app>

  <v-sheet v-else elevation="0">
    <v-img
      :class="!useDisplay.xs ? 'mb-4 mx-n1' : ''"
      :src="
        backdropPath
          ? `https://image.tmdb.org/t/p/original${backdropPath}`
          : `https://image.tmdb.org/t/p/original${posterPath}`
      "
      :lazy-src="
        backdropPath
          ? `https://image.tmdb.org/t/p/w300${backdropPath}`
          : `https://image.tmdb.org/t/p/w300${posterPath}`
      "
      :height="!useDisplay.xs ? '350px' : ''"
      cover
      gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9)"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>

      <v-card
        class="pa-4 mx-n1"
        height="100%"
        elevation="0"
        color="rgb(0, 0, 0, 0.3)"
      >
        <v-card-title>
          <v-row no-gutters justify="space-between" align="center">
            <v-col cols="10" sm="10" md="11" lg="11">
              <v-responsive>
                <div class="text-truncate mr-2">
                  <span
                    class="text-xs-subtitle-1 text-sm-h5 text-md-h4 text-lg-h3 text-xl-h3"
                    >{{ nameTitle }}</span
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
                {{ voteAverage }}
              </v-avatar>

              <v-avatar
                v-else
                color="green"
                variant="outlined"
                size="small"
                class="text-body-2"
              >
                {{ voteAverage }}
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-subtitle class="mt-n2">
          <v-row v-if="!useDisplay.xs" no-gutters align="center">
            <v-icon icon="mdi-calendar-month" flat></v-icon>

            <span>
              {{ releaseDate != "" ? formatDate(releaseDate) : "" }}
            </span>

            <v-icon
              icon="mdi-ticket-confirmation-outline"
              class="ml-1"
              flat
            ></v-icon>

            <span v-for="(genre, index) in genres" :key="index">
              {{ genre.name }}
              <span v-if="genres.length > index + 1">/</span>
            </span>

            <v-icon icon="mdi-timer-sand" class="ml-1" flat></v-icon>

            <span>{{ formatRuntime(runtime) }}m</span>
          </v-row>
          <v-row v-else no-gutters align="center" class="text-caption">
            <v-col cols="12">
              <v-icon
                class="mr-1"
                icon="mdi-calendar-month"
                flat
                size="15"
              ></v-icon>

              <span>
                {{ releaseDate != "" ? formatDate(releaseDate) : "" }}
              </span>
            </v-col>
            <v-col cols="12">
              <v-row no-gutters align="center">
                <v-icon
                  icon="mdi-ticket-confirmation-outline"
                  class="mr-1"
                  flat
                  size="15"
                ></v-icon>

                <v-breadcrumbs density="compact" divider="," class="py-0 px-0">
                  <v-breadcrumbs-item
                    v-for="(genre, index) in genres"
                    :key="index"
                    class="px-0"
                  >
                    <span>{{ genre.name }}</span>
                    <span v-if="genre.length - 1 > index">/</span>
                  </v-breadcrumbs-item>
                </v-breadcrumbs>
              </v-row>
            </v-col>
            <v-col v-if="runtime" cols="12">
              <v-responsive>
                <v-icon
                  size="15"
                  icon="mdi-timer-sand"
                  class="mr-1"
                  flat
                ></v-icon>
                <span>{{ runtime ? formatRuntime(runtime) : "" }}m</span>
              </v-responsive>
            </v-col>
          </v-row>
        </v-card-subtitle>

        <v-card-text>
          <v-responsive>
            <p
              style="
                display: -webkit-box;
                max-width: 100vw;
                min-height: 100px;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                overflow: hidden;
              "
              class="text-body-2"
            >
              {{ overview }}
            </p>
          </v-responsive>
        </v-card-text>

        <v-card-actions v-if="!useDisplay.xs">
          <v-btn
            class="mt-4 mr-2"
            variant="plain"
            prepend-icon="mdi-play-circle"
            @click="eventWatchProviders()"
            >Assista agora</v-btn
          >
          <v-btn class="mt-4 mr-2" variant="plain" prepend-icon="mdi-plus"
            >Minha lista</v-btn
          >

          <v-row align="center" justify="end" no-gutters>
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
        </v-card-actions>

        <v-card-actions v-else>
          <v-row justify="center">
            <v-btn
              class="mt-4 mr-2"
              variant="plain"
              prepend-icon="mdi-play-circle"
              @click="eventWatchProviders()"
              >Assista agora</v-btn
            >
            <v-btn class="mt-4 mr-2" variant="plain" prepend-icon="mdi-plus"
              >Minha lista</v-btn
            >
          </v-row>
        </v-card-actions>
      </v-card>
    </v-img>

    <v-row
      class="mt-3"
      v-if="useDisplay.xs"
      align="center"
      justify="center"
      no-gutters
    >
      <span class="mr-2 text-h6">Avalie:</span>
      <span class="text-grey-lighten-2 text-body-2 mr-2"> ({{ rating }}) </span>
      <v-rating
        v-model="rating"
        color="white"
        active-color="yellow-accent-4"
        half-increments
        hover
        density="compact"
      ></v-rating>
    </v-row>

    <v-divider class="mt-2 mb-5" v-if="useDisplay.xs"></v-divider>

    <span class="ml-12 text-h5">Midia</span>
    <v-card elevation="0">
      <v-tabs v-model="tab" class="mx-9">
        <v-tab value="Imagens">Imagens</v-tab>
        <v-tab value="Videos">Videos</v-tab>
        <v-tab value="Pôsteres">Pôsteres</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab" :touch="true" disabled>
          <v-window-item value="Imagens" disabled>
            <v-sheet elevation="0" max-width="100%">
              <v-slide-group
                v-if="backDrops.length > 0"
                v-model="modelBackDrops"
                selected-class="bg-success"
                :show-arrows="!useDisplay.xs"
              >
                <v-slide-group-item
                  v-for="backdrops in backDrops"
                  :key="backdrops"
                >
                  <v-card
                    color="transparent"
                    class="ma-4"
                    :width="!useDisplay.xs ? '450' : '60vw'"
                    :height="!useDisplay.xs ? '250' : '150'"
                    rounded="lg"
                  >
                    <v-img
                      :src="`https://image.tmdb.org/t/p/original${backdrops.file_path}`"
                      :lazy-src="`https://image.tmdb.org/t/p/w300${backdrops.file_path}`"
                      height="100%"
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
                    </v-img>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>

              <span v-else class="ml-5 text-body-1"
                >Nenhuma imagem de fundo foram adicionadas em
                {{ nameTitle }}.</span
              >
            </v-sheet>
          </v-window-item>
          <v-window-item value="Videos">
            <v-sheet elevation="0" max-width="100%">
              <v-slide-group
                v-if="videos.length > 0"
                v-model="modelVideos"
                selected-class="bg-success"
                :show-arrows="!useDisplay.xs"
              >
                <v-slide-group-item
                  v-for="(video, index) in videos"
                  :key="index"
                >
                  <v-card
                    class="ma-4"
                    :width="!useDisplay.xs ? '450' : '60vw'"
                    :height="!useDisplay.xs ? '250' : '150'"
                    rounded="lg"
                    color="transparent"
                    @click="playDialog(video)"
                  >
                    <v-img
                      :src="`https://image.tmdb.org/t/p/original${backDrops[index].file_path}`"
                      :lazy-src="`https://image.tmdb.org/t/p/w300${backDrops[index].file_path}`"
                      height="100%"
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

                      <v-card height="100%" color="rgb(0,0,0,0.5)">
                        <div
                          class="d-flex align-center justify-center fill-height"
                        >
                          <v-icon
                            icon="mdi-youtube"
                            size="80"
                            color="red"
                          ></v-icon>
                        </div>
                      </v-card>
                    </v-img>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>

              <span v-else class="ml-5 text-body-1"
                >Nenhuma video foi adicionados em {{ nameTitle }}.</span
              >
            </v-sheet>
          </v-window-item>
          <v-window-item value="Pôsteres">
            <v-sheet elevation="0" max-width="100%">
              <v-slide-group
                v-if="postes.length > 0"
                v-model="modelPostes"
                selected-class="bg-success"
                :show-arrows="!useDisplay.xs"
              >
                <v-slide-group-item v-for="postes in postes" :key="postes">
                  <v-card
                    color="transparent"
                    class="ml-4 my-4"
                    height="250"
                    width="150"
                    rounded="xl"
                  >
                    <v-img
                      :src="`https://image.tmdb.org/t/p/original${postes.file_path}`"
                      :lazy-src="`https://image.tmdb.org/t/p/w300${postes.file_path}`"
                      height="100%"
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
                    </v-img>
                  </v-card>
                </v-slide-group-item>
              </v-slide-group>
              <span v-else class="ml-5 text-body-1"
                >Nenhum posteres foram adicionado em {{ nameTitle }}.</span
              >
            </v-sheet>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>

    <span class="ml-12 text-h5">Elenco principal</span>
    <v-sheet class="mx-auto" elevation="0" max-width="100%">
      <v-slide-group
        v-model="modelMainCast"
        class="pa-4"
        selected-class="bg-success"
        :show-arrows="!useDisplay.xs"
      >
        <v-slide-group-item v-for="cast in mainCast" :key="cast">
          <v-card
            rounded="xl"
            class="ma-4"
            color="transparent"
            height="200"
            width="170"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/w300${cast.profile_path}`"
              height="130px"
              cover
            ></v-img>
            <v-card-title>{{ cast.name }}</v-card-title>
            <v-card-subtitle class="mt-n3">{{
              cast.character
            }}</v-card-subtitle>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <span v-if="!useDisplay.xs" class="ml-12 mt-5 text-h5">Reviews</span>
    <v-sheet v-if="!useDisplay.xs" elevation="0" max-width="100%">
      <v-slide-group
        v-if="reviews.length > 0"
        v-model="modelReviews"
        class="pa-4"
        selected-class="bg-success"
        show-arrows
      >
        <v-slide-group-item v-for="review in reviews" :key="review">
          <v-card
            elevation="12"
            width="600"
            border="sm"
            rounded="xl"
            class="ma-5"
          >
            <v-card-title class="text-white">
              <v-row v-if="review" no-gutters>
                <p class="text-h6">Resenha de {{ review.author }}</p>
              </v-row>
            </v-card-title>

            <v-card-text>
              <p class="text-body-2">
                {{ review.content }}
              </p>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
      <v-card v-else elevation="0" class="ml-8">
        <v-card-title class="text-body-1"
          >Ainda não temos uma resenha para {{ nameTitle }}.</v-card-title
        >
      </v-card>
    </v-sheet>

    <v-list v-else>
      <v-list-item v-if="reviews.length > 0" link @click="dialogReviews = true">
        <v-list-item-title class="text-h5">Veja as reviews</v-list-item-title>
        <v-list-item-subtitle>Click aqui</v-list-item-subtitle>
      </v-list-item>
      <v-list-item v-else>
        <v-list-item-title class="text-h5">Veja as reviews</v-list-item-title>
        <v-list-item-subtitle
          >Ainda não temos uma resenha para
          {{ nameTitle }}.</v-list-item-subtitle
        >
      </v-list-item>
    </v-list>

    <v-card v-if="tvOrMovie == 'tv'" class="my-5">
      <v-img
        :src="`https://image.tmdb.org/t/p/original${backdropPath}`"
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
                {{ numberOfSeasons }}
              </span>
            </v-col>
          </v-row>
          <v-row no-gutters align="start" justify="space-between">
            <v-col>
              <span class="text-caption text-grey">
                {{ numberOfEpisodes }} episódios /
                {{ inProduction ? "Em produção" : "" }}
              </span>
            </v-col>
            <v-col cols="4" sm="2" md="2" lg="2">
              <v-btn variant="plain" @click="eventEmitEpisodios()"
                >Ver Episódios</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-img>
    </v-card>

    <v-card v-if="tvOrMovie == 'movie' && movieBelongsCollection" class="my-5">
      <v-img
        :src="`https://image.tmdb.org/t/p/original${movieBelongsCollection.backdrop_path}`"
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
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>

        <v-card-title v-if="!useDisplay.xs" class="text-white">
          <v-row no-gutters>
            <span :class="!useDisplay.xs ? 'text-h5' : 'text-body-2'">{{
              movieBelongsCollection.name
            }}</span>

            <v-spacer></v-spacer>
            <v-btn
              rounded="xl"
              variant="outlined"
              flat
              :class="!useDisplay.xs ? 'text-button px-2' : 'text-caption'"
              :size="!useDisplay.xs ? '' : 'x-small'"
              @click="eventWatchColection(movieBelongsCollection.id)"
              >VER COLETÂNEA</v-btn
            >
          </v-row>
        </v-card-title>

        <v-list-item
          v-else
          @click="
            useDisplay.xs
              ? eventWatchColection(movieBelongsCollection.id)
              : null
          "
        >
          <v-list-item-title>{{
            movieBelongsCollection.name
          }}</v-list-item-title>
          <v-list-item-subtitle
            >Click aqui para ver a coleção.</v-list-item-subtitle
          >
        </v-list-item>
      </v-img>
    </v-card>

    <span class="ml-12 text-h5">Recomendações</span>
    <v-sheet elevation="0" max-width="100%">
      <v-slide-group
        v-if="recommendations.length > 0"
        v-model="modelRecommendations"
        class="pa-4"
        selected-class="bg-success"
        :show-arrows="!useDisplay.xs"
      >
        <v-slide-group-item
          v-for="recommendation in recommendations"
          :key="recommendation"
        >
          <v-card
            color="transparent"
            class="ma-4"
            height="190"
            width="270"
            rounded="xl"
            :to="{
              name: 'Detalhes',
              params: {
                id: recommendation.id,
                movieOrTv: recommendation.media_type,
              },
            }"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/original${recommendation.backdrop_path}`"
              height="120px"
              cover
            ></v-img>

            <v-card-title>
              {{
                recommendation.title != undefined
                  ? recommendation.title
                  : recommendation.name
              }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{ recommendation.overview }}
                </div>
              </v-responsive>
            </v-card-subtitle>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
      <v-card v-else elevation="0" class="ml-8">
        <v-card-title class="text-body-1"
          >Ainda não temos dados o suficiente para sugerir filmes com base em
          {{ nameTitle }}</v-card-title
        >
      </v-card>
    </v-sheet>
  </v-sheet>

  <v-dialog v-model="dialogPlay" scrim="black">
    <v-row justify="center">
      <v-card color="black" height="50" width="80vw" rounded="t-xl">
        <v-row no-gutters justify="end" class="mr-6 mt-2 mb-n3">
          <v-icon
            icon="mdi-close"
            size="large"
            color="grey"
            @click="dialogPlay = false"
          ></v-icon>
        </v-row>
      </v-card>
    </v-row>

    <v-row justify="center" align="center">
      <v-card color="black" width="80vw" height="70vh" rounded="b-xl">
        <iframe
          class="my-4 mr-2"
          width="100%"
          height="100%"
          :src="`https://www.youtube-nocookie.com/embed/${selectPlay.key}`"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </v-card>
    </v-row>
  </v-dialog>

  <v-dialog v-model="dialogReviews" scrim="black" fullscreen>
    <v-card>
      <v-card-title class="bg-surface text-h5 py-4">
        <v-row no-gutters>
          <span class="text-h5">Reviews</span>
          <v-spacer></v-spacer>
          <v-btn
            icon="mdi-close"
            variant="plain"
            @click="dialogReviews = false"
          ></v-btn>
        </v-row>
      </v-card-title>
      <v-card-text>
        <div v-for="(review, index) in reviews" :key="index">
          <v-card elevation="0" width="100%">
            <v-card-title class="text-white">
              <v-row v-if="review" no-gutters>
                <p class="text-h6">Resenha de {{ review.author }}</p>
              </v-row>
            </v-card-title>

            <v-card-text>
              <p class="text-body-2">
                {{ review.content }}
              </p>
            </v-card-text>
          </v-card>
          <v-divider v-if="reviews.length > index + 1"></v-divider>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <WatchProviders
    ref="WatchProviders"
    :id="id"
    :title="nameTitle"
    :tvOrMovie="tvOrMovie"
  />
  <MoviesCollection ref="MoviesCollection" :collectionId="collectionId" />
  <Episodios ref="Episodios" :serieId="id" :seasons="seasons" />
</template>

<script>
import axios from "axios";
import { useDisplay } from "vuetify";
import { useRoute } from "vue-router";
import WatchProviders from "@/components/WatchProviders.vue";
import MoviesCollection from "@/components/MoviesCollection.vue";
import Episodios from "@/components/Episodios.vue";
export default {
  components: {
    WatchProviders,
    MoviesCollection,
    Episodios,
  },
  data() {
    return {
      dialog: false,
      useDisplay: useDisplay(),
      router: useRoute(),
      id: -1,
      tvOrMovie: "",
      loading: false,
      rating: 3,
      modelRecommendations: undefined,
      modelReviews: undefined,
      modelVideos: undefined,
      modelPostes: undefined,
      modelBackDrops: undefined,
      modelMainCast: undefined,
      nameTitle: "",
      voteAverage: "",
      backdropPath: "",
      posterPath: "",
      genres: [],
      releaseDate: "",
      runtime: 0,
      overview: "",
      collectionId: 0,
      movieBelongsCollection: [],
      mainCast: [],
      reviews: [],
      recommendations: [],
      tab: null,
      backDrops: [],
      logos: [],
      postes: [],
      videos: [],
      numberOfSeasons: 0,
      numberOfEpisodes: 0,
      inProduction: false,
      seasons: [],
      dialogPlay: false,
      selectPlay: [],
      dialogReviews: false,
    };
  },
  created() {
    this.id = parseInt(this.router.params.id);
    this.tvOrMovie = this.router.params.movieOrTv;
    this.getMoreDetails();
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.id = parseInt(this.router.params.id);
        this.tvOrMovie = this.router.params.movieOrTv;
        this.getMoreDetails();
      }
    },
  },
  methods: {
    getMoreDetails() {
      this.loading = true;
      axios
        .get(
          `${import.meta.env.VITE_BASE_URL}/${this.tvOrMovie}/${this.id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR&append_to_response=images,videos,similar,recommendations,reviews,credits&include_image_language=en,null&include_video_language=pt-BR`
        )
        .then((response) => {
          console.log("MoreDetails", response);
          this.nameTitle =
            this.tvOrMovie == "tv" ? response.data.name : response.data.title;
          this.voteAverage = response.data.vote_average.toFixed(1);
          this.backdropPath = response.data.backdrop_path;
          this.posterPath = response.data.poster_path;
          this.genres = response.data.genres;
          this.releaseDate = response.data.release_date;
          this.runtime =
            this.tvOrMovie == "movie"
              ? response.data.runtime
              : response.data.episode_run_time[0];
          this.overview = response.data.overview;
          this.movieBelongsCollection = response.data.belongs_to_collection;
          this.mainCast = response.data.credits.cast;
          this.reviews = response.data.reviews.results;
          this.recommendations = response.data.recommendations.results;
          this.backDrops = response.data.images.backdrops;
          this.logos = response.data.images.logos;
          this.postes = response.data.images.posters;
          this.videos = response.data.videos.results;
          this.numberOfSeasons = response.data.number_of_seasons;
          this.numberOfEpisodes = response.data.number_of_episodes;
          this.inProduction = response.data.in_production;
          this.seasons = response.data.seasons;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eventWatchColection(collectionId) {
      this.collectionId = collectionId;
      setTimeout(() => {
        this.$refs.MoviesCollection.dialog = true;
      }, 100);
    },
    eventWatchProviders() {
      this.$refs.WatchProviders.dialog = true;
    },
    eventEmitEpisodios() {
      this.$refs.Episodios.dialog = true;
    },
    playDialog(video) {
      this.selectPlay = video;
      this.dialogPlay = true;
    },
    goRouter(id, mediaType) {
      setTimeout(() => {
        this.$router.replace({
          name: "Detalhes",
          params: {
            id: id,
            movieOrTv: mediaType,
          },
        });
        // this.$router.go()
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
  },
};
</script>

<style></style>
