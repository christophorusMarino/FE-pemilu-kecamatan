<template>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card flat color="transparent">
            <v-card-title class="pa-2">
              <v-img
                class="ml-auto"
                contain
                src="@/assets/img/partai/pan.png"
                height="43px"
                max-width="32px"
                transition="false"
              ></v-img>
            </v-card-title>
            <v-card-text class="mt-15">
              <v-row align="center" justify="center">
                <v-col cols="12" class="col-lg-6">
                  <v-card-title
                    class="text-subtitle-1 white--text front-weight-bold"
                  >
                    Selamat datang,
                  </v-card-title>
                  <v-card-title
                    class="py-0 text-subtitle-1 white--text front-weight-bold"
                  >
                    Sebelum memulai pengisian, anda harus melakukan absensi
                    terlebih dahulu.
                  </v-card-title>
                  <v-card-title
                    class="pt-2 pb-0 text-subtitle-1 white--text front-weight-bold"
                  >
                    Tekan tombol “ABSENSI”
                  </v-card-title>
                  <v-card-title
                    class="py-0 text-subtitle-1 white--text front-weight-bold"
                  >
                    untuk mengkonfirmasi kehadiran anda
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text class="mt-5">
              <v-row no-gutters align="center" justify="center">
                <v-btn
                  color="secondary"
                  large
                  block
                  style="border-radius: 10px"
                  :loading="btnLoading"
                  @click="document.getElementById('uploadFoto').click()"
                >
                  Absensi
                  <v-file-input
                    v-model="foto"
                    class="d-none"
                    id="uploadFoto"
                    accept="image/png, image/jpeg, image/jpg, image/bmp"
                    @change="absensi"
                  ></v-file-input>
                </v-btn>
              </v-row>
            </v-card-text>
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
    name: "AbsensiPage",
  
    metaInfo: {
      title: "Tabulasi PAN",
      titleTemplate: "%s - Absensi",
      htmlAttrs: {
        lang: "id",
        amp: true,
      },
    },
  
    data: () => ({
      document,
      btnLoading: false,
      lat: null,
      long: null,
      foto: null,
      alertSnackbar: false,
      textSnackbar: "",
      colorSnackbar: "",
    }),
  
    methods: {
      ...mapActions({
        postAbsensi: "auth/absensi",
      }),
      absensi() {
        this.btnLoading = true;
        if (this.foto) {
          let dataUser = JSON.parse(localStorage.getItem("xrfgthj"));
          let idUser = dataUser.uid;
          let kode =
            dataUser.kelurahan +
            " TPS" +
            dataUser.nomor +
            "." +
            this.foto.name.split(".").pop();
          const fotoSend = new File([this.foto], kode, {
            type: "image/jpeg",
          });
          const dataSend = new FormData();
          dataSend.append("foto", fotoSend);
          dataSend.append("lokasi", `${this.lat} ${this.long}`);
          const payload = { idUser: idUser, data: dataSend };
          this.postAbsensi(payload)
            .then((response) => {
              if (response.status === 200) {
                this.$router.replace({
                  name: "dpr_ri",
                });
              }
            })
            .catch((e) => {
              this.textSnackbar = e;
              this.colorSnackbar = "error";
              this.alertSnackbar = true;
              this.btnLoading = false;
            })
            .finally(() => {
              this.btnLoading = false;
            });
        } else {
          this.textSnackbar = "Foto selfie tidak terbaca !!";
          this.colorSnackbar = "error";
          this.alertSnackbar = true;
          this.btnLoading = false;
        }
      },
    },
  
    mounted: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
        });
      }
    },
  };
  </script>