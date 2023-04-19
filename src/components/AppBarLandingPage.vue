<template>
  <v-app-bar
    style="backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px)"
    color="rgb(0, 0, 0, 0.0)"
    elevation="0"
    :height="!useDisplay.xs ? '120' : '70'"
  >
    <v-app-bar-title>
      <v-img
        :class="!useDisplay.xs ? 'ml-12' : ''"
        src="@/assets/img/logo.png"
        :max-width="!useDisplay.xs ? '150px' : '80px'"
        min-width="80px"
      ></v-img>
    </v-app-bar-title>

    <template v-slot:append v-if="!useDisplay.xs">
      <v-btn
        class="mr-1"
        variant="outlined"
        rounded="lg"
        color="pink"
        size="large"
        height="40"
        @click="activeSingIn"
        >Entrar</v-btn
      >
      <v-btn
        id="gradient-button"
        class="mr-12"
        dark
        variant="flat"
        rounded="lg"
        size="x-large"
        height="40"
        @click="activeSingUp"
        >Cadastrar</v-btn
      >
    </template>

    <template v-slot:append v-else>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" icon="mdi-menu" size="35"></v-icon>
        </template>

        <v-card rounded="xl">
          <v-card-text>
            <div class="mx-auto text-center">
              <v-btn
                variant="text"
                rounded="lg"
                color="primary"
                @click="activeSingIn"
                >Entrar</v-btn
              >
              <v-divider></v-divider>
              <v-btn
                variant="text"
                rounded="lg"
                color="primary"
                @click="activeSingUp"
                >Cadastrar</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>

  <SingUp ref="SingUp" />
  <SingIn ref="SingIn" />
</template>

<script>
import SingUp from "@/components/SingUp.vue";
import SingIn from "@/components/Sing-In.vue";
import { useDisplay } from "vuetify";

export default {
  components: {
    SingUp,
    SingIn,
  },
  data() {
    return {
      useDisplay: useDisplay(),
    };
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
