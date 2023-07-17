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
          @keypress.enter="login"
          color="pink"
        />
        <v-row class="my-1" align="center" justify="center">
          <span class="text-pink">{{ message }}</span>
        </v-row>
      </v-card-text>
      <v-row no-gutters class="px-12 mb-5">
        <v-btn
          id="gradient-button"
          dark
          variant="flat"
          rounded="lg"
          block
          size="large"
          @click="login"
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
      message: "",
    };
  },
  watch: {
    dialog(val) {
      if (val === false) {
        this.email = "";
        this.password = "";
        this.message = "";
      }
    },
  },
  methods: {
    async login() {
      try {
        const resUser = await axios.post(
          "https://nodejs-production-6650.up.railway.app/session",
          {
            email: this.email,
            password: this.password,
          }
        );

        localStorage.setItem("name", resUser.data.name);
        localStorage.setItem("email", resUser.data.email);
        this.$router.push("/inicio");
      } catch (error) {
        this.message = error.response.data.error;
      }
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
