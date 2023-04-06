import { defineStore } from "pinia";
import { ChiefDoctor, ChiefDoctorState } from "@/models/types";

// Хранилище для списка, для каждого ентити свое
export const useChiefDoctorStore = defineStore("chiefDoctors", {
  state: (): ChiefDoctorState => ({
    chiefDoctors: undefined,
  }),
  getters: {
    getChiefDoctors: (state) => state.chiefDoctors || [],
  },
  actions: {
    setChiefDoctors(chiefDoctors: Array<ChiefDoctor>) {
      this.chiefDoctors = chiefDoctors;
    },
  },
});
