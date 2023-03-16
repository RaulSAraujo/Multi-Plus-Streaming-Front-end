<template>
  <v-app>
    <div id="background"></div>

    <v-responsive>
        <v-row justify="center" align="center">
            <v-card title="testesss" subtitle="teste"></v-card>
        </v-row>
      
    </v-responsive>
  </v-app>
</template>

<script setup></script>

<style scoped>
#background {
  background-image: url("src/assets/img/Backgroud.png");
  background-size: cover;
  position: absolute;
  filter: brightness(40%);
  height: 100%;
  width: 100%;
}
</style>
