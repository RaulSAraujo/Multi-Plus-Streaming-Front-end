<template>
  <v-dialog v-model="dialog" width="50vw" scrim="black">
    <v-card rounded="xl">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar
          class="gradient mx-2"
          size="24"
          color="pink"
          v-text="step"
        ></v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              v-model="email"
              label="E-mail"
              placeholder="john@google.com"
              color="pink"
              :error-messages="
                v$.email.$error ? v$.email.$errors[0].$message : ''
              "
            ></v-text-field>
            <span class="mt-4 text-caption text-grey-darken-1">
              Este é o e-mail que você usará para acessar sua conta.
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              v-model="password.password"
              label="Password"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              color="pink"
              @click:append-inner="show1 = !show1"
              :error-messages="
                v$.password.password.$error
                  ? v$.password.password.$errors[0].$message
                  : ''
              "
            ></v-text-field>

            <v-text-field
              v-model="password.confirm"
              label="Confirm Password"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              color="pink"
              @click:append-inner="show2 = !show2"
              :error-messages="
                v$.password.confirm.$error
                  ? v$.password.confirm.$errors[0].$message
                  : ''
              "
            ></v-text-field>
            <span class="text-caption text-grey-darken-1">
              Por favor, insira uma senha para sua conta
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <v-card-text>
            <v-text-field label="Nome completo" color="pink" />
            <v-text-field label="Idade" color="pink" />
            <v-text-field label="Região" color="pink" />
            <span class="text-caption text-grey-darken-1">
              Por favor, insira os dados basicos de sua conta
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="4">
          <div class="pa-4 text-center">
            <h3 class="text-h6 font-weight-light mb-2">Bem-vindo</h3>
            <span class="text-caption text-grey"
              >Obrigado por inscrever-se!</span
            >
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions class="mx-5">
        <v-btn v-if="step > 1" variant="text" @click="step--"> Voltar </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="step < 4"
          class="gradient"
          variant="flat"
          @click="checkForm"
        >
          Proximo
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      dialog: false,
      step: undefined,
      show1: false,
      show2: false,
      email: "",
      password: {
        password: "",
        confirm: "",
      },

    };
  },
  validations() {
    return {
      email: { required, email },
      password: {
        password: { required },
        confirm: { required, sameAs: sameAs(this.password.password) },
      },
    };
  },
  methods: {
    checkForm() {
      this.v$.$validate();
      if (this.step == 1) {
        if (!this.v$.email.$error) {
          this.v$.password.$reset();
          this.step++;
        }
      } else if (this.step == 2) {
        if (!this.v$.password.$error) {
          this.step++;
        }
      }
    },
    steppyFinalize() {
      console.log("Finalizado");
    },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Insira seu E-mail";
        case 2:
          return "Criar uma senha";
        case 3:
          return "Dados basicos";
        default:
          return "Conta criada";
      }
    },
  },
};
</script>

<style scoped>
.gradient {
  background: linear-gradient(to right, #8e0336, #fb394f);
}
</style>
