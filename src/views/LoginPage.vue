<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mt-15" flat color="transparent">
          <v-container fluid grid-list-lg>
            <v-card-title
              class="pa-0 justify-center white--text font-weight-bold"
            >
              SISTEM TABULASI
            </v-card-title>
            <v-card-title
              class="pa-0 justify-center white--text font-weight-bold"
            >
              HASIL PEMILIHAN CALEG
            </v-card-title>
            <v-card-title
              class="pa-0 justify-center white--text font-weight-bold"
            >
              PARTAI AMANAT NASIONAL
            </v-card-title>
            <v-card-text>
              <v-img
                class="mt-5"
                contain
                src="@/assets/img/partai/pan.png"
                height="214px"
                transition="false"
              ></v-img>
            </v-card-text>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-row align="center" justify="center">
                  <v-col cols="12" class="col-lg-6">
                    <v-text-field
                      v-model="token"
                      class="centered_text_field"
                      placeholder="masukkan token"
                      solo
                      style="border-radius: 10px"
                      :rules="[rules.required]"
                      v-on:keyup.enter="login"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters align="center" justify="center">
                  <v-col cols="12" class="col-lg-6">
                    <v-btn
                      color="secondary"
                      large
                      block
                      style="border-radius: 10px"
                      :disabled="!valid"
                      :loading="btnLoading"
                      @click="login"
                    >
                      Masuk
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="alertSnackbar" timeout="2000" :color="colorSnackbar">
      <strong>{{ textSnackbar }}</strong>
    </v-snackbar>
  </v-container>
</template>
  
  <script>
import { mapActions } from "vuex";
export default {
  name: "LoginPage",

  metaInfo: {
    title: "Tabulasi PAN",
    titleTemplate: "%s - Login",
    htmlAttrs: {
      lang: "id",
      amp: true,
    },
  },

  data: () => ({
    btnLoading: false,
    valid: false,
    token: "",
    rules: {
      required: (value) => !!value || "Tidak boleh kosong !!",
    },
    alertSnackbar: false,
    textSnackbar: "",
    colorSnackbar: "",
  }),

  methods: {
    ...mapActions({
      postLogin: "auth/logIn",
    }),
    login() {
      this.btnLoading = true;
      if (this.valid) {
        this.postLogin({ token: this.token })
          .then((response) => {
            if (response.role === "CAMAT") {
              if (response.absensi) {
                this.$router.replace({
                  name: "dpr_ri",
                });
              } else {
                this.$router.replace({
                  name: "absensi",
                });
              }
            } else {
              this.textSnackbar = "Anda Tidak Dapat Mengakses Halaman Ini";
              this.colorSnackbar = "error";
              this.alertSnackbar = true;
            }
          })
          .catch((e) => {
            this.textSnackbar = e.response.data.message;
            this.colorSnackbar = "error";
            this.alertSnackbar = true;
          })
          .finally(() => {
            this.btnLoading = false;
            this.token = "";
          });
      }
    },
  },
};
</script>