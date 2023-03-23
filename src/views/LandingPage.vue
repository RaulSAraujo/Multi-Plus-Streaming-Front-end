<template>
  <v-app fluid>
    <v-app-bar
      style="
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      "
      color="rgb(0, 0, 0, 0.3)"
      elevation="5"
      height="70"
    >
      <v-app-bar-title>
        <v-img
          src="@/assets/img/Multi Plus Streaming.png"
          max-width="350px"
          min-width="200px"
        ></v-img>
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn
          class="mr-2 text-sm-body-1 text-md-h7 text-lg-h6 text-xl-h5"
          variant="outlined"
          rounded="lg"
          color="pink"
          width="8vw"
          min-width="80px"
          height="45px"
          @click="activeSingIn"
          >Entrar</v-btn
        >
        <v-btn
          id="gradient-button"
          class="text-sm-body-1 text-md-h6 text-lg-h5 text-xl-h4"
          dark
          variant="flat"
          rounded="lg"
          width="14vw"
          min-width="100px"
          height="45px"
          @click="activeSingUp"
          >Cadastrar</v-btn
        >
      </template>
    </v-app-bar>

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
              class="text-sm-h5 text-md-h4 text-lg-h3 text-xl-h2 font-weight-medium text-white"
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
              class="text-sm-h5 text-md-h4 text-lg-h3 text-xl-h2 font-weight-medium text-white"
              >Salve e acompanhe seu <br />
              progresso a cada episódio</span
            >
            <v-img class="mx-auto mt-5" src="@/assets/img/icon-1.png" width="12vw" />
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
              class="text-sm-h5 text-md-h4 text-lg-h3 text-xl-h2 font-weight-medium text-white"
              >Veja comentários, <br />resenhas e avaliações</span
            >
            <v-img class="mx-auto mt-5" src="@/assets/img/icon-2.png" width="12vw" />
          </v-col>
        </v-row>
      </v-responsive>
    </v-responsive>

    <SingUp ref="SingUp" />
    <SingIn ref="SingIn" />
  </v-app>
</template>

<script>
import SingUp from "@/components/SingUp.vue";
import SingIn from "@/components/Sing-In.vue";
export default {
  components: {
    SingUp,
    SingIn,
  },
  data() {
    return {};
  },
  methods: {
    activeSingUp() {
      this.$refs.SingUp.dialog = true;
    },
    activeSingIn() {
      this.$refs.SingIn.dialog = true;
    },
  },
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
#gradient-button {
  background: linear-gradient(to right, #8e0336, #fb394f);
}
</style>
