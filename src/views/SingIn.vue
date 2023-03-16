<template>
  <v-app>
    <div fluid id="background"></div>

    <v-row justify="center" align="center">
      <v-card width="60vw" class="pa-5" rounded="xl">
        <v-card-title class="text-center">Entrar no Multi plus Streaming</v-card-title>
        <v-card-text>
          <p class="text-h6 text-left">E-mail:</p>
          <v-text-field label="Digite seu e-mail..." density="compact" variant="outlined" bg-color="white" single-line
            color="pink" />

          <p class="text-h6 text-left">Senha:</p>
          <v-text-field label="Digite seu senha..." density="compact" variant="outlined" bg-color="white" single-line
            color="pink" />

        </v-card-text>
        <v-row no-gutters>
          <v-btn id="gradient-button" class="text-sm-body-1 text-md-h6 text-lg-h5 text-xl-h4 mx-8 mb-5" dark
            variant="flat" rounded="lg" block min-width="100px" height="35px" @click="activeSingIn">login</v-btn>
        </v-row>
      </v-card>
    </v-row>


  </v-app>
</template>

<script></script>

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
