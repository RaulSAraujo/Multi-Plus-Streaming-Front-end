<template>
  <v-dialog v-model="dialog" width="70vw" scrim="black">
    <v-card rounded="xl">
      <v-card-title>
        <v-row justify="center" no-gutters>
          <v-img
            src="@/assets/img/Novo Cadastro.png"
            cover
            max-width="20vw"
            min-width="200px"
          ></v-img>
        </v-row>
      </v-card-title>
      <v-card-text>
        <Steppy
          v-model:step="step"
          :tabs="tabs"
          backText="Voltar"
          nextText="Proximo"
          primaryColor1="red"
          primaryColor2="pink"
          :finalize="steppyFinalize"
        >
          <template #1>
            <span class="text-h6">Seu nome:</span>
            <v-text-field
              label="Digite seu nome..."
              density="compact"
              variant="outlined"
              bg-color="white"
              single-line
            />
            <span class="text-h6">E-mail:</span>
            <v-text-field
              label="Digite seu e-mail..."
              density="compact"
              variant="outlined"
              bg-color="white"
              single-line
            />
            <span class="text-h6">Confirme seu E-mail:</span>
            <v-text-field
              label="Confirme seu e-mail..."
              density="compact"
              variant="outlined"
              bg-color="white"
              single-line
            />
          </template>
          <template #2
            ><span class="text-h6">Senha:</span>
            <v-text-field
              label="Digite seu senha..."
              density="compact"
              variant="outlined"
              bg-color="white"
              single-line />
            <span class="text-h6">Confirme sua senha:</span>
            <v-text-field
              label="Confirme sua senha..."
              density="compact"
              variant="outlined"
              bg-color="white"
              single-line
          /></template>
        </Steppy>
      </v-card-text>
      <!-- <v-card-actions>
        <v-row justify="center" class="my-2">
          <v-btn
            id="gradient-button"
            class="text-sm-body-1 text-md-h6 text-lg-h5 text-xl-h4"
            dark
            variant="flat"
            rounded="lg"
            width="14vw"
            min-width="100px"
            height="50px"
            @click="activeSingIn"
            >Proximo</v-btn
          >
        </v-row>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { Steppy } from "vue3-steppy";
export default {
  components: {
    Steppy,
  },
  data() {
    return {
      dialog: false,
      step: undefined,
      tabs: [
        { title: "teste", iconSuccess: null, isValid: true },
        { title: "teste2", iconSuccess: null, isValid: true },
      ],
    };
  },
  methods: {
    steppyFinalize() {
      console.log("Finalizado");
    },
  },
};
</script>

<style lang="scss" scoped>
#gradient-button {
  background: linear-gradient(to right, #8e0336, #fb394f);
}
</style>
