<template>
  <v-app-bar
    style="backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px)"
    color="rgb(0, 0, 0, 0.0)"
    elevation="0"
    height="120"
  >
    <v-app-bar-title>
      <v-img
        class="ml-12"
        src="@/assets/img/logo.png"
        max-width="150px"
        min-width="150px"
      ></v-img>
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn
        class="mr-1 text-sm-body-1 text-md-h7 text-lg-h6 text-xl-h5"
        variant="outlined"
        rounded="lg"
        color="pink"
        width="8vw"
        min-width="80px"
        height="50px"
        @click="activeSingIn"
        >Entrar</v-btn
      >
      <v-btn
        id="gradient-button"
        class="mr-12 text-sm-body-1 text-md-h6 text-lg-h5 text-xl-h4"
        dark
        variant="flat"
        rounded="lg"
        width="14vw"
        min-width="100px"
        height="50px"
        @click="activeSingUp"
        >Cadastrar</v-btn
      >
    </template>
  </v-app-bar>

  <SingUp ref="SingUp" />
  <SingIn ref="SingIn" />
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
#gradient-button {
  background: linear-gradient(to right, #8e0336, #fb394f);
}
</style>