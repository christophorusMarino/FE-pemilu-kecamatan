<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card flat color="transparent">
          <v-card-title class="pa-0">
            <v-card-title
              class="py-0 text-subtitle-1 white--text font-weight-bold"
            >
              INPUT HASIL PEROLEHAN SUARA
            </v-card-title>
            <v-img
              class="ml-auto"
              contain
              :src="`${publicPathPartai}pan.png`"
              height="43px"
              max-width="32px"
              transition="false"
            ></v-img>
          </v-card-title>
          <v-divider class="mt-2"></v-divider>
          <v-card-text class="pa-0 py-2">
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" class="col-lg-6">
                <v-card-title
                  class="py-0 text-caption white--text font-weight-bold"
                >
                  RIAU / {{ dataWilayah?.kabupaten?.toUpperCase() }} /
                  {{ dataWilayah?.kecamatan?.toUpperCase() }}
                </v-card-title>
                <v-card-title
                  class="py-0 text-caption white--text font-weight-bold"
                >
                  {{ dataWilayah?.kelurahan?.toUpperCase() }}
                </v-card-title>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text
            class="py-0"
            style="background-color: yellow; border-radius: 10px"
          >
            <v-card-subtitle
              class="px-0 py-1 pb-0 black--text text-h6 font-weight-bold"
              style="text-align: center"
            >
              - DPR RI / {{ dataDapil?.dapil?.nama?.toUpperCase() }} -
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-form ref="form" v-model="valid">
              <v-row class="mt-1 mb-1">
                <v-col
                  v-for="(item, index) in dataDapil.partai"
                  :key="index"
                  cols="12"
                  class="col-lg-3"
                >
                  <v-card :color="index == flag ? '#2d2f90' : 'green'">
                    <template v-for="(el, idx) in item.calegs">
                      <div
                        v-if="dataSuara"
                        :class="
                          idx > 0
                            ? 'ml-5 d-flex flex-no-wrap justify-space-between'
                            : 'd-flex flex-no-wrap justify-space-between'
                        "
                        :key="idx"
                      >
                        <template
                          v-if="
                            dataSuara[
                              idx === 0
                                ? index
                                : dataDapil.partai.length - 1 + idx
                            ]
                          "
                        >
                          <div>
                            <v-card-title
                              :class="
                                index == flag
                                  ? 'pa-2 pb-0 text-subtitle-2 white--text font-weight-bold'
                                  : 'pa-2 pb-0 text-subtitle-2 black--text font-weight-bold'
                              "
                            >
                              {{
                                `${
                                  idx === 0 ? item.nomor_urut : el.nomor_urut
                                }. ${el.nama}`
                              }}
                            </v-card-title>
                            <v-card-actions class="pt-0 pb-2">
                              <v-text-field
                                v-model="
                                  dataSuara[
                                    idx === 0
                                      ? index
                                      : dataDapil.partai.length - 1 + idx
                                  ].jumlah_suara
                                "
                                class="text-caption font-weight-bold"
                                maxlength="3"
                                full-width
                                dense
                                solo
                                :hint="resolveHint(index, idx)"
                                persistent-hint
                                :rules="[rules.required]"
                                type="number"
                                @keypress="
                                  (e) => {
                                    if (!/\d+/.test(e.key)) {
                                      e.preventDefault();
                                    }
                                  }
                                "
                              ></v-text-field>
                            </v-card-actions>
                          </div>
                          <v-avatar
                            class="ma-1"
                            size="60"
                            tile
                            v-if="idx === 0"
                          >
                            <v-img
                              contain
                              :src="`${publicPathPartai}${el.foto.toLowerCase()}`"
                            ></v-img>
                          </v-avatar>
                          <v-avatar class="ma-1" size="50" v-else>
                            <v-img
                              fill
                              :src="`${publicPathCaleg}${el.foto}`"
                            ></v-img>
                          </v-avatar>
                        </template>
                      </div>
                    </template>
                  </v-card>
                </v-col>
              </v-row>
            </v-form>

            <v-row
              class="py-5"
              no-gutters
              align="center"
              justify="center"
              v-if="dataSuara.length > 0"
            >
              <v-col cols="12" class="col-lg-6 pa-1">
                <v-btn
                  color="secondary"
                  outlined
                  block
                  style="border-radius: 10px"
                  @click="document.getElementById('uploaderAwal').click()"
                >
                  Foto C Hasil Salinan ({{ foto.length }} file)
                  <v-file-input
                    v-model="temp"
                    :rules="[rules.required]"
                    multiple
                    class="d-none"
                    id="uploaderAwal"
                    @change="chooseImage"
                  ></v-file-input>
                </v-btn>
              </v-col>
              <v-col cols="12" class="col-lg-6 pa-1">
                <v-btn
                  :disabled="!valid"
                  color="secondary"
                  block
                  style="border-radius: 10px"
                  :loading="btnLoading"
                  @click="postHasil"
                >
                  Berikutnya
                </v-btn>
              </v-col>
              <v-col cols="12" class="col-lg-6 pa-1">
                <v-btn
                  class="mt-3"
                  color="error"
                  block
                  style="border-radius: 10px"
                  @click="exit"
                >
                  <v-icon left>mdi-logout</v-icon>Keluar
                </v-btn>
              </v-col>
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
import { mapActions, mapGetters } from "vuex";
export default {
  metaInfo: {
    title: "Tabulasi PAN",
    titleTemplate: "%s - DPR RI",
    htmlAttrs: {
      lang: "id",
      amp: true,
    },
  },

  data: () => ({
    document,
    valid: false,
    rules: {
      required: (v) => !!v || "!! Tidak boleh kosong !!"
    },
    publicPathPartai: "img/partai/",
    publicPathCaleg: "img/caleg/",
    dataWilayah: JSON.parse(localStorage.getItem("xrfgthj")),
    flag: 11,
    dataSuara: [],
    foto: [],
    temp: [],
    alertSnackbar: false,
    textSnackbar: "",
    colorSnackbar: "",
    state: "SAVE",
    btnLoading: false,
  }),

  computed: {
    ...mapGetters({
      dataDapil: "dapil/dapilDprRi",
    }),
  },

  methods: {
    ...mapActions({
      getDataDapil: "dapil/getDapilDprRi",
      getHasil: "hasil/getHasilSuara",
      postData: "hasil/postHasilSuara",
      postLogout: "auth/logOut",
    }),
    async getDapil() {
      let queryDapil = {
        wilayah: this.dataWilayah.kode_wilayah.substring(0, 4),
      };
      let queryHasil = {
        uid_wilayah: this.dataWilayah.uid_wilayah,
      };
      await this.getDataDapil(queryDapil)
        .then(() => {
          this.dataDapil.partai.map((el, index) => {
            el.calegs.map((val, idx) => {
              if (idx == 0) {
                this.dataSuara[index] = {
                  caleg: val.uid,
                  jumlah_suara: null,
                  nama: val.nama,
                  uid_partai: el.id,
                };
              } else {
                this.dataSuara[this.dataDapil.partai.length - 1 + idx] = {
                  caleg: val.uid,
                  jumlah_suara: null,
                  nama: val.nama,
                  uid_partai: el.id,
                };
              }
            });
            this.$forceUpdate();
          });
        })
        .catch((e) => {
          this.textSnackbar = "FETCH DATA DAPIL ERROR";
          this.colorSnackbar = "error";
          this.alertSnackbar = true;
        });
      await this.getHasil(queryHasil).then((response) => {
        if (response.data.length > 0) {
          this.dataSuara.forEach((val, index) => {
            let find = response.data.find((obj) => {
              return obj.uid_caleg === val.caleg;
            });
            if (find) {
              this.dataSuara[index].jumlah_suara = find.jumlah_suara;
              this.state = "EDIT";
            } else {
              this.state = "SAVE";
            }
          });
          this.$forceUpdate();
        }
      });
    },
    chooseImage() {
      if (this.temp?.length) {
        this.temp.map((el) => {
          this.foto.unshift({
            url: URL.createObjectURL(el),
            file: el,
            ket: "",
          });
        });
      }
    },
    async postHasil() {
      this.btnLoading = true;
      this.valid = false;
      let timeStamp = new Date().toISOString().replaceAll(":", "-");
      if (this.state == "SAVE") {
        if (this.foto.length > 0) {
          let newFoto = [];
          this.foto.forEach((item, index) => {
            let kode = `C1-${this.dataWilayah.kabupaten}-${
              this.dataWilayah.kecamatan
            }-CAMAT-${index + 1}-${timeStamp}-DPRRI.${item.file.name
              .split(".")
              .pop()}`;
            newFoto.push(
              new File([item.file], kode.toLowerCase(), {
                type: item.file.type,
              })
            );
          });
          const dataSend = new FormData();
          dataSend.append("uid_saksi", this.dataWilayah.uid);
          dataSend.append("uid_wilayah", this.dataWilayah.uid_wilayah);
          dataSend.append("jenis", "DPR RI");
          dataSend.append("suara", JSON.stringify(this.dataSuara));
          newFoto.forEach((el) => {
            dataSend.append("file", el);
          });
          this.post(dataSend);
        } else {
          this.textSnackbar = "Foto C1 Hasil Salinan harus ada !!";
          this.colorSnackbar = "warning";
          this.alertSnackbar = true;
        }
      } else {
        const dataSend = new FormData();
        dataSend.append("uid_saksi", this.dataWilayah.uid);
        dataSend.append("uid_wilayah", this.dataWilayah.uid_wilayah);
        dataSend.append("jenis", "DPR RI");
        dataSend.append("suara", JSON.stringify(this.dataSuara));
        if (this.foto.length > 0) {
          let newFoto = [];
          this.foto.forEach((item, index) => {
            let kode = `C1-${this.dataWilayah.kabupaten}-${
              this.dataWilayah.kecamatan
            }-CAMAT-${index + 1}-${timeStamp}-DPRRI.${item.file.name
              .split(".")
              .pop()}`;
            newFoto.push(
              new File([item.file], kode.toLowerCase(), {
                type: item.file.type,
              })
            );
          });
          newFoto.forEach((el) => {
            dataSend.append("file", el);
          });
        }
        this.post(dataSend);
      }
    },
    post(data) {
      this.postData(data)
        .then((response) => {
          this.textSnackbar = response.message;
          this.colorSnackbar = "success";
          this.alertSnackbar = true;
          this.next();
        })
        .catch((e) => {
          this.textSnackbar = e.response.data.message;
          this.colorSnackbar = "error";
          this.alertSnackbar = true;
        })
        .finally(() => {
          this.btnLoading = false;
          this.foto = [];
          this.temp = [];
          this.getDapil();
        });
    },
    resolveHint(index, idx) {
      if (index === this.flag) {
        if (idx === 0) {
          return "* kolom A1";
        } else {
          return "* kolom A2";
        }
      } else {
        return "* total Suara Parpol + Suara Caleg";
      }
    },
    next() {
      this.$router.replace({
        name: "dprd_prov",
      });
      window.scrollTo({
        top: 0,
        left: 0,
      });
    },
    exit() {
      this.postLogout().then(() => {
        this.$router.replace({
          name: "login",
        });
        window.scrollTo({
          top: 0,
          left: 0,
        });
      });
    },
  },

  created() {
    console.log("DPR RI");
    if (localStorage.getItem("xrfgthj") === null) {
      this.textSnackbar = "Terjadi Kesalahan. Login Ulang !!";
      this.colorSnackbar = "error";
      this.alertSnackbar = true;
      this.$router.replace({
        name: "login",
      });
    } else {
      this.getDapil();
    }
  },
};
</script>