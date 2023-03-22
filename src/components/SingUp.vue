<template>
  <v-dialog v-model="dialog" width="50vw" scrim="black">
    <v-card rounded="xl">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar class="gradient mx-2" size="24" v-text="step"></v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field label="Email" placeholder="john@google.com"></v-text-field>
            <span class="text-caption text-grey-darken-1">
              Este é o e-mail que você usará para acessar sua conta.
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field label="Password" type="password"></v-text-field>
            <v-text-field label="Confirm Password" type="password"></v-text-field>
            <span class="text-caption text-grey-darken-1">
              Por favor, insira uma senha para sua conta
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img class="mb-4" contain height="128" src="https://cdn.vuetifyjs.com/images/logos/v.svg"></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Bem-vindo
            </h3>
            <span class="text-caption text-grey">Obrigado por inscrever-se!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn v-if="step > 1" variant="text" @click="step--">
          Voltar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="step < 3" class="gradient" variant="flat" @click="step++">
          Proximo
        </v-btn>
      </v-card-actions>

      <!-- <Steppy v-model:step="step" class="ma-0 pt-8" :tabs="tabs" backText="Voltar" nextText="Proximo"
          primaryColor1="#fb394f" :finalize="steppyFinalize">
          <template #1 >
            <div ref="form1">
              <v-text-field v-model="email" :rules="[() => !!email || 'Este campo é obrigatorio']" label="E-mail"
                placeholder="Digite seu e-mail..." persistent-placeholder density="compact" variant="outlined"
                bg-color="white" color="pink" required />

              <v-text-field v-model="password.password" :rules="[() => !!password || 'Este campo é obrigatorio']"
                label="Senha" placeholder="Digite seu senha..." persistent-placeholder
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                density="compact" variant="outlined" bg-color="white" color="pink" required
                @click:append-inner="show1 = !show1" />

              <v-text-field ref="ConfirmPassword" v-model="password.confirm"
                :rules="[() => !!ConfirmPassword || 'Este campo é obrigatorio']" label="Confirme sua senha..."
                placeholder="Repita sua senha..." persistent-placeholder
                :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'"
                density="compact" variant="outlined" bg-color="white" color="pink" required
                @click:append-inner="show2 = !show2" @blur="checkForm" />

            </div>
          </template>

          <template #2>
            <p class="text-h6 text-truncate text-left">Nome completo:</p>
            <v-text-field label="Digite seu nome..." density="compact" variant="outlined" bg-color="white" single-line
              color="pink" />

            <p class="text-h6 text-truncate text-left">Telefone:</p>
            <v-text-field label="Digite seu telefone..." density="compact" variant="outlined" bg-color="white" single-line
              color="pink" />

            <p class="text-h6 text-truncate text-left">Idade:</p>
            <v-text-field label="Digite sua idade..." density="compact" variant="outlined" bg-color="white" single-line
              color="pink" />

            <p class="text-h6 text-truncate text-left">Cidade:</p>
            <v-text-field label="Digite sua cidade..." density="compact" variant="outlined" bg-color="white" single-line
              color="pink" />
          </template>

          <template #3>
            <p class="text-h6 text-center">Cadastro realizado com sucesso</p>
          </template>
        </Steppy> -->


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
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  components: {
    Steppy,
  },
  data() {
    return {
      v$: useValidate(),
      dialog: false,
      step: undefined,
      tabs: [
        {
          title: "E-mail e senha",
          iconSuccess: null,
          isValid: false,
        },
        {
          title: "informações básicas",
          iconSuccess: null,
          isValid: false,
        },
        { title: "Obrigado", iconSuccess: null, isValid: true },
      ],
      show1: false,
      show2: false,
      email: "",
      password: {
        password: "",
        confirm: "",
      },
      formHasErrors: false,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: {
        password: { required },
        confirm: { required },
      },
    };
  },
  methods: {
    checkForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.tabs[0].isValid = true;
      } else {
        this.tabs[0].isValid = false;
      }
    },
    steppyFinalize() {
      console.log("Finalizado");
    },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1: return 'Inscrever-se'
        case 2: return 'Criar uma senha'
        default: return 'Conta criada'
      }
    },
  }
};
</script>

<style scoped>
.gradient {
  background: linear-gradient(to right, #8e0336, #fb394f);
}
</style>
