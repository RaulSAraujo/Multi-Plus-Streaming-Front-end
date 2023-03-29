<template>
  <div fluid id="background"></div>

  <v-responsive height="100vh" class="d-flex justify-center align-center">
    <div
      style="
        min-width: 350px;
        width: 50vw;
        height: 80vh;
        top: -400px;
        right: -110px;
        position: absolute;
        background: rgb(0, 0, 0);
        filter: blur(80px);
      "
    ></div>
    <v-responsive>
      <v-row align="center" justify="center">
        <v-col cols="8" class="text-center">
          <span
            class="text-h6 text-sm-h5 text-md-h4 text-lg-h3 text-xl-h2 font-weight-medium text-white"
            style="font-family: 'Yantramanav', sans-serif !important"
            >Seus filmes, séries e livros favoritos <br />
            em um só lugar</span
          >
        </v-col>
      </v-row>
    </v-responsive>
  </v-responsive>

  <v-responsive height="100vh" class="d-flex justify-center align-center">
    <div
      style="
        width: 55vw;
        min-width: 500px;
        height: 70vh;
        top: 120px;
        left: -130px;
        position: absolute;
        background: rgb(0, 0, 0, 0.9);
        filter: blur(80px);
        transition: filter 0.5s ease-in-out;
      "
    ></div>
    <v-responsive>
      <v-row align="start" justify="start">
        <v-col cols="6" class="text-center">
          <span
            class="text-h6 text-sm-h5 text-md-h4 text-lg-h3 text-xl-h2 font-weight-medium text-white"
            style="font-family: 'Yantramanav', sans-serif !important"
            >Salve e acompanhe seu <br />
            progresso a cada episódio</span
          >
          <v-img
            class="mx-auto mt-5"
            src="@/assets/img/icon-1.png"
            width="12vw"
            min-width="80px"
          />
        </v-col>
      </v-row>
    </v-responsive>
  </v-responsive>

  <v-responsive height="100vh" class="d-flex justify-center align-center">
    <div
      style="
        width: 55vw;
        min-width: 500px;
        height: 70vh;
        top: 120px;
        right: -120px;
        position: absolute;
        background: rgb(0, 0, 0);
        filter: blur(80px);
        transition: filter 0.5s ease-in-out;
      "
    ></div>
    <v-responsive>
      <v-row align="center" justify="end">
        <v-col cols="6" class="text-center">
          <span
            class="text-h6 text-sm-h5 text-md-h4 text-lg-h3 text-xl-h2 font-weight-medium text-white"
            style="font-family: 'Yantramanav', sans-serif !important"
            >Veja comentários, <br />resenhas e avaliações</span
          >
          <v-img
            class="mx-auto mt-5"
            src="@/assets/img/icon-2.png"
            width="12vw"
            min-width="80px"
          />
        </v-col>
      </v-row>
    </v-responsive>
  </v-responsive>
</template>

<script>
export default {
  data() {
    return {};
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
