<template>
  <v-app fluid>
    <v-app-bar color="transparent" elevation="0" height="100">
      <v-app-bar-title>
        <v-img
          src="@/assets/img/Multi Plus Streaming.png"
          width="18vw"
          class="ml-5"
        ></v-img>
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn
          class="mr-2 text-h5"
          variant="outlined"
          rounded="lg"
          color="pink"
          width="150px"
          height="50px"
          >Entrar</v-btn
        >
        <v-btn
          class="gradient-button text-h4"
          dark
          variant="flat"
          rounded="lg"
          width="250px"
          height="50px"
          >Cadastrar</v-btn
        >
      </template>
    </v-app-bar>

    <div fluid id="background"></div>
    <v-responsive height="100vh" class="d-flex justify-center align-center">
      <div
        style="
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
          <v-col cols="7" class="text-center">
            <span class="text-h2 font-weight-medium text-white"
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
          width: 50vw;
          height: 70vh;
          top: 220px;
          left: -130px;
          position: absolute;
          background: rgb(0, 0, 0, 0.9);
          filter: blur(50px);
          transition: filter 0.5s ease-in-out;
        "
      ></div>
      <v-responsive>
        <v-row align="start" justify="start">
          <v-col cols="5" class="text-center">
            <span class="text-h2 font-weight-medium text-white"
              >Salve e acompanhe seu <br />
              progresso a cada episódio</span
            >
          </v-col>
        </v-row>
      </v-responsive>
    </v-responsive>

    <v-responsive height="100vh" class="d-flex justify-center align-center">
      <div
        style="
          width: 60vw;
          height: 80vh;
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
          <v-col cols="5" class="text-center">
            <span class="text-h2 font-weight-medium text-white"
              >Veja comentários, <br />resenhas e avaliações</span
            >
          </v-col>
        </v-row>
      </v-responsive>
    </v-responsive>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
#background {
  background-image: url("src/assets/img/Backgroud.png");
  background-size: cover;
  position: absolute;
  filter: brightness(40%);
  height: 100%;
  width: 100%;
}
.gradient-button {
  background: linear-gradient(to right, #8e0336, #fb394f);
  box-shadow: 10px 5px 5px #8e0336;
}
</style>