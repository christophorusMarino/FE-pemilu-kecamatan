import axios from "axios";
import { resolveQueryParams } from '@/utils/helper'

export default {
    namespaced: true,

    state: {
        hasilDprRi: [],
        hasilDprdProv: [],
        hasilDprdKota: []
    },

    getters: {
        hasilDprRi(state) {
            return state.hasilDprRi
        },
        hasilDprdProv(state) {
            return state.hasilDprdProv
        },
        hasilDprdKota(state) {
            return state.hasilDprdKota
        }
    },

    mutations: {
        SET_HASIL_DPR_RI(state, hasilDprRi) {
            state.hasilDprRi = hasilDprRi
        },
        SET_HASIL_DPRD_PROV(state, hasilDprdProv) {
            state.hasilDprdProv = hasilDprdProv
        },
        SET_HASIL_DPRD_KOTA(state, hasilDprdKota) {
            state.hasilDprdKota = hasilDprdKota
        },
    },

    actions: {
        getHasilSuara(_, param) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            return new Promise((resolve, reject) => {
                axios.get(`suarakecamatan?${resolveQueryParams(param)}`, {
                    headers: {
                        "role": role
                    },
                })
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        postHasilSuara(_, data) {
            let role = JSON.parse(localStorage.getItem("xrfgthj")).role;
            return new Promise((resolve, reject) => {
                axios.post('suarakecamatan', data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "role": role
                    },
                })
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        postHasilDprdProv({ commit }, data) {
            commit('SET_HASIL_DPRD_PROV', data)
        },
        postHasilDprdKota({ commit }, data) {
            commit('SET_HASIL_DPRD_KOTA', data)
        }
    }
}