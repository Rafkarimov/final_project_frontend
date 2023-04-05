import { defineStore } from "pinia";
import { MedSpecialization, MedSpecializationState } from "@/models/types";

// Хранилище для мед специализаций, для каждого ентити свое
export const useMedSpecializationStore = defineStore("medSpecialization", {
  state: (): MedSpecializationState => ({
    medSpecializations: undefined,
  }),
  getters: {
    getMedSpecializations: (state) => state.medSpecializations || [],
  },
  actions: {
    setMedSpecializations(medSpecializations: Array<MedSpecialization>) {
      this.medSpecializations = medSpecializations;
    },
  },
});
