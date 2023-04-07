import { defineStore } from "pinia";
import { MedTypesOfResearch, MedTypesOfResearchState } from "@/models/types";

// Хранилище для видов мед исследований, для каждого ентити свое
export const usemedTypesOfResearchStore = defineStore("medTypesOfResearch", {
  state: (): MedTypesOfResearchState => ({
    medtypesofresearch1: undefined,
  }),
  getters: {
    getMedTypesOfResearch1: (state) => state.medtypesofresearch1 || [],
  },
  actions: {
    setMedTypesOfResearch1(medTypesOfResearch: Array<MedTypesOfResearch>) {
      this.medtypesofresearch1 = medTypesOfResearch;
    },
  },
});
