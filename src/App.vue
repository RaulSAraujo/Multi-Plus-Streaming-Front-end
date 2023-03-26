<template>
  <v-app v-if="$route.path == '/'">
    <AppBarLandingPage />
    <router-view />
  </v-app>

  <v-app v-if="$route.path != '/'">
    <v-main>
      <AppBarDefaut />
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
html * {
  font-family: "Yantramanav", sans-serif !important;
}

html,
body {
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
}
::-webkit-scrollbar {
  width: 0px;
  height: 15px;
}

.dark ::-webkit-scrollbar-track {
  background-color: rgba(94, 94, 94, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 6px;
  border-radius: 6px;
  margin: 5px;
}
.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(94, 93, 93, 0.2);
  border-radius: 6px;
}
.dark ::-webkit-scrollbar-thumb:hover {
  background-color: rgba(94, 93, 93, 0.4);
}

.light ::-webkit-scrollbar-track {
  background-color: rgba(94, 94, 94, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 6px;
  border-radius: 6px;
  margin: 5px;
}
.light ::-webkit-scrollbar-thumb {
  background-color: rgba(94, 93, 93, 0.2);
  border-radius: 6px;
}
.light ::-webkit-scrollbar-thumb:hover {
  background-color: rgba(94, 93, 93, 0.4);
}
</style>
