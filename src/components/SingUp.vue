<template>
  <v-dialog v-model="dialog" width="70vw" scrim="black">
    <v-card rounded="xl">
      <v-row class="mt-5" justify="center" no-gutters>
        <v-img
          src="@/assets/img/Novo Cadastro.png"
          cover
          max-width="250px"
          min-width="200px"
        ></v-img>
      </v-row>

      <v-container fluid class="mt-n7">
        <Steppy
          v-model:step="step"
          class="ma-0 pt-8 pb-0"
          :tabs="tabs"
          backText="Voltar"
          nextText="Proximo"
          primaryColor1="#fb394f"
          :finalize="steppyFinalize"
        >
          <template #1>
            <div ref="form1">
              <p class="text-h6 text-left">E-mail:</p>
              <v-text-field
                ref="email"
                v-model="email"
                :rules="[() => !!email || 'Este campo é obrigatorio']"
                label="Digite seu e-mail..."
                density="compact"
                variant="outlined"
                bg-color="white"
                single-line
                color="pink"
                required
              />

              <p class="text-h6 text-left">Senha:</p>
              <v-text-field
                ref="password"
                v-model="password"
                :rules="[() => !!password || 'Este campo é obrigatorio']"
                label="Digite seu senha..."
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                bg-color="white"
                single-line
                color="pink"
                required
                @click:append-inner="show1 = !show1"
              />

              <p class="text-h6 text-left">Confirme sua senha:</p>
              <v-text-field
                ref="ConfirmPassword"
                v-model="ConfirmPassword"
                :rules="[() => !!ConfirmPassword || 'Este campo é obrigatorio']"
                label="Confirme sua senha..."
                :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                bg-color="white"
                single-line
                color="pink"
                required
                @click:append-inner="show2 = !show2"
                @blur="checkForm"
              />
            </div>
          </template>

          <template #2>
            <p class="text-h6 text-truncate text-left">Nome completo:</p>
            <v-text-field
              label="Digite seu nome..."
              density="compact"
              variant="outlined"
              bg-color="white"
              single-line
              color="pink"
            />

            <p class="text-h6 text-truncate text-left">Telefone:</p>
            <v-text-field
              label="Digite seu telefone..."
              density="compact"
              variant="outlined"
              bg-color="white"
              single-line
              color="pink"
            />

            <p class="text-h6 text-truncate text-left">Idade:</p>
            <v-text-field
              label="Digite sua idade..."
              density="compact"
              variant="outlined"
              bg-color="white"
              single-line
              color="pink"
            />

            <p class="text-h6 text-truncate text-left">Cidade:</p>
            <v-text-field
              label="Digite sua cidade..."
              density="compact"
              variant="outlined"
              bg-color="white"
              single-line
              color="pink"
            />
          </template>

          <template #3>
            <p class="text-h6 text-center">Cadastro realizado com sucesso</p>
          </template>
        </Steppy>
      </v-container>

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
        {
          title: "E-mail e senha",
          iconSuccess: null,
          isValid: this.formHasErrors,
        },
        {
          title: "informações básicas",
          iconSuccess: null,
          isValid: this.formHasErrors,
        },
        { title: "Obrigado", iconSuccess: null, isValid: true },
      ],
      show1: false,
      show2: false,
      email: "",
      password: "",
      ConfirmPassword: "",
      formHasErrors: false,
    };
  },
  computed: {
    form1() {
      return {
        email: this.email,
        password: this.password,
        confirm_password: this.ConfirmPassword,
      };
    },
  },
  methods: {
    checkForm() {
      this.formHasErrors = false;

      Object.keys(this.form1).forEach((f) => {
        if (!this.form1[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
    },
    steppyFinalize() {
      console.log("Finalizado");
    },
  },
};
</script>

<style scoped>
#gradient-button {
  background: linear-gradient(to right, #8e0336, #fb394f);
}
</style>
