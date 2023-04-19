<template>
  <div fluid id="background"></div>

  <v-responsive height="100vh" class="d-flex justify-center align-center">
    <v-row no-gutters align="center" justify="center">
      <v-card color="rgb(0,0,0,0)" :width="!useDisplay.xs ? '50%' : '90%'">
        <v-card-title class="text-center">
          <p
            class="text-h5 text-sm-h5 text-md-h5 text-lg-h4 text-xl-h2 font-weight-medium text-white"
            style="font-family: 'Yantramanav', sans-serif !important"
          >
            Seus filmes, séries e livros
          </p>
          <p
            class="text-h5 text-sm-h5 text-md-h5 text-lg-h4 text-xl-h2 font-weight-medium text-white"
            style="font-family: 'Yantramanav', sans-serif !important"
          >
            em um só lugar
          </p>
        </v-card-title>
      </v-card>
    </v-row>
  </v-responsive>

  <v-responsive height="100vh" class="d-flex justify-center align-center">
    <div
      :style="
        !useDisplay.xs
          ? 'width: 45vw;min-width: 350px;max-height: 400px;min-height: 350px;top: 260px;left: -120px;position: absolute;background: rgb(0, 0, 0);filter: blur(80px);'
          : 'width: 450px;min-width: 350px;max-height: 400px;min-height: 360px;top: 280px;left: -120px;position: absolute;background: rgb(0, 0, 0);filter: blur(80px);'
      "
    ></div>
    <v-row no-gutters align="center" justify="start">
      <v-card color="rgb(0,0,0,0)" :width="!useDisplay.xs ? '35%' : '70%'">
        <v-card-title class="text-center">
          <p
            class="text-h5 text-sm-h5 text-md-h5 text-lg-h4 text-xl-h2 font-weight-medium text-white"
            style="font-family: 'Yantramanav', sans-serif !important"
          >
            Salve e acompanhe seu
          </p>
          <p
            class="text-h5 text-sm-h5 text-md-h5 text-lg-h4 text-xl-h2 font-weight-medium text-white"
            style="font-family: 'Yantramanav', sans-serif !important"
          >
            progresso a cada episódio
          </p>
        </v-card-title>
        <v-img
          class="mx-auto mt-5"
          src="@/assets/img/icon-1.png"
          height="100"
          :width="!useDisplay.xs ? '12vw' : '100'"
          min-width="80px"
        >
        </v-img>
      </v-card>
    </v-row>
  </v-responsive>

  <v-responsive height="100vh" class="d-flex justify-center align-center">
    <div
      :style="
        !useDisplay.xs
          ? 'width: 45vw;min-width: 350px;max-height: 400px;min-height: 350px;top: 260px;right: -120px;position: absolute;background: rgb(0, 0, 0);filter: blur(80px);'
          : 'width: 450px;min-width: 350px;max-height: 400px;min-height: 350px;top: 280px;right: -120px;position: absolute;background: rgb(0, 0, 0);filter: blur(80px);'
      "
    ></div>
    <v-row no-gutters align="center" justify="end">
      <v-card color="rgb(0,0,0,0)" :width="!useDisplay.xs ? '35%' : '70%'">
        <v-card-title class="text-center">
          <p
            class="text-h5 text-sm-h5 text-md-h5 text-lg-h4 text-xl-h2 font-weight-medium text-white"
            style="font-family: 'Yantramanav', sans-serif !important"
          >
            Veja comentários
          </p>
          <p
            class="text-h5 text-sm-h5 text-md-h5 text-lg-h4 text-xl-h2 font-weight-medium text-white"
            style="font-family: 'Yantramanav', sans-serif !important"
          >
            resenhas e avaliações
          </p>
        </v-card-title>
        <v-img
          class="mx-auto mt-5"
          src="@/assets/img/icon-2.png"
          height="100"
          :width="!useDisplay.xs ? '12vw' : '100'"
          min-width="80px"
        >
        </v-img>
      </v-card>
    </v-row>
  </v-responsive>
</template>

<script>
import { useDisplay } from "vuetify";
export default {
  data() {
    return {
      useDisplay: useDisplay(),
    };
  },
  created(){
  },
  methods: {},
};
</script>

<style scoped>
#background {
  background-image: url("@/assets/img/Backgroud.png");
  background-size: cover;
  position: absolute;
  filter: brightness(40%);
  height: 100%;
  width: 100%;
}
</style>
