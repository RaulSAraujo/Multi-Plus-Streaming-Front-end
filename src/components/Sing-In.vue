<template>
  <v-dialog v-model="dialog" min-width="300" max-width="380" scrim="black">
    <v-card class="pa-5" rounded="xl">
      <v-card-title class="text-center text-h5">
        <v-img
          class="mx-auto mb-2"
          src="@/assets/img/logo.png"
          height="80px"
        ></v-img>
        <p class="text-subtitle-1 text-sm-h6 text-md-h6 text-lg-h6 text-xl-h6">
          Entrar no Multi Plus Streaming
        </p>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          label="E-mail"
          placeholder="john@google.com"
          color="pink"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          placeholder="**********"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append-inner="show1 = !show1"
          color="pink"
        />
      </v-card-text>
      <v-row no-gutters class="px-12 mb-5">
        <v-btn
          id="gradient-button"
          dark
          variant="flat"
          rounded="lg"
          block
          size="large"
          to="/Inicio"
          @click="getToken"
          >LOGIN</v-btn
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      show1: false,
      email: "",
      password: "",
    };
  },
  methods: {
    getToken() {
      axios
        .get(
          "https://api.themoviedb.org/3/authentication/token/new?api_key=9f9a623c8918bc56839f26a94b5507aa"
        )
        .then((response) => {
          console.log("token", response);
          localStorage.setItem("jwt", response.data.request_token);
        })
        .catch((error) => {
          console.log(error);
        });
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
