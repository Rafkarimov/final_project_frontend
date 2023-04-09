import { defineStore } from "pinia";
import { Doctor, DoctorState } from "@/models/types";

// Хранилище для врачей, для каждого ентити свое
export const useDoctorStore = defineStore("doctor", {
  state: (): DoctorState => ({
    doctors: undefined,
  }),
  getters: {
    getDoctors: (state) => state.doctors || [],
  },
  actions: {
    setDoctors(doctors: Array<Doctor>) {
      this.doctors = doctors;
    },
  },
});
