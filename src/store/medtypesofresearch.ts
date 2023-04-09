import { defineStore } from "pinia";
import { MedTypesOfResearch, MedTypesOfResearchState } from "@/models/types";

// Хранилище для видов мед исследований, для каждого ентити свое
export const usemedTypesOfResearchStore = defineStore("medTypesOfResearch", {
  state: (): MedTypesOfResearchState => ({
    medtypesofresearches: undefined,
  }),
  getters: {
    getMedTypesOfResearch1: (state) => state.medtypesofresearches || [],
  },
  actions: {
    setMedTypesOfResearch1(medTypesOfResearch: Array<MedTypesOfResearch>) {
      this.medtypesofresearches = medTypesOfResearch;
    },
  },
});
