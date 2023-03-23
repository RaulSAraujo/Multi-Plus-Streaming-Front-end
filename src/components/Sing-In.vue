<template>
  <v-dialog v-model="dialog" width="40vw" scrim="black">
    <v-card class="pa-5" rounded="xl">
      <v-card-title class="text-center text-h5">
        <v-img
          class="mx-auto mb-5"
          src="@/assets/img/Multi Plus Streaming.png"
          max-width="350px"
          height="50px"
          min-width="150px"
        ></v-img>
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
      <v-row no-gutters>
        <v-btn
          id="gradient-button"
          class="mx-12 text-sm-body-1 text-md-h6 text-lg-h5 text-xl-h4 mx-8 mb-5"
          dark
          variant="flat"
          rounded="lg"
          block
          min-width="50px"
          height="40px"
          >LOGIN</v-btn
        >
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
      email: "",
      password: "",
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
