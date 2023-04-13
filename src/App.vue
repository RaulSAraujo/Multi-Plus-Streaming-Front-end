<template>
  <v-app v-if="$route.path == '/'">
    <AppBarLandingPage />
    <router-view />
  </v-app>

  <v-app v-if="$route.path != '/'">
    <AppBarDefaut />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBarLandingPage from "@/components/AppBarLandingPage.vue";
import AppBarDefaut from "@/components/AppBarDefaut.vue";
export default {
  components: {
    AppBarLandingPage,
    AppBarDefaut,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html * {
  font-family: "Yantramanav", sans-serif !important;
}

body {
  margin: 0;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: rgb(0, 0, 0);
  border-radius: 5px;
}
</style>
