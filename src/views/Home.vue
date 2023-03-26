<template>
  <div>
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-carousel
          v-model="modelCarousel"
          v-bind="props"
          cycle
          :height="isHovering ? '600' : '300'"
          hide-delimiter-background
          hide-delimiters
          show-arrows="hover"
          :interval="isHovering ? 50000 : 6000"
        >
          <v-carousel-item
            v-for="(movies, index) in moviesUpcoming"
            :key="index"
            :src="`https://image.tmdb.org/t/p/original${
              movies.backdrop_path != null
                ? movies.backdrop_path
                : movies.poster_path
            }`"
            cover
            class="justify-center align-end"
          >
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
              :height="isHovering ? '230px' : '180px'"
              width="100%"
              elevation="0"
              color="rgb(0, 0, 0,0.4)"
              class="mx-auto"
              :title="movies.title"
            >
              <v-card-text>
                <p v-if="isHovering" class="text-body-2">
                  {{ movies.overview }}
                </p>
                <p
                  v-else
                  style="
                    display: -webkit-box;
                    max-width: 100vw;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                  "
                  class="text-body-2"
                >
                  {{ movies.overview }}
                </p>

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
                  >Saiba mais</v-btn
                >
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </template>
    </v-hover>

    <v-card class="mx-auto" elevation="8">
      <h1 class="ml-10 pt-5 mb-n5">Filmes populares</h1>
      <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-grey-darken-3"
        center-active
        show-arrows
      >
        <v-slide-group-item
          v-for="(nowPlay, index) in moviesPopular"
          :key="index"
          v-slot="{ toggle, selectedClass }"
        >
          <v-card
            color="black/80"
            :class="['ma-4', selectedClass]"
            height="220"
            width="270"
            @click="toggle"
          >
            <v-img
              :src="`https://image.tmdb.org/t/p/w300${nowPlay.backdrop_path}`"
              height="120px"
              cover
            ></v-img>

            <v-card-title>
              {{ nowPlay.title }}
            </v-card-title>

            <v-card-subtitle class="mt-n3">
              <v-responsive height="20px" width="100%">
                <div class="text-truncate">
                  {{ nowPlay.overview }}
                </div>
              </v-responsive>
            </v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-icon icon="mdi-menu-down" color="grey" />
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" class="px-10 pb-5">
          <v-card variant="outlined" rounded="xl">
            <v-row no-gutters>
              <v-col cols="12" sm="12" md="3" lg="3" xl="2">
                <v-img
                  :src="`https://image.tmdb.org/t/p/w300${moviesDetails.poster_path}`"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)"
                  cover
                >
                  <v-list-item
                    class="mb-3 text-white"
                    title="Assista agora"
                    subtitle="Stream, Alugar, Comprar"
                    @click="getWatchProviders()"
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
                          >{{ moviesDetails.title }}</span
                        >
                      </v-col>
                      <v-col cols="2" sm="1" md="1" lg="1">
                        <v-avatar
                          color="green"
                          variant="outlined"
                          class="d-none d-md-flex text-body-1"
                        >
                          {{ moviesPopular[model].vote_average }}
                        </v-avatar>

                        <v-avatar
                          color="green"
                          variant="outlined"
                          size="small"
                          class="d-flex d-md-none text-subtitle-2"
                        >
                          {{ moviesPopular[model].vote_average }}
                        </v-avatar>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-subtitle class="mt-n2">
                    <v-row no-gutters>
                      <v-icon icon="mdi-calendar-month" flat></v-icon>

                      <span>
                        {{ formatDate(moviesDetails.release_date) }}
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
                          v-for="(genres, index) in moviesDetails.genres"
                          :key="index"
                          class="px-0"
                        >
                          <span>{{ genres.name }}</span>
                          <span v-if="moviesDetails.genres.length - 1 > index"
                            >,</span
                          >
                        </v-breadcrumbs-item>
                      </v-breadcrumbs>

                      <v-icon icon="mdi-timer-sand" class="ml-1" flat></v-icon>

                      <span>{{ formatRuntime(moviesDetails.runtime) }}m</span>
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
                      {{ moviesDetails.overview }}
                    </p>

                    <v-card
                      v-if="moviesDetails.belongs_to_collection"
                      class="mt-2"
                      rounded="lg"
                    >
                      <v-img
                        :src="`https://image.tmdb.org/t/p/original${moviesDetails.belongs_to_collection.backdrop_path}`"
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
                              moviesDetails.belongs_to_collection.name
                            }}</span>

                            <v-spacer></v-spacer>
                            <v-btn
                              rounded="xl"
                              variant="outlined"
                              flat
                              @click="getWatchColection()"
                              >MOSTRAR A COLETÂNEA</v-btn
                            >
                          </v-row>
                        </v-card-title>
                      </v-img>
                    </v-card>

                    <v-card
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
                        <v-row v-if="movieReview" no-gutters>
                          <p class="text-h6">
                            Resenha de {{ movieReview.author }}
                          </p>
                          <v-spacer></v-spacer>
                          <v-card-subtitle>Veja mais...</v-card-subtitle>
                        </v-row>
                        <p v-else class="text-center text-h5 mt-6">
                          Infelizmente este filme não possui resenhas.
                        </p>
                      </v-card-title>

                      <v-card-text>
                        <p
                          v-if="movieReview"
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
                          {{ movieReview.content }}
                        </p>
                        <v-row v-else justify="center" class="mt-2">
                          <v-icon icon="mdi-emoticon-sad-outline" size="70">
                          </v-icon>
                        </v-row>
                      </v-card-text>
                    </v-card>
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
                          @click="getMoreDetails()"
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
    </v-card>
  </div>

  <v-dialog
    v-model="dialog3"
    width="90vw"
    height="90vh"
    scrim="black"
    scrollable
  >
    <v-sheet rounded="xl" elevation="0">
      <v-img
        class="mb-5"
        :src="`https://image.tmdb.org/t/p/original${movieBackdropPath}`"
        height="320px"
        cover
      >
        <v-card
          class="pa-4"
          height="100%"
          elevation="0"
          color="rgb(0, 0, 0, 0.8)"
        >
          <v-card-title class="text-h4">
            <v-row no-gutters justify="space-between" align="center">
              <v-col cols="10" sm="10" md="11" lg="11">
                <span
                  class="text-h6 text-sm-subtitle-1 text-md-h4 text-lg-h3 text-xl-h3"
                  >{{ movieNameTitle }}</span
                >
              </v-col>
              <v-col cols="2" sm="1" md="1" lg="1">
                <v-avatar
                  color="green"
                  variant="outlined"
                  class="d-none d-md-flex text-body-1"
                >
                  {{ movieVoteAverage }}
                </v-avatar>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle class="mt-n1 text-white">
            <v-row no-gutters>
              <v-icon icon="mdi-calendar-month" flat></v-icon>

              <span>
                {{ formatDate(movieReleaseDate) }}
              </span>

              <v-icon
                icon="mdi-ticket-confirmation-outline"
                class="ml-1"
                flat
              ></v-icon>

              <v-breadcrumbs density="compact" divider="," class="py-0 px-0">
                <v-breadcrumbs-item
                  v-for="(genres, index) in movieGenres"
                  :key="index"
                  class="px-0"
                >
                  <span>{{ genres.name }}</span>
                  <span v-if="movieGenres.length - 1 > index">,</span>
                </v-breadcrumbs-item>
              </v-breadcrumbs>

              <v-icon icon="mdi-timer-sand" class="ml-1" flat></v-icon>

              <span>{{ formatRuntime(movieRuntime) }}m</span>
            </v-row>
          </v-card-subtitle>

          <v-card-text>
            <v-responsive height="10vh">
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
                {{ movieOverview }}
              </p>
            </v-responsive>
          </v-card-text>

          <v-card-actions>
            <v-btn
              class="mt-4 mr-2"
              variant="plain"
              prepend-icon="mdi-play-circle"
              @click="getWatchProviders()"
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
        </v-card>
      </v-img>

      <span class="ml-12 text-h5">Midia</span>
      <v-card elevation="0">
        <v-tabs v-model="tab" class="mx-9">
          <v-tab value="Imagens">Imagens</v-tab>
          <v-tab value="Videos">Videos</v-tab>
          <v-tab value="Pôsteres">Pôsteres</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="Imagens">
              <v-sheet elevation="0" max-width="100%">
                <v-slide-group
                  v-model="modelCreditos"
                  selected-class="bg-success"
                  show-arrows
                >
                  <v-slide-group-item
                    v-for="backdrops in moviesBackDrops"
                    :key="backdrops"
                  >
                    <v-card
                      color="grey-lighten-3"
                      class="ma-4"
                      height="250"
                      width="400"
                    >
                      <v-img
                        :src="`https://image.tmdb.org/t/p/w500${backdrops.file_path}`"
                        height="100%"
                        cover
                      ></v-img>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </v-window-item>
            <v-window-item value="Videos">
              <v-sheet elevation="0" max-width="100%">
                <v-slide-group
                  v-model="modelCreditos"
                  selected-class="bg-success"
                  show-arrows
                >
                  <v-slide-group-item
                    v-for="video in moviesVideos"
                    :key="video"
                  >
                    <v-card
                      color="grey-lighten-3"
                      class="ma-4"
                      width="450"
                      height="250"
                    >
                      <iframe
                        width="450"
                        height="250"
                        :src="`https://www.youtube-nocookie.com/embed/${video.key}`"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                      ></iframe>
                      <!-- <v-img
                        :src="`https://image.tmdb.org/t/p/w300${videos.file_path}`"
                        height="100%"
                        cover
                      ></v-img> -->
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </v-window-item>
            <v-window-item value="Pôsteres">
              <v-sheet elevation="0" max-width="100%">
                <v-slide-group
                  v-model="modelCreditos"
                  selected-class="bg-success"
                  show-arrows
                >
                  <v-slide-group-item
                    v-for="postes in moviesPostes"
                    :key="postes"
                  >
                    <v-card
                      color="grey-lighten-3"
                      class="ma-4"
                      height="250"
                      width="150"
                    >
                      <v-img
                        :src="`https://image.tmdb.org/t/p/w300${postes.file_path}`"
                        height="100%"
                        cover
                      ></v-img>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>

      <span class="ml-12 text-h5">Elenco principal</span>
      <v-sheet class="mx-auto" elevation="0" max-width="100%">
        <v-slide-group
          v-model="modelCreditos"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="cast in movieMainCast"
            :key="cast"
            v-slot="{ toggle, selectedClass }"
          >
            <v-card
              color="grey-lighten-3"
              :class="['ma-4', selectedClass]"
              height="200"
              width="170"
              @click="toggle"
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

      <span class="ml-12 mt-5 text-h5">Reviews</span>
      <v-sheet elevation="0" max-width="100% ">
        <v-slide-group
          v-model="modelCreditos"
          v-if="movieReviews.length > 0"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item v-for="review in movieReviews" :key="review">
            <v-card
              elevation="12"
              width="1150"
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

        <v-card v-else elevation="0">
          <v-card-title class="text-center text-h5"
            >Infelizmente este filme não possui resenhas.</v-card-title
          >
          <v-card-text>
            <v-row justify="center" class="mt-2">
              <v-icon icon="mdi-emoticon-sad-outline" size="70"> </v-icon>
            </v-row>
          </v-card-text>
        </v-card>
      </v-sheet>

      <v-card v-if="movieBelongsCollection" class="my-5">
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
          <v-card-title class="text-white">
            <v-row no-gutters>
              <span class="text-h5">{{ movieBelongsCollection.name }}</span>

              <v-spacer></v-spacer>
              <v-btn
                rounded="xl"
                variant="outlined"
                flat
                @click="getWatchColection()"
                >MOSTRAR A COLETÂNEA</v-btn
              >
            </v-row>
          </v-card-title>
        </v-img>
      </v-card>

      <span class="ml-12 text-h5">Recomendações</span>
      <v-sheet elevation="0" max-width="100%">
        <v-slide-group
          v-model="modelCreditos"
          class="pa-4"
          selected-class="bg-success"
          show-arrows
        >
          <v-slide-group-item
            v-for="recommendation in moviesRecommendations"
            :key="recommendation"
          >
            <v-card
              color="grey-lighten-3"
              class="ma-4"
              height="190"
              width="270"
            >
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${recommendation.backdrop_path}`"
                height="120px"
                cover
              ></v-img>

              <v-card-title>
                {{ recommendation.title }}
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
      </v-sheet>
    </v-sheet>
  </v-dialog>

  <v-dialog
    v-model="dialog2"
    scrollable
    height="70vh"
    width="80vw"
    scrim="black"
  >
    <v-card
      rounded="xl"
      border="sm"
      :image="`https://image.tmdb.org/t/p/original${collectionMovies.backdrop_path}`"
    >
      <v-card-title style="background: rgb(0, 0, 0, 0.9)" class="text-h5 py-4">
        <v-row no-gutters>
          <span class="text-h4"> {{ collectionMovies.name }}</span>
          <v-spacer></v-spacer>
          <v-icon
            icon="mdi-close"
            size="small"
            color="grey"
            @click="dialog2 = false"
          ></v-icon>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-banner
          v-for="parts in collectionMovies.parts"
          :key="parts"
          class="my-4"
          rounded="xl"
          elevation="8"
          border="sm"
          style="background: rgb(0, 0, 0, 0.9)"
        >
          <template v-slot:prepend>
            <v-avatar size="130">
              <v-img
                v-if="parts.poster_path"
                :src="`https://image.tmdb.org/t/p/w200${parts.poster_path}`"
                :alt="parts.title"
                cover
              ></v-img>
              <v-icon v-else icon="mdi-cancel" size="80"></v-icon>
            </v-avatar>
          </template>

          <v-banner-text>
            <p class="text-h6">{{ parts.title }}</p>

            <p class="text-caption-2">
              {{
                parts.release_date != "" ? formatDate(parts.release_date) : ""
              }}
            </p>
            <span class="text-body-1">{{ parts.overview }}</span>
          </v-banner-text>

          <template v-slot:actions>
            <v-btn color="primary" variant="plain">Veja mais</v-btn>
          </template>
        </v-banner>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialog" width="70vw" scrim="black">
    <v-card width="100%" rounded="xl" append-icon="">
      <template v-slot:title>
        <span class="text-h5">{{ moviesDetails.title }} </span>
      </template>

      <template v-slot:subtitle>
        <span
          >está atualmente disponível para ver em Stream ou alugue. Descubra
          onde você pode assistir legalmente seus filmes e séries online.</span
        >
      </template>

      <template v-slot:append>
        <v-btn icon="mdi-close" flat @click="dialog = false"></v-btn>
      </template>

      <v-divider class="my-2"></v-divider>

      <v-card-text v-if="movieProviders" class="pa-5">
        <span class="text-h5">Stream</span>
        <v-row justify="start" no-gutters class="my-3">
          <v-col
            v-for="providers in movieProviders.flatrate"
            :key="providers"
            class="my-1"
            cols="3"
            sm="3"
            md="2"
            lg="1"
          >
            <v-avatar rounded="lg" size="65">
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${providers.logo_path}`"
                :alt="providers.provider_name"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>

        <span class="text-h5">Alugar</span>
        <v-row
          v-if="movieProviders.rent"
          justify="start"
          no-gutters
          class="my-4"
        >
          <v-col
            v-for="providers in movieProviders.rent"
            :key="providers"
            class="my-1"
            cols="3"
            sm="3"
            md="2"
            lg="1"
          >
            <v-avatar rounded="lg" size="65">
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${providers.logo_path}`"
                :alt="providers.provider_name"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <p v-else>Infelizmente este filme não esta disponivel para alugar.</p>

        <span class="text-h5">Comprar</span>
        <v-row
          v-if="movieProviders.buy"
          justify="start"
          no-gutters
          class="my-4"
        >
          <v-col
            v-for="providers in movieProviders.buy"
            :key="providers"
            class="my-1"
            cols="3"
            sm="3"
            md="2"
            lg="1"
          >
            <v-avatar rounded="lg" size="65">
              <v-img
                :src="`https://image.tmdb.org/t/p/w300${providers.logo_path}`"
                :alt="providers.provider_name"
              ></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <p v-else>Infelizmente este filme não esta disponivel para compra.</p>
      </v-card-text>

      <v-card-text v-else>
        <div class="d-flex flex-column justify-center align-center mb-5">
          <v-icon icon="mdi-alert-circle" size="50"></v-icon>
          <p class="text-h6">
            Infelizmente este filme não esta disponivel no Brasil.
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { useLoginStore } from "@/store/LoginStore";
import { useDisplay } from "vuetify";

export default {
  data() {
    return {
      useDisplay: useDisplay(),
      loginStore: useLoginStore(),
      disabled: true,
      modelCarousel: 0,
      model: undefined,
      moviesUpcoming: [],
      moviesPopular: [],
      moviesDetails: [],
      movieProviders: [],
      movieReview: [],
      rating: 3,
      dialog: false,
      dialog2: false,
      collectionMovies: [],
      dialog3: false,
      modelCreditos: undefined,
      modelCreditos2: undefined,

      movieNameTitle: "",
      movieVoteAverage: "",
      movieBackdropPath: "",
      movieGenres: [],
      movieReleaseDate: "",
      movieRuntime: 0,
      movieOverview: "",
      movieBelongsCollection: [],

      movieMainCast: [],
      movieTechnicalTeam: [],
      movieReviews: [],
      moviesRecommendations: [],
      tab: null,
      moviesBackDrops: [],
      moviesLogos: [],
      moviesPostes: [],
      moviesVideos: [],
    };
  },
  created() {
    this.getFilmesLancamentos();
    this.getFilmesPopular();
  },
  watch: {
    model(val) {
      if (val != undefined) {
        this.getDetailsMovies();
      }
    },
  },
  methods: {
    getFilmesLancamentos() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("Lancamentos", response);
          this.moviesUpcoming = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFilmesPopular() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/popular?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&region=BR"
        )
        .then((response) => {
          console.log("Popular", response);
          this.moviesPopular = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetailsMovies() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${
            this.moviesPopular[this.model].id
          }?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&append_to_response=reviews`
        )
        .then((response) => {
          console.log("Detalhes", response);
          this.moviesDetails = response.data;
          this.movieReview = response.data.reviews.results[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getWatchProviders() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${
            this.moviesPopular[this.model].id
          }/watch/providers?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR`
        )
        .then((response) => {
          this.movieProviders = response.data.results.BR;
          this.dialog = true;
          console.log("Providers", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getWatchColection() {
      axios
        .get(
          `https://api.themoviedb.org/3/collection/${this.moviesDetails.belongs_to_collection.id}?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR`
        )
        .then((response) => {
          console.log("Collections", response);
          this.collectionMovies = response.data;
          this.dialog2 = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMoreDetails() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${
            this.moviesPopular[this.model].id
          }?api_key=9f9a623c8918bc56839f26a94b5507aa&language=pt-BR&append_to_response=images,videos,similar,recommendations,reviews,credits&include_image_language=en,null&include_video_language=pt-BR`
        )
        .then((response) => {
          console.log("MoreDetails", response);
          this.dialog3 = true;
          this.movieNameTitle = response.data.title;
          this.movieVoteAverage = response.data.vote_average.toFixed(1);
          this.movieBackdropPath = response.data.backdrop_path;
          this.movieGenres = response.data.genres;
          this.movieReleaseDate = response.data.release_date;
          this.movieRuntime = response.data.runtime;
          this.movieOverview = response.data.overview;
          this.movieBelongsCollection = response.data.belongs_to_collection;
          this.movieMainCast = response.data.credits.cast;
          this.movieTechnicalTeam = response.data.credits.crew;
          this.movieReviews = response.data.reviews.results;
          this.moviesRecommendations = response.data.recommendations.results;
          this.moviesBackDrops = response.data.images.backdrops;
          this.moviesLogos = response.data.images.logos;
          this.moviesPostes = response.data.images.posters;
          this.moviesVideos = response.data.videos.results;
        })
        .catch((error) => {
          console.log(error);
        });
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
  computed: {
    formattedDate() {
      return this.formatDate(this.date);
    },
  },
};
</script>

<style scoped>
</style>