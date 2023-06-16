<template>
  <v-dialog v-model="dialog" min-width="300" max-width="500" scrim="black">
    <v-card rounded="xl">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar class="gradient mx-2" size="24" color="pink">
          {{ step }}
        </v-avatar>
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
                v$.email.$error
                  ? errorMessage(v$.email.$errors[0].$message)
                  : message
                  ? message
                  : ''
              "
              @keypress.enter="checkForm"
            ></v-text-field>

            <span class="text-caption text-grey-darken-1">
              Este é o e-mail que você usará para acessar sua conta.
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              v-model="password.password"
              label="Password"
              placeholder="**********"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              color="pink"
              @click:append-inner="show1 = !show1"
              :error-messages="
                v$.password.password.$error
                  ? errorMessage(v$.password.password.$errors[0].$message)
                  : ''
              "
              @keypress.enter="checkForm"
            ></v-text-field>

            <v-text-field
              v-model="password.confirm"
              label="Confirm Password"
              placeholder="**********"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              color="pink"
              @click:append-inner="show2 = !show2"
              :error-messages="
                v$.password.confirm.$error
                  ? errorMessage(v$.password.confirm.$errors[0].$message)
                  : ''
              "
              @keypress.enter="checkForm"
            ></v-text-field>
            <span class="text-caption text-grey-darken-1">
              Por favor, insira uma senha para sua conta
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <v-card-text>
            <v-text-field
              v-model="basicInf.name"
              class="mb-2"
              label="Nome completo"
              color="pink"
              :error-messages="
                v$.basicInf.name.$error
                  ? errorMessage(v$.basicInf.name.$errors[0].$message)
                  : ''
              "
              @keypress.enter="checkForm"
            />
            <v-text-field
              v-model="basicInf.age"
              class="mb-2"
              label="Idade"
              color="pink"
              :error-messages="
                v$.basicInf.age.$error
                  ? errorMessage(v$.basicInf.age.$errors[0].$message)
                  : ''
              "
              @keypress.enter="checkForm"
            />
            <v-text-field
              v-model="basicInf.telephone"
              class="mb-2"
              label="Telefone"
              color="pink"
              :error-messages="
                v$.basicInf.telephone.$error
                  ? errorMessage(v$.basicInf.telephone.$errors[0].$message)
                  : ''
              "
              @keypress.enter="checkForm"
            />
            <span class="text-caption text-grey-darken-1">
              Por favor, insira os dados basicos de sua conta
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="4">
          <div class="pa-4 text-center">
            <v-img
              class="mx-auto mb-5"
              src="@/assets/img/logo.png"
              max-width="150px"
              min-width="150px"
            ></v-img>

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

        <v-btn
          v-if="step == 4"
          class="gradient"
          variant="flat"
          @click="steppyFinalize"
        >
          Finalizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
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
      basicInf: {
        name: "",
        age: "",
        telephone: "",
      },
      message: "",
    };
  },
  validations() {
    return {
      email: { required, email },
      password: {
        password: { required },
        confirm: { required, sameAs: sameAs(this.password.password) },
      },
      basicInf: {
        name: { required },
        age: { required },
        telephone: { required },
      },
    };
  },
  watch: {
    dialog(val) {
      if (val === false) {
        this.email = "";
        this.password.password = "";
        this.password.confirm = "";
        this.basicInf.name = "";
        this.basicInf.age = "";
        this.basicInf.telephone = "";
        this.message = "";
      }
    },
  },
  methods: {
    async checkForm() {
      if (this.step == 1) {
        this.v$.email.$validate();
        if (!this.v$.email.$error) {
          try {
            const res = await axios.get(
              `https://nodejs-production-6650.up.railway.app/users?email=${this.email}`
            );

            if (res.data.length === 0) {
              this.step++;
            } else {
              this.message = "Email ja cadastrado";
            }
          } catch (error) {
            this.message = error.response.data.error;
          }
        }
      } else if (this.step == 2) {
        this.v$.password.$validate();
        if (!this.v$.password.$error) {
          this.step++;
        }
      } else if (this.step == 3) {
        this.v$.basicInf.$validate();
        if (!this.v$.basicInf.$error) {
          this.step++;
        }
      }
    },
    errorMessage(message) {
      if (message == "Value is required") return "Valor é requerido";
      if (message == "Value is not a valid email address")
        return "O valor não é um endereço de e-mail válido";
      if (message == "The value must be equal to the other value")
        return "O valor deve ser igual ao outro valor";
    },
    async steppyFinalize() {
      try {
        const resUser = await axios.post(
          "https://nodejs-production-6650.up.railway.app/users",
          {
            email: this.email,
            password: this.password.password,
            password_hash: this.password.confirm,
            name: this.basicInf.name,
            age: this.basicInf.age,
            telephone: this.basicInf.telephone,
          }
        );
        localStorage.setItem("name", resUser.data.name);
        localStorage.setItem("email", resUser.data.email);
        this.$router.push("/inicio");
      } catch (error) {
        console.log(error);
      }
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
