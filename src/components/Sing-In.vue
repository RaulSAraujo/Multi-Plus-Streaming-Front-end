<template>
  <v-dialog v-model="dialog" width="40vw" scrim="black">
    <v-card class="pa-5" rounded="xl">
      <v-card-title class="text-center text-h5">Entrar no <strong class="text-h3 text-pink">M</strong>ulti
        <strong class="text-h3 text-pink">P</strong>lus
        <strong class="text-h3 text-pink">S</strong>treaming
      </v-card-title>
      <v-card-text>
        <p class="text-h6 text-left">E-mail:</p>
        <v-text-field label="Digite seu e-mail..." density="compact" variant="outlined" bg-color="white" single-line
          color="pink" />

        <p class="text-h6 text-left">Senha:</p>
        <v-text-field label="Digite seu senha..." :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'" @click:append-inner="show1 = !show1" density="compact" variant="outlined"
          bg-color="white" single-line color="pink" />
      </v-card-text>
      <v-row no-gutters>
        <v-btn id="gradient-button" class="text-sm-body-1 text-md-h6 text-lg-h5 text-xl-h4 mx-8 mb-5" dark variant="flat"
          rounded="lg" block min-width="100px" height="40px" @click="activeSingIn">LOGIN</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      show1: false,
    };
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

#gradient-button {
  background: linear-gradient(to right, #8e0336, #fb394f);
}
</style>
