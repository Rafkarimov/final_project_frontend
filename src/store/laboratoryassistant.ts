import { defineStore } from "pinia";
import { LaboratoryAssistant, LaboratoryAssistantState } from "@/models/types";

// Хранилище для лаборантов, для каждого ентити свое
export const useLaboratoryAssistantStore = defineStore("laboratoryAssistant", {
  state: (): LaboratoryAssistantState => ({
    laboratoryassistants: undefined,
  }),
  getters: {
    getLaboratoryAssistants: (state) => state.laboratoryassistants || [],
    getMedSpecializationTypes: (state) => (id: number) => {
      return (
        state.laboratoryassistants
          ?.find((x) => x.id === id)
          ?.medTypesOfResearch?.map((y) => y.title)
          .toString() || []
      );
    },
  },
  actions: {
    setLaboratoryAssistants(laboratoryassistants: Array<LaboratoryAssistant>) {
      this.laboratoryassistants = laboratoryassistants;
    },
  },
});
